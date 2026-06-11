const path = require("path");
const fsExtra = require("fs-extra");
const fs = require("fs");
const { execFileSync } = require("child_process");
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const appConfig = require('../package.json')
const entryDir = path.resolve(__dirname, "../packages");
const outputDir = path.resolve(__dirname, "../dist");
const typeOutputDir = path.resolve(outputDir, "types");

/**
 * base config
 */
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue()],
});

const rollupOptions = {
    external: ["vue", "vue-router", "element-plus"],
    output: {
        chunkFileNames: "assets/[name]-[hash].mjs",
        assetFileNames: (assetInfo) =>
            assetInfo.name && assetInfo.name.endsWith(".css")
                ? "[name][extname]"
                : "assets/[name]-[hash][extname]",
        globals: {
            vue: "Vue",
            "vue-router": "VueRouter",
            "element-plus": "ElementPlus",
        },
    },
};

const indexEntry = path.resolve(entryDir, "index.ts");

const toKebabCase = (name) =>
    name
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();

const resolveComponentEntry = (importPath) => {
    const entryPath = path.resolve(entryDir, importPath);
    const candidates = [
        entryPath,
        `${entryPath}.ts`,
        `${entryPath}.vue`,
        path.resolve(entryPath, "index.ts"),
    ];

    return candidates.find((filePath) => fs.existsSync(filePath) && fs.lstatSync(filePath).isFile());
};

const getInstalledComponentNames = () => {
    const indexContent = fs.readFileSync(indexEntry, "utf-8");
    const importMap = new Map();
    const importReg = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["'](.+)["'];?/g;
    let importMatch;

    while ((importMatch = importReg.exec(indexContent))) {
        importMap.set(importMatch[1], importMatch[2]);
    }

    const componentsMatch = indexContent.match(/const\s+components\s*=\s*\[([\s\S]*?)\];/);
    if (!componentsMatch) {
        return [];
    }

    const componentIdentifiers = componentsMatch[1]
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
    const components = [];

    for (const identifier of componentIdentifiers) {
        const importPath = importMap.get(identifier);
        const componentEntry = importPath ? resolveComponentEntry(importPath) : null;
        const componentContent = componentEntry ? fs.readFileSync(componentEntry, "utf-8") : "";
        const componentNameMatch = componentContent.match(/app\.component\(\s*["']([^"']+)["']/);
        const componentName = componentNameMatch ? componentNameMatch[1] : identifier;
        const registeredComponent = componentContent.match(/app\.component\(\s*["'][^"']+["']\s*,\s*([A-Za-z_$][\w$]*)/);
        const registeredIdentifier = registeredComponent ? registeredComponent[1] : null;
        const sourceImportReg = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["'](.+\.vue)["'];?/g;
        let sourceImportMatch;
        let sourcePath = null;

        while ((sourceImportMatch = sourceImportReg.exec(componentContent))) {
            if (!registeredIdentifier || sourceImportMatch[1] === registeredIdentifier) {
                sourcePath = path.resolve(path.dirname(componentEntry), sourceImportMatch[2]);
                break;
            }
        }

        if (!components.some((component) => component.name === componentName)) {
            const relativeTypePath = sourcePath
                ? path.relative(outputDir, path.resolve(typeOutputDir, path.relative(entryDir, sourcePath))).replace(/\\/g, "/")
                : null;

            components.push({
                name: componentName,
                typeName: toKebabCase(componentName),
                typePath: relativeTypePath ? `./${relativeTypePath}` : null,
            });
        }
    }

    return components;
};

const createTypes = () => {
    fsExtra.removeSync(typeOutputDir);
    const vueTsc = path.resolve(__dirname, "../node_modules/.bin/vue-tsc");

    execFileSync(
        vueTsc,
        [
            "-p",
            "tsconfig.lib.json",
            "--declaration",
            "--emitDeclarationOnly",
            "--noEmit",
            "false",
            "--outDir",
            "dist/types",
        ],
        {
            cwd: path.resolve(__dirname, ".."),
            stdio: "inherit",
        }
    );
};

const createTypeDeclarations = async () => {
    const components = getInstalledComponentNames();
    await fsExtra.ensureDir(typeOutputDir);

    await Promise.all(
        components.map(({ name, typeName, typePath }) => {
            if (!typePath) {
                return Promise.resolve();
            }

            const aliasTypePath = path.relative(
                typeOutputDir,
                path.resolve(outputDir, typePath)
            ).replace(/\\/g, "/");
            const aliasContent = `declare const ${name}: typeof import("./${aliasTypePath}").default;

export default ${name};
`;

            return fsExtra.outputFile(
                path.resolve(typeOutputDir, `${typeName}.d.ts`),
                aliasContent,
                "utf-8"
            );
        })
    );

    const namedExports = components
        .map(({ name, typeName, typePath }) => {
            if (!typePath) {
                return `declare const ${name}: any;`;
            }

            return `declare const ${name}: typeof import("./types/${typeName}").default;`;
        })
        .join("\n");
    const globalComponents = components
        .map(({ name }) => `    ${name}: typeof ${name};`)
        .join("\n");
    const content = `${namedExports}

declare const plugin: any;

export default plugin;

declare module "vue" {
  export interface GlobalComponents {
${globalComponents}
  }
}
`;

    await fsExtra.outputFile(path.resolve(outputDir, "index.d.ts"), content, "utf-8");
};

/**
 * Generate all components
 */
const buildAll = async () => {
    await build(
        defineConfig({
            ...baseConfig,
            build: {
                rollupOptions,
                lib: {
                    name: "index",
                    cssFileName: "index",
                    entry: path.resolve(entryDir, "index.ts"),
                    fileName: (format) => format === "es" ? "index.es.js" : "index.umd.cjs"
                },
                outDir: outputDir,
            },
        })
    );
};

/**
 * Generate a single component
 * @param name component name
 */
const buildSingle = async (name) => {
    await build(
        defineConfig({
            ...baseConfig,
            build: {
                rollupOptions,
                lib: {
                    name: "index",
                    cssFileName: "index",
                    entry: path.resolve(entryDir, name),
                    fileName: (format) => format === "es" ? "index.es.js" : "index.umd.cjs"
                },
                outDir: path.resolve(outputDir, name),
            },
        })
    );
};

/**
 * Generate package.json file
 * @param name file name
 */
const createPackageJson = (name) => {
    const content = `{
  "name": "${name === appConfig.name ? appConfig.name : name}",
  "version": "${appConfig.version}",
  "description": "${appConfig.description}",
  "author": {
    "name": "${appConfig.author.name}",
    "email": "${appConfig.author.email}"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/joebobxie/oga-ui.git"
  },
  "license": "${appConfig.license}",
  "main": "./index.umd.cjs",
  "module": "./index.es.js",
  "types": "./index.d.ts",
  "style": "./index.css",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.es.js",
      "require": "./index.umd.cjs"
    },
    "./index.css": "./index.css",
    "./*": "./*"
  },
  "files": [
    "**/*"
  ]
}`;

    const filePath = `${name === appConfig.name ? '' : name}${name === appConfig.name ? '' : '/'}package.json`
    fsExtra.outputFile(
        path.resolve(outputDir, filePath),
        content,
        "utf-8"
    );
};

/**
 * Generate
 */
const generate = async () => {
    await buildAll();
    const components = fs.readdirSync(entryDir).filter((name) => {
        const componentDir = path.resolve(entryDir, name);
        const isDir = fs.lstatSync(componentDir).isDirectory();
        return isDir && fs.readdirSync(componentDir).includes("index.ts");
    });

    for (const name of components) {
        await buildSingle(name);
        // createPackageJson(name);
    }
    createTypes();
    createPackageJson(appConfig.name);
    await createTypeDeclarations();

    fs.copyFileSync('README.md', `${outputDir}/README.md`);
};

generate();

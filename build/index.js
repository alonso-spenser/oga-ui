const path = require("path");
const fsExtra = require("fs-extra");
const fs = require("fs");
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const appConfig = require('../package.json')
const entryDir = path.resolve(__dirname, "../packages");
const outputDir = path.resolve(__dirname, "../dist");

/**
 * base config
 */
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue()],
});

const rollupOptions = {
    external: ["vue", "vue-router"],
    output: {
        globals: {
            vue: "Vue",
        },
    },
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
                    fileName: (format) => `index.${format}.ts`
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
                    fileName: (format) => `index.${format}.ts`
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
  "license": "${appConfig.license}",
  "main": "index.umd.ts",
  "module": "index.es.ts",
  "style": "index.css"
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
    createPackageJson(appConfig.name);

    fs.copyFileSync('README.md', `${outputDir}/README.md`);
};

generate();
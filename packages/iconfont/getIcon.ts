import { SVG_ICON } from './constant'
import { defineComponent, h } from 'vue'
import IconFont from './src/iconFont.vue';

export default ({
                    prefix = undefined,
                    type = SVG_ICON,
                }: {
    prefix?: string;
    type: string;
}) => defineComponent({
    functional: true,

    props: {
        name: String
    },

    setup(props, ctx) {
        // symbol 引用
        return () => h(IconFont, {
            ...ctx.attrs,
            prefix,
            type,
            name: props.name,
        });
    }
})
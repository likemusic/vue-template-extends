import Vue from 'vue/dist/vue.min.js';

export default function ({options}, resultTemplateHtml, slotsHtml) {
    const template = Vue.compile(resultTemplateHtml);

    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options.__extends = {
        resultTemplateHtml: resultTemplateHtml,
        slotsHtml: slotsHtml,
    };
}

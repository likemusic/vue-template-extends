const path = require("path");
const getResultComponentTemplateHtmlRecursively = require('./getResultComponentTemplateHtmlRecursively')
const getSlotsContent = require("./getSlotsContents");
const processSlots = require("./processSlots");


module.exports = {
    /**
     * Process the content inside of a custom block and prepare it for execution in a testing environment
     * @param {SFCCustomBlock[]} blocks All of the blocks matching your type, returned from `@vue/component-compiler-utils`
     * @param {string} vueOptionsNamespace The internal namespace for a component's Vue Options in vue-jest
     * @param {string} filename The SFC file being processed
     * @param {Object} config The full Jest config
     * @returns {string} The code to be output after processing all of the blocks matched by this type
     */
    process({blocks, vueOptionsNamespace, filename, config}) {
        const block = blocks.pop();
        const [baseTemplateHtml, baseSlotsData] = getResultComponentTemplateHtmlRecursively(getBaseComponentFilenameByBlock(block, filename));
        const slotsHtml = getSlotsContent(block.content, baseSlotsData);
        const resultTemplateHtml = processSlots(baseTemplateHtml, slotsHtml, baseSlotsData);

        return `
const Vue = require('vue/dist/vue.min.js');

const resultTemplateHtml = ${JSON.stringify(resultTemplateHtml)};
const slotsHtml = ${JSON.stringify(slotsHtml)};

const template = Vue.compile(resultTemplateHtml);

${vueOptionsNamespace}.render = template.render;
${vueOptionsNamespace}.staticRenderFns = template.staticRenderFns;
${vueOptionsNamespace}.__extends = {
    resultTemplateHtml: resultTemplateHtml,
    slotsHtml: slotsHtml,
};
`;
    }
}

function getBaseComponentFilenameByBlock(block, filename) {
    const baseDir = path.dirname(filename);

    return path.resolve(baseDir, block.attrs.base + '.vue');
}

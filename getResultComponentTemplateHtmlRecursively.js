const fs = require('fs');
const compiler = require("vue-template-compiler");
const path = require('path');
const getSlotsContent = require('./getSlotsContents');
const replaceSlotsContents = require('./replaceSlotsContent');

function getResultComponentTemplateHtmlRecursively(componentFilename, loaderContext) {
    const componentFileContent = fs.readFileSync(componentFilename).toString();
    const parsedComponent = compiler.parseComponent(componentFileContent);

    const parsedComponentTemplate = parsedComponent.template;
    const baseDir = path.dirname(componentFilename);

    return parsedComponentTemplate
        ? parsedComponentTemplate.content
        : getResultComponentTemplateHtmlByCustomBlocks(parsedComponent.customBlocks, baseDir, loaderContext);
}

function getResultComponentTemplateHtmlByCustomBlocks(customBlocks, baseDir, loaderContext) {
    const templateExtendsCustomBlocks = getTemplateExtendsCustomBlock(customBlocks);

    const relativeComponentPath = templateExtendsCustomBlocks.attrs.base;
    const componentAbsoluteFilename = getComponentAbsoluteFilename(baseDir, relativeComponentPath);
    loaderContext.addDependency(componentAbsoluteFilename);

    const baseTemplateHtml = getResultComponentTemplateHtmlRecursively(componentAbsoluteFilename);

    const source = templateExtendsCustomBlocks.content;
    const slotsHtml = getSlotsContent(source);

    return replaceSlotsContents(baseTemplateHtml, slotsHtml);
}

function getTemplateExtendsCustomBlock(customBlocks) {
    return customBlocks.find((customBlock) => customBlock.type === 'template-extends');
}

function getComponentAbsoluteFilename(baseDir, relativeComponentPath) {
    const relativePath = baseDir + '/' + relativeComponentPath + '.vue';

    return path.resolve(relativePath);
}

module.exports = getResultComponentTemplateHtmlRecursively;

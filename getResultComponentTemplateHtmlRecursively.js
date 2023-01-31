const fs = require('fs');
const compiler = require("vue-template-compiler");
const path = require('path');
const getSlotsContent = require('./getSlotsContents');
const processSlots = require('./processSlots');
const getSlotsDataFromTemplate = require('./getSlotsDataFromTemplate');

function getResultComponentTemplateHtmlRecursively(componentFilename, loaderContext = null) {
    const componentFileContent = fs.readFileSync(componentFilename).toString();
    const parsedComponent = compiler.parseComponent(componentFileContent);

    const parsedComponentTemplate = parsedComponent.template;
    const baseDir = path.dirname(componentFilename);

    return parsedComponentTemplate
        ? [parsedComponentTemplate.content, getSlotsDataFromTemplate(parsedComponentTemplate.content)]
        : getResultComponentTemplateHtmlByCustomBlocks(parsedComponent.customBlocks, baseDir, loaderContext);
}

function getResultComponentTemplateHtmlByCustomBlocks(customBlocks, baseDir, loaderContext) {
    const templateExtendsCustomBlock = getTemplateExtendsCustomBlock(customBlocks);

    const relativeComponentPath = templateExtendsCustomBlock.attrs.base;
    const componentAbsoluteFilename = getComponentAbsoluteFilename(baseDir, relativeComponentPath);

    if (loaderContext) {
        loaderContext.addDependency(componentAbsoluteFilename);
    }

    const [baseTemplateHtml, baseSlotsData] = getResultComponentTemplateHtmlRecursively(componentAbsoluteFilename, loaderContext);

    const source = templateExtendsCustomBlock.content;
    const slotsHtml = getSlotsContent(source, baseSlotsData);

    return [processSlots(baseTemplateHtml, slotsHtml), slotsHtml];
}

function getTemplateExtendsCustomBlock(customBlocks) {
    return customBlocks.find((customBlock) => customBlock.type === 'template-extends');
}

function getComponentAbsoluteFilename(baseDir, relativeComponentPath) {
    const relativePath = baseDir + '/' + relativeComponentPath + '.vue';

    return path.resolve(relativePath);
}

module.exports = getResultComponentTemplateHtmlRecursively;

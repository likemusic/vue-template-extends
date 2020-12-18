const getSlotsContent = require('./getSlotsContents');
const replaceSlotsContents = require('./replaceSlotsContent');
const getBaseComponentFilenameByLoaderContext = require('./getBaseComponentFilenameByLoaderContext')
const getResultComponentTemplateHtmlRecursively = require('./getResultComponentTemplateHtmlRecursively')

module.exports = function (source, map) {
    const loaderContext = this;

    const sourceFilename = getBaseComponentFilenameByLoaderContext(loaderContext);
    this.addDependency(sourceFilename);

    const baseTemplateResultHtml = getResultComponentTemplateHtmlRecursively(sourceFilename, loaderContext);
    const slotsHtml = getSlotsContent(source);
    const resultTemplateHtml = replaceSlotsContents(baseTemplateResultHtml, slotsHtml);

    this.callback(
        null,
        `import bindRenders from 'vue-template-extends/bindRenders';

        const resultTemplateHtml = ${JSON.stringify(resultTemplateHtml)};
        const slotsHtml = ${JSON.stringify(slotsHtml)};

        export default function (Component) {
            bindRenders(
                Component,
                resultTemplateHtml,
                slotsHtml
            );
        }`,
        map
    );
};

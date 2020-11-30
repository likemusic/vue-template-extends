const getSlotsContent = require('./getSlotsContents');
const replaceSlotsContents = require('./replaceSlotsContent');
const getBaseComponentFilenameByLoaderContext = require('./getBaseComponentFilenameByLoaderContext')
const getResultComponentTemplateHtmlRecursively = require('./getResultComponentTemplateHtmlRecursively')

module.exports = function (source, map) {
    const loaderContext = this;

    const sourceFilename = getBaseComponentFilenameByLoaderContext(loaderContext);
    const baseTemplateResultHtml = getResultComponentTemplateHtmlRecursively(sourceFilename);
    const slotsHtml = getSlotsContent(source);
    const resultTemplateHtml = replaceSlotsContents(baseTemplateResultHtml, slotsHtml);

    this.callback(
        null,
        `import bind from 'vue-slot-loader/bindRenders.js'

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

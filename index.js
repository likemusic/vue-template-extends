const getSlotsContent = require('./getSlotsContents');
const processSlots = require('./processSlots');
const getBaseComponentFilenameByLoaderContext = require('./getBaseComponentFilenameByLoaderContext')
const getResultComponentTemplateHtmlRecursively = require('./getResultComponentTemplateHtmlRecursively')

module.exports = function (source, map) {
    const loaderContext = this;

    const sourceFilename = getBaseComponentFilenameByLoaderContext(loaderContext);
    this.addDependency(sourceFilename);

    const [baseTemplateResultHtml, baseSlotsData] = getResultComponentTemplateHtmlRecursively(sourceFilename, loaderContext);
    const slotsData = getSlotsContent(source, baseTemplateResultHtml);
    const resultTemplateHtml = processSlots(baseTemplateResultHtml, slotsData, baseSlotsData);

    this.callback(
        null,
        `import bindRenders from 'vue-template-extends/bindRenders';

        const resultTemplateHtml = ${JSON.stringify(resultTemplateHtml)};
        const slotsHtml = ${JSON.stringify(slotsData)};

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

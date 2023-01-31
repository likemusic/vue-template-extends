const {parseHTML} = require('linkedom');
const getFragmentOuterHtml = require("./getFragmentOuterHtml");
const replaceSlots = require('./replace/replaceSlots');
const replaceSlotsContent = require('./replace/replaceSlotsContent');
const replaceParentSlots = require('./replace/replaceParentSlots');

function processSlots(baseTemplate, slotsData, baseSlotsData) {
    const {document} = parseHTML(baseTemplate);

    replaceSlots(document, slotsData);
    replaceSlotsContent(document, slotsData);

    replaceParentSlots(document, baseSlotsData);

    return getFragmentOuterHtml(document);
}

module.exports = processSlots;

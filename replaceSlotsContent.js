const {parseHTML} = require('linkedom');
const defaultSlotName = 'default';
const replaceTemplatesSlotsContents = require("./replaceTemplatesSlotsContents");
const getFragmentOuterHtml = require("./getFragmentOuterHtml");

function replaceSlotsContent(baseTemplate, slotsContents) {
    const {document} = parseHTML(baseTemplate);
    const slots = document.querySelectorAll('slot');
    const slotsLength = slots.length;

    for (let i = 0; i < slotsLength; i++) {
        let slot = slots.item(i);
        let slotAttributes = slot.attributes;
        let nameAttribute = slotAttributes.getNamedItem('name');
        let slotName = nameAttribute ? nameAttribute.value : defaultSlotName;

        if (slotsContents[slotName] === undefined) {
            continue;
        }

        slot.innerHTML = slotsContents[slotName];
    }

    replaceTemplatesSlotsContents(document, slotsContents, replaceSlotsContent);

    return getFragmentOuterHtml(document);
}

module.exports = replaceSlotsContent;

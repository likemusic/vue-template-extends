const replaceTemplatesSlotsContents = require("../replaceTemplatesSlotsContents");
const replaceNodeWithHtml = require('./replaceNodeWithHtml');
const constants = require("../defaults");

function replaceSlots(document, slotsData) {
    const slots = document.querySelectorAll('slot');
    const slotsLength = slots.length;

    for (let i = 0; i < slotsLength; i++) {
        let slot = slots.item(i);

        let slotAttributes = slot.attributes;

        // name
        let nameAttribute = slotAttributes.getNamedItem('name');
        let slotName = nameAttribute ? nameAttribute.value : constants.DEFAULT_SLOT_NAME;

        let slotData = slotsData[slotName];

        if (slotData === undefined) {
            continue;
        }

        // replace
        let isReplace = Boolean(slotData.isReplace);

        if (!isReplace) {
            continue;
        }

        replaceNodeWithHtml(document, slot, slotData.content);
    }

    replaceTemplatesSlotsContents(document, slotsData, replaceSlots);
}

module.exports = replaceSlots;

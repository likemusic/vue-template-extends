const replaceTemplatesSlotsContents = require("../replaceTemplatesSlotsContents");
const constants = require('../defaults');

function replaceSlotsContent(document, slotsData) {
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

        let isReplace = Boolean(slotData.isReplace);

        if (isReplace) {
            continue;
        }

        slot.innerHTML = slotData.content;
    }

    replaceTemplatesSlotsContents(document, slotsData, replaceSlotsContent);
}

module.exports = replaceSlotsContent;

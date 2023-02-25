const replaceTemplatesSlotsContents = require("../replaceTemplatesSlotsContents");
const constants = require('../defaults');

function replaceSlotsContent(document, slotsData) {
    const slots = document.querySelectorAll('slot');
    const topLevelSlots = filterTopLevelSlots(slots);
    const slotsLength = topLevelSlots.length;

    for (let i = 0; i < slotsLength; i++) {
        let slot = topLevelSlots[i];

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

        replaceSlotsContent(slot, slotsData);
    }

    replaceTemplatesSlotsContents(document, slotsData, replaceSlotsContent);
}

function isNestedSlot(slots, currentIndex, slot) {
    for (let i = 0; i < currentIndex; i++) {
        if (slots[i].contains(slot)) {
            return true;
        }
    }

    return false;
}

function filterTopLevelSlots(slots) {
    const topLevelSlots = [];

    for (let i = 0; i < slots.length; i++) {
        let slot = slots[i];

        if (!isNestedSlot(slots, i, slot)) {
            topLevelSlots.push(slot);
        }
    }

    return topLevelSlots;
}

module.exports = replaceSlotsContent;

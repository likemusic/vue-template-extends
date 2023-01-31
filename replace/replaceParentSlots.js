const replaceTemplatesSlotsContents = require("../replaceTemplatesSlotsContents");
const defaults = require("../defaults");

function replaceParentSlots(document, baseSlotsData) {
    const slots = document.querySelectorAll('slot[parent]');
    const slotsLength = slots.length;

    for (let i = 0; i < slotsLength; i++) {
        let slot = slots.item(i);

        let slotAttributes = slot.attributes;

        // name
        let nameAttribute = slotAttributes.getNamedItem('name');
        let slotName = nameAttribute ? nameAttribute.value : defaults.DEFAULT_SLOT_NAME;

        // parent
        let parentAttribute = slotAttributes.getNamedItem('parent');
        let isParent = Boolean(parentAttribute && (parentAttribute.value !== 'false'));

        slotAttributes.removeNamedItem('parent');

        if (!isParent) {
            continue;
        }

        let slotData = baseSlotsData[slotName];

        if (slotData === undefined) {
            throw new Error(`Parent doesn't have slot with name: "${slotData}".`);
        }

        slot.innerHTML = slotData.content;
    }

    replaceTemplatesSlotsContents(document, baseSlotsData, replaceParentSlots);
}

module.exports = replaceParentSlots;

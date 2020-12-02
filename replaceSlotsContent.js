const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const defaultSlotName = 'default';
const replaceTemplatesSlotsContents = require("./replaceTemplatesSlotsContents");

function replaceSlotsContent(baseTemplate, slotsContents) {
    const frag = JSDOM.fragment(baseTemplate);
    const slots = frag.querySelectorAll('slot');
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

    replaceTemplatesSlotsContents(frag, slotsContents, replaceSlotsContent);

    return frag.firstElementChild.outerHTML;
}

module.exports = replaceSlotsContent;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const defaulSlotName = 'default';

module.exports = function (baseTemplate, slotsContents) {
    const frag = JSDOM.fragment(baseTemplate);
    const slots = frag.querySelectorAll('slot');
    const slotsLength = slots.length;

    for (let i = 0; i < slotsLength; i++) {
        let slot = slots.item(i);
        let slotAttributes = slot.attributes;
        let nameAttribute = slotAttributes.getNamedItem('name');
        let slotName = nameAttribute ? nameAttribute.value : defaulSlotName;

        if (slotsContents[slotName] === undefined) {
            continue;
        }

        slot.innerHTML = slotsContents[slotName];
    }

    return frag.firstElementChild.outerHTML;
}

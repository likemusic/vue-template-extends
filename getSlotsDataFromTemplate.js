const {parseHTML} = require('linkedom');
const defaults = require('./defaults');

module.exports = function (baseTemplate, baseSlotsData = {}) {
    // debugger;

    const {document} = parseHTML(baseTemplate);
    const slots = document.querySelectorAll('slot');
    const slotsLength = slots.length;

    const ret = {};

    for (let i = 0; i < slotsLength; i++) {
        let slot = slots.item(i);
        let slotAttributes = slot.attributes;

        // name
        let nameAttribute = slotAttributes.getNamedItem('name');
        let slotName = nameAttribute ? nameAttribute.value : defaults.DEFAULT_SLOT_NAME;

        ret[slotName] = {
            content: slot.innerHTML,
            isReplace: false,
            isParent: false,
        };
    }

    return Object.assign({}, baseSlotsData, ret);
}

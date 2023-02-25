const {parseHTML} = require('linkedom');
const defaultSlotName = 'default';

module.exports = function (extendsContent, baseSlotsData = {}) {
    // debugger;
    const {document} = parseHTML(extendsContent);

    // const children = document.children;
    // const childrenLength = children.length;

    const slots = document.querySelectorAll('slot');
    const slotsLength = slots.length;

    const ret = {};

    for (let i = 0; i < slotsLength; i++) {
        let slot = slots[i];
        // let slotName = slot.nodeName;

        // if (slotName !== 'SLOT') {
        //     throw new Error('`extends` block must contain only `slot` nodes! Given: ' + slotName);
        // }

        let slotAttributes = slot.attributes;

        // name
        let nameAttribute = slotAttributes.getNamedItem('name');
        let slotName = nameAttribute ? nameAttribute.value : defaultSlotName;

        // replace
        let replaceAttribute = slotAttributes.getNamedItem('replace');
        let isReplace = Boolean(replaceAttribute && (replaceAttribute.value !== 'false'));

        // parent
        let parentAttribute = slotAttributes.getNamedItem('parent');
        let isParent = Boolean(parentAttribute && (parentAttribute.value !== 'false'));

        // ignore parent slots
        if (isParent) {
            continue;
        }

        ret[slotName] = {
            content: slot.innerHTML,
            isReplace: isReplace,
        };
    }

    return Object.assign({}, baseSlotsData, ret);
}

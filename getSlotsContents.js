const {parseHTML} = require('linkedom');
const defaultSlotName = 'default';

module.exports = function (extendsContent, baseSlotsData = {}) {
    // debugger;
    const {document} = parseHTML(extendsContent);

    const children = document.children;
    const childrenLength = children.length;

    const ret = {};

    for (let i = 0; i < childrenLength; i++) {
        let child = children.item(i);
        let childNodeName = child.nodeName;

        if (childNodeName !== 'SLOT') {
            throw new Error('`extends` block must contain only `slot` nodes! Given: ' + childNodeName);
        }

        let childAttributes = child.attributes;

        // name
        let nameAttribute = childAttributes.getNamedItem('name');
        let slotName = nameAttribute ? nameAttribute.value : defaultSlotName;

        // replace
        let replaceAttribute = childAttributes.getNamedItem('replace');
        let isReplace = Boolean(replaceAttribute && (replaceAttribute.value !== 'false'));

        ret[slotName] = {
            content: child.innerHTML,
            isReplace: isReplace,
        };
    }

    return Object.assign({}, baseSlotsData, ret);
}

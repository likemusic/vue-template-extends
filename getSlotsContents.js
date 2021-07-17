const {parseHTML} = require('linkedom');
const defaultSlotName = 'default';

module.exports = function (extendsContent) {
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
        let nameAttributes = childAttributes.getNamedItem('name');
        let slotName = nameAttributes ? nameAttributes.value : defaultSlotName;

        ret[slotName] = child.innerHTML;
    }

    return ret;
}

module.exports = function (fragment, slotsContents, replaceSlotsContent) {
    const templates = fragment.querySelectorAll('template');
    const templatesLength = templates.length;

    for (let i = 0; i < templatesLength; i++) {
        let template = templates.item(i);

        // ignoe nested templates
        if (isNestedTemplate(templates, i, template)) {
            continue;
        }
        // let templateInnerHtml = template.innerHTML;

        // template.innerHTML = replaceSlotsContent(template, slotsContents);
        replaceSlotsContent(template, slotsContents);
    }
}

function isNestedTemplate(templates, currentIndex, template) {
    for (let i = 0; i < currentIndex; i++) {
        if (templates[i].contains(template)) {
            return true;
        }
    }

    return false;
}

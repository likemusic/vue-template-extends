module.exports = function (fragment, slotsContents, replaceSlotsContent) {
    const templates = fragment.querySelectorAll('template');
    const templatesLength = templates.length;

    for (let i = 0; i < templatesLength; i++) {
        let template = templates.item(i);
        // let templateInnerHtml = template.innerHTML;

        template.innerHTML = replaceSlotsContent(template, slotsContents);
    }
}

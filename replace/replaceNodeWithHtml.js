function replaceNodeWithHtml(document, node, html) {
    const fakeDiv = document.createElement('div');

    fakeDiv.innerHTML = html;
    node.replaceWith(...fakeDiv.childNodes);

    fakeDiv.remove();
}

module.exports = replaceNodeWithHtml;

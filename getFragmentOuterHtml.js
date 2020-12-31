module.exports = function (fragment) {
    return [].map.call(fragment.childNodes, x => x.outerHTML).join('');
}

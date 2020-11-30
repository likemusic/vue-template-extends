const loaderUtils = require("loader-utils");
const path = require('path');

module.exports = function getBaseComponentFilenameByLoaderContext(loaderContext) {
    const query = loaderUtils.parseQuery(loaderContext.resourceQuery);

    const context = loaderContext.context;
    const baseComponent = query.base;

    const relativePath = context + '/' + baseComponent + '.vue';

    return path.resolve(relativePath);
}

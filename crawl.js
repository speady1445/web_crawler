const { JSDOM } = require('jsdom')

function normalizeURL(str) {
    const url = new URL(str);
    let normalizedUrl = url.host + url.pathname;
    if (normalizedUrl.slice(-1) === "/") {
        normalizedUrl = normalizedUrl.slice(0, -1);
    }
    return normalizedUrl;
}

module.exports = {
    normalizeURL
}

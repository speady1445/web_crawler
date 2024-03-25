const { JSDOM } = require('jsdom')

function normalizeURL(str) {
    const url = new URL(str);
    let normalizedUrl = url.host + url.pathname;
    if (normalizedUrl.slice(-1) === "/") {
        normalizedUrl = normalizedUrl.slice(0, -1);
    }
    return normalizedUrl;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const aElements = dom.window.document.querySelectorAll('a');
    const links = [];
    for (const aElement of aElements) {
        if (aElement.href.slice(0, 1) === "/") {
            links.push(`${baseURL}${aElement.href}`);
        } else {
            links.push(aElement.href);
        }
    }
    return links;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}

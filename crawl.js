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
        try {
            if (aElement.href.slice(0, 1) === "/") {
                links.push(new URL(aElement.href, baseURL).href);
            } else {
                links.push(new URL(aElement.href).href);
            }
        } catch (err) {
            console.log(`${err.message}: ${aElement.href}`);
        }
    }
    return links;
}

async function crawlPage(baseURL) {
    const pages = {};
    await crawlPageRecursive(baseURL, baseURL, pages);
    pages[normalizeURL(baseURL)]--;
    return pages;
}

async function crawlPageRecursive(baseURL, currentURL, pages) {
    if (new URL(baseURL).hostname !== new URL(currentURL).hostname) {
        return pages;
    }

    const currentNormalizedUrl = normalizeURL(currentURL);
    if (!(pages[currentNormalizedUrl] === undefined)) {
        pages[currentNormalizedUrl]++;
        return pages;
    }
    pages[currentNormalizedUrl] = 1;

    let htmlBody = '';
    try {
        console.log(`Crawling ${currentURL}`);
        const response = await fetch(currentURL);
        if (response.status > 399) {
            console.log(`  Response status ${response.status} while fetching ${currentURL}`);
            return pages;
        }
        if (!response.headers.get('Content-Type').includes('text/html')) {
            console.log(`  Wrong content header while fetching ${currentURL}`);
            return pages;
        }
        htmlBody = await response.text();
    } catch (err) {
        console.log(err);
    }

    const urlsFound = getURLsFromHTML(htmlBody, baseURL);
    for (const nextUrl of urlsFound) {
        await crawlPageRecursive(baseURL, nextUrl, pages);
    }

    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}

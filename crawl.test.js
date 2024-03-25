const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


test('normalizeURL', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toEqual('blog.boot.dev/path');
});

test('normalizeURL with slash', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toEqual('blog.boot.dev/path');
});

test('normalizeURL capitals', () => {
    expect(normalizeURL('https://blog.BOOT.dev/path')).toEqual('blog.boot.dev/path');
});

test('normalizeURL http', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toEqual('blog.boot.dev/path');
});

const baseURL = 'https://blog.boot.dev';

test('getURLsFromHTML no link', () => {
    const htmlBody = '<html><body><p>Hello World</p></body></html>'
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([]);
});

test('getURLsFromHTML absolute', () => {
    const html = `<html><body><a href="https://blog.boot.dev/path/smt">Link 1</a></body></html>`;
    expect(getURLsFromHTML(html, baseURL)).toEqual(['https://blog.boot.dev/path/smt']);
});

test('getURLsFromHTML relative', () => {
    const html = `<html><body><a href="/path/smt">Link 1</a></body></html>`;
    expect(getURLsFromHTML(html, baseURL)).toEqual(['https://blog.boot.dev/path/smt']);
});

test('getURLsFromHTML both', () => {
    const html = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path">Link 1</a>
                <a href="/path2/something">Link 2</a>
            </body>
        </html>
    `;
    expect(getURLsFromHTML(html, baseURL)).toEqual(
        ['https://blog.boot.dev/path', 'https://blog.boot.dev/path2/something']
    );
});

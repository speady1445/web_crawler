const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')


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

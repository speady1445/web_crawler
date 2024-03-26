const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');

main();

async function main() {
    if (argv.length !== 3) {
        console.log('You need to provide exactly one web address');
        return;
    }
    
    const baseURL = argv[2];
    console.log(await crawlPage(baseURL));
}
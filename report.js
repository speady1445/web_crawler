function printReport(pages) {
    const reports = [];

    for (const page in pages) {
        reports.push([page, pages[page]]);
    }

    reports.sort(reportComparison);

    let lastCount = -1;
    for (const [page, count] of reports) {
        if (count !== lastCount) {
            lastCount = count;
            console.log(`\nFound ${count} link${count > 1 ? 's' : ''} to following pages:`);
        }
        console.log(`    ${page}`);
    }
}

function reportComparison(a, b) {
    if (a[1] === b[1]) {
        return a[0] > b[0] ? 1 : -1;
    }
    return b[1] - a[1];
}

module.exports = {
    printReport
}

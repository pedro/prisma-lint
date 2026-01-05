import chalk from 'chalk';
import { getTruncatedFileName } from '#src/common/file.js';
import { renderViolationsContextual } from '#src/output/render/render-contextual.js';
import { renderViolationsJsonObject } from '#src/output/render/render-json.js';
import { renderViolationsSimple } from '#src/output/render/render-simple.js';
/* eslint-disable no-console */
export function outputToConsole(fileViolationList, outputFormat, quiet) {
    switch (outputFormat) {
        case 'filepath':
            outputFilepath(fileViolationList, quiet);
            break;
        case 'simple':
            outputSimple(fileViolationList, quiet);
            break;
        case 'contextual':
            outputContextual(fileViolationList);
            break;
        case 'json':
            outputJson(fileViolationList);
            break;
        case 'none':
            break;
        default:
            throw new Error(`Unknown output format: ${outputFormat}`);
    }
}
function outputFilepath(fileViolationList, quiet) {
    fileViolationList.forEach(({ fileName, violations }) => {
        maybeOutputPath(fileName, violations, quiet);
    });
}
function outputJson(fileViolationList) {
    const list = fileViolationList.flatMap(({ violations }) => renderViolationsJsonObject(violations));
    console.error(JSON.stringify({ violations: list }));
}
function outputSimple(fileViolationList, quiet) {
    fileViolationList.forEach(({ fileName, violations }) => {
        const truncatedFileName = getTruncatedFileName(fileName);
        maybeOutputPath(truncatedFileName, violations, quiet);
        const lines = renderViolationsSimple(violations);
        if (lines.length !== 0) {
            console.error(lines.join('\n'));
        }
    });
}
function outputContextual(fileViolationList) {
    fileViolationList.forEach(({ sourceCode, violations }) => {
        const lines = renderViolationsContextual(sourceCode, violations);
        console.error(lines.join('\n'));
    });
}
function maybeOutputPath(fileName, violations, quiet) {
    const truncatedFileName = getTruncatedFileName(fileName);
    if (violations.length > 0) {
        console.error(`${truncatedFileName} ${chalk.red('✖')}`);
        return;
    }
    if (quiet) {
        return;
    }
    console.log(`${truncatedFileName} ${chalk.green('✔')}`);
}

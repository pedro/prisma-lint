import chalk from 'chalk';
import { keyViolationListPairs } from '#src/output/render/render-util.js';
export const renderViolationsSimple = (violations) => {
    const pairs = keyViolationListPairs(violations);
    return pairs.flatMap(([key, violations]) => {
        const first = violations[0];
        const location = first.field?.location ?? first.model?.location ?? first.enum?.location;
        if (!location) {
            throw new Error('No location');
        }
        const { startLine, startColumn } = location;
        return [
            `  ${key} ${chalk.gray(`${startLine}:${startColumn}`)}`,
            ...violations.flatMap(renderViolationSimple),
        ];
    });
};
const renderViolationSimple = ({ ruleName, message }) => [
    `    ${chalk.red('error')} ${message} ${chalk.gray(`${ruleName}`)}`,
];

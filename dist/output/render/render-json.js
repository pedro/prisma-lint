import { keyViolationListPairs } from '#src/output/render/render-util.js';
export const renderViolationsJson = (violations) => {
    const jsonObject = renderViolationsJsonObject(violations);
    return JSON.stringify(jsonObject);
};
export const renderViolationsJsonObject = (violations) => {
    const pairs = keyViolationListPairs(violations);
    return pairs.flatMap(([_, violations]) => {
        const first = violations[0];
        const { fileName } = first;
        const rawLocation = first.field?.location ?? first.model?.location ?? first.enum?.location;
        if (!rawLocation) {
            throw new Error('No location');
        }
        const { startLine, startColumn, endLine, endColumn } = rawLocation;
        if (startLine === undefined ||
            startColumn === undefined ||
            endLine === undefined ||
            endColumn === undefined) {
            throw new Error('No location');
        }
        const location = {
            startLine,
            startColumn,
            endLine,
            endColumn,
        };
        return violations.map((v) => ({
            ruleName: v.ruleName,
            message: v.message,
            fileName,
            location,
        }));
    });
};

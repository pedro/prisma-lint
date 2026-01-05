import {} from '#src/common/config.js';
import { parseRules } from '#src/common/parse-rules.js';
import { lintPrismaSourceCode } from '#src/lint-prisma-source-code.js';
export async function testLintPrismaSource({ ruleDefinitions, rootConfig, fileName, sourceCode, }) {
    const { rules, parseIssues } = parseRules(ruleDefinitions, rootConfig);
    if (parseIssues.length > 0) {
        throw new Error(`Unable to parse test config for ${fileName}:\n${parseIssues
            .map((issue) => `  ${issue}`)
            .join('\n')}`);
    }
    const violations = await lintPrismaSourceCode({
        rules,
        fileName,
        sourceCode,
    });
    return violations;
}

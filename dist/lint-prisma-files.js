import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { lintPrismaSourceCode } from '#src/lint-prisma-source-code.js';
export const lintPrismaFiles = async ({ rules, fileNames, }) => {
    const fileViolationList = [];
    for (const fileName of fileNames) {
        const filePath = path.resolve(fileName);
        const sourceCode = await promisify(fs.readFile)(filePath, {
            encoding: 'utf8',
        });
        const violations = lintPrismaSourceCode({ fileName, sourceCode, rules });
        fileViolationList.push({ fileName, sourceCode, violations });
    }
    return fileViolationList;
};

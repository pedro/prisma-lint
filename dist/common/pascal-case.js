import pluralize from 'pluralize';
export function toPascalCase(input, options = {}) {
    const { trimPrefix = '', compoundWords = [] } = options;
    // Handle prefix
    const processedInput = input.startsWith(trimPrefix)
        ? input.slice(trimPrefix.length)
        : input;
    // Create a map of positions where compound words are found
    const compoundPositions = [];
    compoundWords.forEach((word) => {
        const regex = new RegExp(word, 'g');
        let match;
        while ((match = regex.exec(processedInput)) !== null) {
            compoundPositions.push({
                start: match.index,
                end: match.index + word.length,
                word: word[0].toUpperCase() + word.slice(1),
            });
        }
    });
    // Convert to pascal case, but protect compound words
    let result = '';
    for (let i = 0; i < processedInput.length; i++) {
        const compoundWord = compoundPositions.find((p) => i >= p.start && i < p.end);
        if (compoundWord) {
            if (i === compoundWord.start) {
                result += compoundWord.word;
            }
            // Capitalize the first letter after the compound word
            if (compoundWord.end < processedInput.length) {
                result += processedInput[compoundWord.end].toUpperCase();
            }
            // Skip the rest of the compound word
            i = compoundWord.end;
            continue;
        }
        const char = processedInput[i];
        if (i > 0) {
            const prevChar = processedInput[i - 1];
            if (!/[a-zA-Z0-9]/.test(char)) {
                continue;
            }
            else if (!/[a-zA-Z]/.test(prevChar)) {
                result += char.toUpperCase();
            }
            else if (/[A-Z]/.test(prevChar) && /[A-Z]/.test(char)) {
                result += char.toLowerCase();
            }
            else {
                result += char;
            }
        }
        else {
            result += char.toUpperCase();
        }
    }
    if (options.pluralize) {
        if (options.irregularPlurals) {
            for (const [singular, plural] of Object.entries(options.irregularPlurals)) {
                pluralize.addIrregularRule(singular, plural);
            }
        }
        result = pluralize(result);
    }
    if (options.requirePrefix) {
        result = `${options.requirePrefix}${result}`;
    }
    return result;
}

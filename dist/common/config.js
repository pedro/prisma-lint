export function getRuleLevel(value) {
    if (Array.isArray(value)) {
        return value[0];
    }
    return value;
}
export function getRuleConfig(value) {
    if (Array.isArray(value)) {
        return value[1] ?? {};
    }
    return {};
}

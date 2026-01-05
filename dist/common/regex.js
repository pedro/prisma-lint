export const isRegexOrRegexStr = (value) => {
    if (value == null) {
        return false;
    }
    if (value instanceof RegExp) {
        return true;
    }
    if (typeof value !== 'string') {
        return false;
    }
    return value.startsWith('/') && value.endsWith('/');
};
export const toRegExp = (value) => {
    if (value instanceof RegExp) {
        return value;
    }
    if (value.startsWith('/') && value.endsWith('/')) {
        return new RegExp(value.slice(1, -1));
    }
    return new RegExp(`^${value}$`);
};

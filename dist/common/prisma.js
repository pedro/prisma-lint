import { Enum } from '@kejistan/enum';
export function listFields(model) {
    return model.properties.filter((property) => property.type === 'field');
}
export const PRISMA_SCALAR_TYPES = new Set([
    'String',
    'Boolean',
    'Int',
    'BigInt',
    'Float',
    'Decimal',
    'DateTime',
    'Json',
    'Bytes',
]);
export const PrismaPropertyType = Enum({
    FIELD: 'field',
    ATTRIBUTE: 'attribute',
    COMMENT: 'comment',
});
export function listModelBlocks(schema) {
    return schema.list.filter((block) => block.type === 'model');
}
export function listEnumBlocks(schema) {
    return schema.list.filter((block) => block.type === 'enum');
}
export function listCustomTypeBlocks(schema) {
    return schema.list.filter((block) => block.type === 'type');
}
export function listAttributes(node) {
    const attributes = node.properties.filter((p) => p.type === PrismaPropertyType.ATTRIBUTE);
    return attributes;
}
export function getMappedName(args) {
    const firstArg = args[0];
    if (typeof firstArg.value === 'string') {
        return firstArg.value.replace(/"/g, '');
    }
    const filtered = args.filter((a) => {
        if (typeof a !== 'object' || typeof a.value !== 'object') {
            return false;
        }
        if (!a.value.hasOwnProperty('key')) {
            return false;
        }
        const value = a.value;
        if (value.key !== 'name') {
            return false;
        }
        if (typeof value.value !== 'string') {
            return false;
        }
        return true;
    });
    if (filtered.length === 0) {
        return;
    }
    if (filtered.length > 1) {
        throw Error(`Unexpected multiple name attributes! ${JSON.stringify(filtered)}`);
    }
    return filtered[0].value.value.replace(/"/g, '');
}
export function isValue(value) {
    return !isKeyValue(value);
}
export function isKeyValue(value) {
    if (typeof value === 'object' &&
        !Array.isArray(value) &&
        value.type === 'keyValue') {
        return true;
    }
    return false;
}
export function isFunc(value) {
    return (typeof value === 'object' && 'type' in value && value.type === 'function');
}
export function assertValueIsArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'object') {
        if (value.type === 'array') {
            return value.args;
        }
    }
    throw new Error(`value is not an array ${JSON.stringify(value)}`);
}
export function looksLikeAssociationFieldType(fieldType) {
    if (typeof fieldType != 'string') {
        return false;
    }
    if (PRISMA_SCALAR_TYPES.has(fieldType)) {
        return false;
    }
    return true;
}

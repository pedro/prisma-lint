export const keyViolationListPairs = (violations) => {
    const groupedByKey = violations.reduce((acc, violation) => {
        const { model, field, enum: enumObj } = violation;
        const key = field
            ? `${model.name}.${field.name}`
            : enumObj
                ? enumObj.name
                : model.name;
        const violations = acc[key] ?? [];
        return { ...acc, [key]: [...violations, violation] };
    }, {});
    return Object.entries(groupedByKey).sort();
};

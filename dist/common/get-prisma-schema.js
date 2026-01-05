import { PrismaParser, VisitorClassFactory, getSchema, } from '@mrleebo/prisma-ast';
export function getPrismaSchema(sourceCode) {
    const parser = new PrismaParser({ nodeLocationTracking: 'full' });
    const VisitorClass = VisitorClassFactory(parser);
    const visitor = new VisitorClass();
    const prismaSchema = getSchema(sourceCode, { parser, visitor });
    return prismaSchema;
}

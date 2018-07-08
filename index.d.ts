/// <reference types="graphql"/>

import { GraphQLSchema } from "graphql";

export type Directive = {
    [key: string]: string
}

export type Field = {
    type?: string
    directives?: {
        [key: string]: Directive
    },
    isList?: boolean
    isNullable?: boolean
}

export type Enum = {
    fields: string[]
    type: string,
    directives?: {
        [key: string]: Directive
    }
}

export type Type = {
    fields: {
        [key: string]: Field
    },
    directives: {
        [key: string]: Directive
    },
    type: string
}

export type Types = {
    [key: string]: Types
}

export type Schema = {
    types: Types
}

export type JSSchema = {
    [key: string]: Types | Enum
}

declare function schemaToJS(schema: GraphQLSchema) : JSSchema

declare namespace consts {
    const ENUM: string
    const GRAPHQL_LIST: string
    const GRAPHQL_NON_NULL: string
    const GRAPHQL_OBJECT_TYPE: string
    const GRAPHQL_SCALAR_TYPE: string
    const GRAPHQL_ENUM_TYPE: string
    const LIST_TYPE: string
    const NON_NULL_TYPE: string
    const OBJECT: string
}
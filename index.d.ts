/// <reference path="graphql"/>

import { GraphQLSchema } from "graphql";

type Directive = {
    [key: string]: string
}

type Field = {
    type?: string
    directives?: {
        [key: string]: Directive
    },
    isList?: boolean
    isNullable?: boolean
}

type Enum = {
    fields: string[]
    type: string,
    directives?: {
        [key: string]: Directive
    }
}

type Type = {
    fields: {
        [key: string]: Field
    },
    directives: {
        [key: string]: Directive
    },
    type: string
}

type Types = {
    [key: string]: Types
}

type Schema = {
    types: Types
}

type JSSchema = {
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
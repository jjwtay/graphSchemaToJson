import gql from 'graphql-tag'
import { ObjectTypeDefinitionNode, InterfaceTypeDefinitionNode } from 'graphql'
import {
    ObjectSchema,
    convertArray as convertObjectArray,
    getTypes as getObjectTypes
} from './object'
import { UnionSchema } from './union'
import {
    InterfaceSchema,
    convertArray as convertInterfaceArray,
    getTypes as getInterfaceTypes
} from './interface'

export interface Schema {
    types: { [key: string]: ObjectSchema }
    unions: { [key: string]: UnionSchema }
    interfaces: { [key: string]: InterfaceSchema }
}

export const toSchema = (schema: string): Schema => {
    const parsed = gql`
        ${schema}
    `
    // console.log(parsed)

    return {
        types: convertObjectArray(getObjectTypes(parsed.definitions) as ObjectTypeDefinitionNode[]),
        unions: {},
        interfaces: convertInterfaceArray(getInterfaceTypes(
            parsed.definitions
        ) as InterfaceTypeDefinitionNode[])
    }
    // console.log(getObjectTypes(parsed.definitions))
    // console.log(convertArray(getObjectTypes(parsed.definitions)))
}

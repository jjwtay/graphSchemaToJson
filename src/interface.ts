import * as R from 'ramda'
import { InterfaceTypeDefinitionNode, TypeDefinitionNode } from 'graphql'
import { FieldSchema, getName, convertArray as convertFieldArray } from './field'
import { convertArray as convertDirectiveArray } from './directive'
import * as consts from './consts'

export type InterfaceWithType = {
    type: 'interface'
} & InterfaceSchema

export interface InterfaceSchema {
    fields: { [key: string]: FieldSchema }
    directives: { [key: string]: object }
}

export const convert = R.applySpec<InterfaceSchema>({
    fields: R.pipe(
        R.propOr([], 'fields'),
        convertFieldArray
    ),
    directives: R.pipe(
        R.propOr([], 'directives'),
        convertDirectiveArray
    )
})

export const convertArray = R.reduce<
    InterfaceTypeDefinitionNode,
    { [key: string]: InterfaceSchema }
>((acc, val) => R.assoc(getName(val), convert(val), acc), {})

export const getTypes = R.filter<TypeDefinitionNode>(
    R.whereEq({ kind: consts.INTERFACE_TYPE_DEFINITION })
)

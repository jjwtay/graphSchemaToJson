import * as R from 'ramda'
import { ObjectTypeDefinitionNode, TypeDefinitionNode } from 'graphql'
import { convertArray as convertFieldArray, FieldSchema } from './field'
import { convertArray as convertDirectiveArray } from './directive'

import * as consts from './consts'

export interface ObjectSchema {
    fields: { [key: string]: FieldSchema }
    directives: {}
    interfaces: string[]
}

export type ObjectType = {
    name: string
} & ObjectSchema

export const getTypes = R.filter<TypeDefinitionNode>(
    R.whereEq({ kind: consts.OBJECT_TYPE_DEFININTION })
)

export const getName = R.pathOr('name', ['name', 'value'])

export const convert = R.applySpec<ObjectSchema>({
    fields: R.pipe(
        R.propOr([], 'fields'),
        convertFieldArray
    ),
    directives: R.pipe(
        R.propOr([], 'directives'),
        convertDirectiveArray
    ),
    interfaces: (obj: ObjectTypeDefinitionNode) => (obj.interfaces || []).map(getName)
})

export const convertArray = R.reduce<ObjectTypeDefinitionNode, { [key: string]: ObjectSchema }>(
    (acc, obj) => R.assoc(obj.name.value, convert(obj), acc),
    {}
)

import {
    FieldDefinitionNode,
    DirectiveNode,
    UnionTypeDefinitionNode,
    InterfaceTypeDefinitionNode,
    NamedTypeNode,
    ListTypeNode,
    NonNullTypeNode
} from 'graphql'
import * as R from 'ramda'
import * as consts from './consts'
import { convertArray as convertDirectiveArray } from './directive'

export interface FieldSchema {
    isNullable: boolean
    isList: boolean
    directives: object
    type: string
}

export const getName: (
    node:
        | FieldDefinitionNode
        | DirectiveNode
        | UnionTypeDefinitionNode
        | InterfaceTypeDefinitionNode
) => string = R.pathOr('name', ['name', 'value'])

export const getDirectives: (node: FieldDefinitionNode) => readonly DirectiveNode[] = R.propOr(
    [],
    'directives'
)

export const isNullable: (obj: FieldDefinitionNode) => boolean = R.pipe(
    R.pathOr(false, ['type', 'kind']),
    R.equals(consts.NON_NULL_TYPE),
    R.not
)

export const isList: (obj: FieldDefinitionNode) => boolean = R.pipe(
    R.pathOr(false, ['type', 'kind']),
    R.equals(consts.LIST_TYPE)
)

export const getType = (node: FieldDefinitionNode | ListTypeNode | NonNullTypeNode): string => {
    if (node.type.kind === 'NamedType') {
        return (node.type as NamedTypeNode).name.value
    }

    if (node.type.kind === 'ListType') {
        return getType(node.type)
    }

    if (node.type.kind === 'NonNullType') {
        return getType(node.type)
    }

    return 'field'
}

export const convert = R.applySpec<FieldSchema>({
    isNullable,
    isList,
    directives: R.pipe(
        R.propOr([], 'directives'),
        convertDirectiveArray
    ),
    type: getType
})

export const convertArray = R.reduce<FieldDefinitionNode, { [key: string]: FieldSchema }>(
    (acc, val) => R.assoc(getName(val), convert(val), acc),
    {}
)

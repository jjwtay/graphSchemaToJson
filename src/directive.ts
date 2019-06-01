import * as R from 'ramda'
import { ArgumentNode, ObjectFieldNode, ValueNode, DirectiveNode } from 'graphql'
import * as consts from './consts'

interface Directivable {
    directives?: readonly DirectiveNode[]
}

export const kindEquals = (kind: string) =>
    R.pipe(
        R.prop('kind'),
        R.equals(kind)
    ) as (arg: { kind: string }) => boolean

export const convertArgument: (arg: ValueNode) => object = R.cond([
    [kindEquals(consts.STRING_VALUE), R.prop('value')],
    [
        kindEquals(consts.INT_VALUE),
        R.pipe(
            R.prop('value'),
            parseInt
        )
    ],
    [
        kindEquals(consts.FLOAT_VALUE),
        R.pipe(
            R.prop('value'),
            parseFloat
        )
    ],
    [
        kindEquals(consts.OBJECT_VALUE),
        R.pipe(
            R.prop('fields'),
            R.reduce(
                (fields, field: ObjectFieldNode): object => ({
                    ...fields,
                    [field.name.value]: convertArgument(field.value)
                }),
                {}
            )
        )
    ],
    [
        kindEquals(consts.LIST_VALUE),
        R.pipe(
            R.prop('values'),
            R.map((arg: ValueNode): object => convertArgument(arg))
        )
    ],
    [R.T, R.always(R.prop('value'))]
])

export const convertArguments = R.reduce(
    (args, arg: ArgumentNode): object => ({
        ...args,
        [arg.name.value]: convertArgument(arg.value)
    }),
    {}
)

export const findDirectives = (names: string[], node: Directivable): DirectiveNode[] =>
    (node &&
        node.directives &&
        node.directives.filter((directive): boolean => names.includes(directive.name.value))) ||
    []

export const findDirective = (name: string, node: Directivable): DirectiveNode | undefined =>
    findDirectives([name], node)[0]

export const convertDirective = (directive: DirectiveNode): object =>
    convertArguments(directive.arguments || [])

export const convertArray = R.reduce<DirectiveNode, {}>(
    (acc, directive) => R.assoc(directive.name.value, convertDirective(directive), acc),
    {}
)

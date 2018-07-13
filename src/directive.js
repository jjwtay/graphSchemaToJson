/// <reference path="../index.d.ts"/>
import * as graphql from 'graphql/type'
import * as consts from './consts'
/**
 * 
 * @param {any} argument
 */
const convertArgument = (argument) => {
    if (argument.kind === consts.STRING_VALUE) {
        return argument.value
    }
    if (argument.kind === consts.INT_VALUE) {
        return parseInt(argument.value)
    }
    if (argument.kind === consts.FLOAT_VALUE) {
        return parseFloat(argument.value)
    }
    if (argument.kind === consts.OBJECT_VALUE) {
        return argument.fields.reduce((fields, field) => ({...fields, [field.name.value]: convertArgument(field.value)}), {})
    }
    if (argument.kind === consts.LIST_VALUE) {
        return argument.values.map(value => convertArgument(value))
    }
    return argument.value

}
/**
 * 
 * @param {graphql.GraphQLNamedType | graphql.GraphQLField | graphql.GraphQLEnumType} type 
 */
export const getDirectives = (type) => {
    const directives = type.astNode.directives
    return directives.reduce((dirs, directive) => ({
        ...dirs,
        [directive.name.value]: directive.arguments.reduce((args, arg) =>
            ({...args, [arg.name.value]: convertArgument(arg.value)}), {})
    }), {})
}
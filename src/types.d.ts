type Directive = {
    [key: string]: string
}

/*type DirectiveArgument = {
    name: {
        value: string
    },
    value: {
        value: any
    }
}
type DirectiveNode = {
    name: string,
    arguments: DirectiveArgument[]
}*/

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
    type: string
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


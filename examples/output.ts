import { Schema } from 'graphschematojson/dist'

export const schema: Schema = {
    "types": {
        "Author": {
            "fields": {
                "name": {
                    "isNullable": false,
                    "isList": false,
                    "directives": {},
                    "type": "String"
                },
                "Books": {
                    "isNullable": true,
                    "isList": true,
                    "directives": {
                        "Bar": {
                            "baz": "bleh"
                        }
                    },
                    "type": "Book"
                }
            },
            "directives": {
                "Foo": {}
            },
            "interfaces": []
        },
        "Book": {
            "fields": {
                "title": {
                    "isNullable": false,
                    "isList": false,
                    "directives": {},
                    "type": "String"
                },
                "Authors": {
                    "isNullable": false,
                    "isList": false,
                    "directives": {},
                    "type": "Author"
                }
            },
            "directives": {
                "Entity": {}
            },
            "interfaces": []
        }
    },
    "unions": {},
    "interfaces": {}
}

export default schema
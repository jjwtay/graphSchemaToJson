import { classify } from "underscore.string";
import { BaseType } from "./base";
import { addDirectives, Directive } from "./directive";
import { addImplements } from "./implements";
import { flattenMap } from "./util";

export const writeClasses = (classMap, write = writeClass) => {
  const classKeys = Object.keys(classMap);
  return classKeys.reduce((acc, name) => {
    const classObj = classMap[name];
    acc[name] = write(name, classObj);
    return acc;
  }, {});
};

const className = name => classify(name);

type WriteOpts = {
  enable?: any;
  entityName?: string;
  extendsClass?: string;
};

const writeClass = (name, classObj, opts: WriteOpts = {}) => {
  let { extendsClass, entityName, enable } = opts;
  entityName = entityName || "class";
  enable = enable || {};

  const { directives, directiveKeys } = classObj;
  let header = `${className(entityName)} ${name}`;
  header = extendsClass
    ? [header, "extends", className(extendsClass)].join(" ")
    : header;
  header = enable.directives
    ? addDirectives(header, directives, directiveKeys)
    : header;
  header = enable.implements
    ? addImplements(header, classObj.implements, "implements")
    : header;
  const fields = classObj.fields || {};
  return `${header} {\n${writeFields(fields)}\n}\n`;
};

const writeFields = fields => {
  const fieldKeys = Object.keys(fields);
  const fieldMap = fieldKeys.reduce((acc, name) => {
    const fieldObj = fieldMap[name];
    acc[name] = writeField(name, fieldObj);
    return acc;
  }, {});
  return flattenMap(fieldMap, true);
};

const writeField = (fieldName, fieldObj) => {
  let { type, isNullable, isList, directives } = fieldObj;
  directives = directives || {};
  if (!isNullable) {
    directives.required = true;
  }
  const typeDef = isList ? `${type}[]` : type;
  let header = `${fieldName}: ${typeDef}`;
  return addDirectives(header, directives);
};

export class ClassType extends BaseType {
  write(classMap, write = this.writeClass) {
    const classKeys = Object.keys(classMap);
    return classKeys.reduce((acc, name) => {
      const classObj = classMap[name];
      acc[name] = write(name, classObj);
      return acc;
    }, {});
  }

  writeClass(name, classObj, opts: WriteOpts = {}) {
    const { enable, entityName, extendsClass } = opts;
    const { directives, decorators, directiveKeys } = classObj;
    let header = `${className(entityName)} ${name}`;
    header = extendsClass
      ? [header, "extends", className(extendsClass)].join(" ")
      : header;
    const directivesMap = directives || decorators;
    header =
      enable.directives || enable.decorators
        ? addDirectives(header, directivesMap, directiveKeys)
        : header;
    header = enable.implements
      ? addImplements(header, classObj.implements, "implements")
      : header;
    const fields = classObj.fields || {};
    return `${header} {\n${writeFields(fields)}\n}\n`;
  }

  addImplements(txt, $implements) {
    return [txt, this.writeImplements($implements)].join(" ");
  }

  writeImplements($implements) {
    return $implements.join(", ");
  }

  writeFields(fields) {
    const fieldKeys = Object.keys(fields);
    const fieldMap = fieldKeys.reduce((acc, name) => {
      const fieldObj = fieldMap[name];
      acc[name] = this.writeField(name, fieldObj);
      return acc;
    }, {});
    return flattenMap(fieldMap, true);
  }

  writeField(fieldName, fieldObj) {
    const {
      type,
      isNullable,
      isList,
      directives,
      decorators,
      memberKeys,
      keys
    } = fieldObj;
    let header = `${fieldName}: ${type}`;
    const decoratorMap = decorators || directives;
    const decoratorKeys = memberKeys || keys || Object.keys(decoratorMap);
    header = isNullable ? header : `${header}!`;
    header = isList ? `[${header}]` : header;
    return this.addDecorators(header, decoratorMap, decoratorKeys);
  }

  addDecorators(header, decorators, decoratorKeys) {
    const dirText = this.createDecoratorWriter(decorators, {
      keys: decoratorKeys
    }).write();
    return decoratorKeys.length > 0 ? [dirText, header].join("\n") : header;
  }

  createDecoratorWriter(directives, opts) {
    return new Directive(directives, opts);
  }
}

import { flattenMap } from "./util";

const addDirectives = (txt, directives, directiveKeys) =>
  [txt, writeDirectives(directives, directiveKeys)].join(" ");

const writeDirectives = (directives, directiveKeys) => {
  directiveKeys = directiveKeys || Object.keys(directives);
  return directiveKeys.reduce(directiveReducer(directives), {});
};

const directiveReducer = directives => {
  return (acc, name) => {
    const args = directives[name];
    acc[name] = writeDirective(name, args);
    return acc;
  };
};

const writeDirective = (name, args) => `@${name}(${writeDirectiveArgs(args)})`;

const writeDirectiveArgs = args =>
  flattenMap(Object.keys(args).reduce(argReducer(args), {}));

const argReducer = args => {
  return (acc, name) => {
    const argValue = args[name];
    acc[name] = writeArg(name, argValue);
    return acc;
  };
};

const writeArg = (name, arg) => `${name}: ${argValue}`;

export class Directive {
  constructor(directives, { keys, config = {} }) {
    this.directives = directives;
    this.keys = keys || Object.keys(directives);
    this.config = config;
  }

  write = () => {
    return this.keys.reduce(this.directiveReducer(directives), {});
  };

  directiveReducer = directives => {
    return (acc, name) => {
      const directive = directives[name];
      acc[name] = this.writeDirective(name, args);
      return acc;
    };
  };

  writeDirective = (name, args) => {
    return `@${name}(${this.writeDirectiveArgs(args)})`;
  };

  writeDirectiveArgs = args =>
    flattenMap(Object.keys(args).reduce(argReducer(args), {}));

  argReducer = args => {
    return (acc, name) => {
      const argValue = args[name];
      acc[name] = writeArg(name, argValue);
      return acc;
    };
  };

  writeArg = (name, arg) => `${name}: ${argValue}`;
}

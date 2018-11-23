import { flattenMap } from "./util";

const addDirectives = (txt, directives) =>
  [txt, writeDirectives(directives)].join(" ");

const writeDirectives = directives =>
  Object.keys(directives).reduce(directiveReducer(directives), {});

const directiveReducer = directives => {
  return (acc, name) => {
    const directive = directives[name];
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

import _ from 'lodash';
export function Capitalize(payload) {
   return _.capitalize(payload?.variable);
}

export function Deburr(payload) {
   return _.deburr(payload?.variable);
}

export function LowerCase(payload) {
   return _.lowerCase(payload?.variable);
}

export function LowerFirst(payload) {
   return _.lowerFirst(payload?.variable);
}

export function StartCase(payload) {
   return _.startCase(payload?.variable);
}

export function ToLower(payload) {
   return _.toLower(payload?.variable);
}

export function UpperCase(payload) {
   return _.upperCase(payload?.variable);
}

export function KebabCase(payload) {
   return _.kebabCase(payload?.variable);
}

export function UpperFirst(payload) {
   return _.upperFirst(payload?.variable);
}

export function CamelCase(payload) {
   return _.camelCase(payload?.variable);

}

export function SnakeCase(payload) {
   return _.snakeCase(payload?.variable);
}

export function ToUpper(payload) {
   return _.toUpper(payload?.variable);
}

export function Trim(payload) {
   return _.trim(payload?.variable);
}

export function TrimEnd(payload) {
   return _.trimEnd(payload?.variable);
}

export function TrimStart(payload) {
   return _.trimStart(payload?.variable);
}

export function Truncate(payload) {
   return _.truncate(payload?.variable);
}

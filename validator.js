'use strict';

let validator = module.exports = {};
const uuidValidate = require('uuid-validate');

/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param input
 * @param rules
 * @returns {boolean}
 */
validator.isValid = (input, rules) => {
  switch (rules) {
  case 'string':
    return typeof input === 'string';
  case 'number':
    return typeof input === 'number';
  case 'array':
    return Array.isArray(input);
  case 'object':
    return typeof input === 'object' && !Array.isArray(input);
  case 'boolean':
    return typeof input === 'boolean';
  case 'function':
    return typeof input === 'function';
  }
};

validator.isUUID = input => {
  return uuidValidate(input, 4);
};
/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
validator.isString = (input) => {
  return typeof input === 'string';
};

validator.isNumber = (input) => {
  return typeof input === 'number';
};

validator.isArray = (input) => {
  return Array.isArray(input);
};

validator.isObject = (input) => {
  return typeof input === 'object' && !Array.isArray(input) && input !== null;
};

validator.isBoolean = (input) => {
  return typeof input === 'boolean';
};

validator.isFunction = (input) => {
  return typeof input === 'function';
}; 

validator.hasRequiredProperties = (input, rules) => {
  if(typeof input === 'object'){
    Object.values(input).forEach((item)=>{
      if(item === 'object'){
        validator.hasRequiredProperties(item);
      } if (item != 'object') {
        validator.isValid(item, rules);
      } else {
        return false;
      }
    });
  }else {
    return false;
  }
};

validator.hasProperType = (input, rules) => {
  validator.isValid(input, rules);
};

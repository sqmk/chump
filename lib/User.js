'use strict';

let _ = require('lodash');

const DEFAULT_PROPERTIES = {
  id:     '',
  device: ''
};

/**
 * User
 */
class User {
  /**
   * Constructor for user
   *
   * @param {string} id     Id
   * @param {string} device Device name
   */
  constructor(id, device) {
    this.properties = Object.assign({}, DEFAULT_PROPERTIES);
    this.id         = _.isEmpty(id) ? DEFAULT_PROPERTIES.id : id;
    this.device     = _.isEmpty(device) ? DEFAULT_PROPERTIES.device : device;
  }

  /**
   * Convenience method for validating a user object
   *
   * @param {mixed} user User
   */
  static validateUser(user) {
    validateUser(user);
  }

  /**
   * Get id
   *
   * @return {string} Id
   */
  get id() {
    return this.properties.id;
  }

  /**
   * Set id
   *
   * @param {string} value Value
   */
  set id(value) {
    validateId(value);

    this.properties.id = value;
  }

  /**
   * Get device name
   *
   * @return {string} Device name
   */
  get device() {
    return this.properties.device;
  }

  /**
   * Set device name
   *
   * @param {string} value Value
   */
  set device(value) {
    validateDevice(value);

    this.properties.device = value;
  }
}

/**
 * Validate id
 *
 * @param {string} value Id
 */
function validateId(value) {
  if (!value.match(/^[a-z0-9]{30}$/i)) {
    throw new Error('User id must be 30 characters long and alphanumeric');
  }
}

/**
 * Validate device name
 *
 * @param {string} value Device name
 */
function validateDevice(value) {
  if (!value.match(/^[a-z0-9-]{0,25}$/i)) {
    throw new Error('Device name must be no longer than 25 characters long and alphanumeric');
  }
}

/**
 * Validate user
 *
 * @param {mixed} value User
 */
function validateUser(value) {
  if (!(value instanceof User)) {
    throw new Error('Expecting type User');
  }
}

module.exports = User;

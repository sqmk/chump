'use strict';

var _ = require('lodash');

const DEFAULT_PROPERTIES = {
  'id':         '',
  'deviceName': ''
};

/**
 * User
 */
class User {
  /**
   * Constructor for user
   *
   * @param {string} id         Id
   * @param {string} deviceName Device name
   */
  constructor(id, deviceName) {
    this.properties = DEFAULT_PROPERTIES;
    this.id         = _.isEmpty(id) ? DEFAULT_PROPERTIES.id : id;
    this.deviceName = _.isEmpty(deviceName) ? DEFAULT_PROPERTIES.deviceName : deviceName;
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
  get deviceName() {
    return this.properties.deviceName;
  }

  /**
   * Set device name
   *
   * @param {string} value Value
   */
  set deviceName(value) {
    validateDeviceName(value);

    this.properties.deviceName = value;
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
function validateDeviceName(value) {
  if (!value.match(/^[a-z0-9-]{0,25}$/i)) {
    throw new Error('Device name must be no longer than 25 characters long and alphanumeric');
  }
}

/**
 * Validate user.
 *
 * @param {mixed} value User
 */
function validateUser(value) {
  if (!(value instanceof User)) {
    throw new Error('Expecting type User');
  }
}

module.exports = User;

'use strict';

let _ = require('lodash');

const DEFAULT_PROPERTIES = {
  'id': ''
};

/**
 * Group
 */
class Group {
  /**
   * Constructor for group
   *
   * @param {string} id Id
   */
  constructor(id, device) {
    this.properties = DEFAULT_PROPERTIES;
    this.id         = _.isEmpty(id) ? DEFAULT_PROPERTIES.id : id;
  }

  /**
   * Convenience method for validating a group object
   *
   * @param {mixed} group Group
   */
  static validateGroup(group) {
    validateGroup(group);
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
}

/**
 * Validate group
 *
 * @param {mixed} value Group
 */
function validateGroup(value) {
  if (!(value instanceof Group)) {
    throw new Error('Expecting type Group');
  }
}

/**
 * Validate id
 *
 * @param {string} value Id
 */
function validateId(value) {
  if (!value.match(/^[a-z0-9]{30}$/i)) {
    throw new Error('Group id must be 30 characters long and alphanumeric');
  }
}

module.exports = Group;

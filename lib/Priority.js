'use strict';

let _ = require('lodash');

const PRIORITY_SET = {
  'emergency': 2,
  'high':      1,
  'normal':    0,
  'low':       -1,
  'lowest':    -2
};

const DEFAULT_EMERGENCY_PROPERTIES = {
  'retry':    30,
  'expire':   86400,
  'callback': null
}

/**
 * Priority
 */
class Priority {
  /**
   * Constructor for priority
   *
   * @param {string} name    Name
   * @param {object} options Additional options
   */
  constructor(name, options) {
    if (name == 'emergency' && !(this instanceof EmergencyPriority)) {
      return new EmergencyPriority(name, options);
    }

    this.properties = {};
    this.name       = name;
  }

  /**
   * Convenience method to validate priority
   *
   * @param {string} value Value
   */
  static validatePriority(value) {
    validatePriority(value);
  }

  /**
   * Get name
   *
   * @return {sting} Name
   */
  get name() {
    return this.priorityName;
  }

  /**
   * Set name
   *
   * @param {string} name Name
   */
  set name(name) {
    validatePriorityName(name);

    this.priorityName        = name;
    this.properties.priority = PRIORITY_SET[name];
  }
}

/**
 * Emergency priority
 */
class EmergencyPriority extends Priority {
  /**
   * Constructor for emergency priority
   *
   * @param {name}   name    Name
   * @param {object} options Options
   */
  constructor(name, options) {
    super(name);

    options = _.defaults(Object(options), DEFAULT_EMERGENCY_PROPERTIES);
    for (let i in options) {
      this[i] = options[i];
    }
  }

  /**
   * Get retry
   *
   * @return {integer} Retry
   */
  get retry() {
    return this.properties.retry;
  }

  /**
   * Set retry
   *
   * @param {integer} value Value
   */
  set retry(value) {
    validateRetry(value);

    this.properties.retry = value;
  }

  /**
   * Get expire
   *
   * @return {integer} Expire
   */
  get expire() {
    return this.properties.expire;
  }

  /**
   * Set expire
   *
   * @param {integer} value Value
   */
  set expire(value) {
    validateExpire(value);

    this.properties.expire = value;
  }

  /**
   * Get callback
   *
   * @return {string} Callback url
   */
  get callback() {
    return this.properties.callback;
  }

  /**
   * Set callback
   *
   * @param {string} value Value
   */
  set callback(value) {
    this.properties.callback = value;
  }
}

/**
 * Validate priority
 *
 * @param {string} value Value
 */
function validatePriority(value) {
  if (!(value instanceof Priority)) {
    throw new Error('Expecting type Priority');
  }
}

/**
 * Validate priority name
 *
 * @param {string} name Priority name
 */
function validatePriorityName(name) {
  if (!_.has(PRIORITY_SET, name)) {
    throw new Error(`Priority name ${name} not valid`);
  }
}

/**
 * Validate retry
 *
 * @param {integer} value Value
 */
function validateRetry(value) {
  if (value < 30) {
    throw new Error('Retry must be a minimum of 30 seconds');
  }
}

/**
 * Validate expire
 *
 * @param {integer} value Value
 */
function validateExpire(value) {
  if (value > 86400) {
    throw new Error('Expire must not exceed 24 hours');
  }
}

module.exports = Priority;

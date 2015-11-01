'use strict';

let User     = require('./User');
let Priority = require('./Priority');
let Sound    = require('./Sound');

const DEFAULT_PROPERTIES = {
  'message':    null,
  'enableHtml': 0,
  'user':       null,
  'url':        null,
  'urlTitle':   null,
  'priority':   null,
  'timestamp':  null,
  'sound':      null
};

/**
 * Message
 */
class Message {
  /**
   * Constructor for message
   *
   * @param {object} options Options
   */
  constructor(options) {
    this.properties = Object.assign({}, DEFAULT_PROPERTIES);

    for (let i in options) {
      this[i] = options[i];
    }
  }

  /**
   * Convenience method to validate message
   *
   * @param {mixed} message Message
   */
  static validateMessage(message) {
    validateMessage(message);
  }

  /**
   * Get message
   *
   * @return {string} Message
   */
  get message() {
    return this.properties.message;
  }

  /**
   * Set message
   *
   * @param {string} value Value
   */
  set message(value) {
    this.properties.message = value;
  }

  /**
   * Get enable html option
   *
   * @return {integer} Enable html
   */
  get enableHtml() {
    return this.properties.enableHtml;
  }

  /**
   * Enable html
   *
   * @param {mixed} value Value
   */
  set enableHtml(value) {
    this.properties.enableHtml = value ? 1 : 0;
  }

  /**
   * Get user
   *
   * @return {User} User
   */
  get user() {
    return this.properties.user;
  }

  /**
   * Set user
   *
   * @param {User} value Value
   */
  set user(value) {
    validateUserOrGroup(value);

    this.properties.user = value;
  }

  /**
   * Get title
   *
   * @return {string} Title
   */
  get title() {
    return this.properties.title;
  }

  /**
   * Set title
   *
   * @param {string} value Value
   */
  set title(value) {
    validateTitle(value);

    this.properties.title = value;
  }

  /**
   * Get URL
   *
   * @return {string} URL
   */
  get url() {
    return this.properties.url;
  }

  /**
   * Set URL
   *
   * @param {string} value Value
   */
  set url(value) {
    validateUrl(value);

    this.properties.url = value;
  }

  /**
   * Get URL title
   *
   * @return {string} URL title
   */
  get urlTitle() {
    return this.properties.urlTitle;
  }

  /**
   * Set URL title
   *
   * @param {string} value URL title
   */
  set urlTitle(value) {
    validateUrlTitle(value);

    this.properties.urlTitle = value;
  }

  /**
   * Get priority
   *
   * @return {Priority} Priority
   */
  get priority() {
    return this.properties.priority;
  }

  /**
   * Set priority
   *
   * @param {Priority} value Value
   */
  set priority(value) {
    Priority.validatePriority(value);

    this.properties.priority = value;
  }

  /**
   * Get timestamp
   *
   * @return {integer} Timestamp
   */
  get timestamp() {
    return this.properties.timestamp;
  }

  /**
   * Set timestamp
   *
   * @param {integer} value Value
   */
  set timestamp(value) {
    this.properties.timestamp = parseInt(value);
  }

  /**
   * Get sound
   *
   * @return {Sound} Sound
   */
  get sound() {
    return this.properties.sound;
  }

  /**
   * Set sound
   *
   * @param {Sound} value Value
   */
  set sound(value) {
    Sound.validateSound(value);

    this.properties.sound = value;
  }
}

/**
 * Validate message
 *
 * @param {mixed} value Message
 */
function validateMessage(value) {
  if (!(value instanceof Message)) {
    throw new Error('Expecting type Message');
  }
}

/**
 * Validate user or group
 *
 * @param {mixed} user User or group
 */
function validateUserOrGroup(user) {
  if (user instanceof User) {
    return;
  }

  if (user instanceof Group) {
    return;
  }

  throw new Error('Expecting type user or group');
}

/**
 * Validate title
 *
 * @param {mixed} value Value
 */
function validateTitle(value) {
  if (value.length > 100) {
    throw new Error('Title may not exceed 100 characters');
  }
}

/**
 * Validate url
 *
 * @param {mixed} value Value
 */
function validateUrl(value) {
  if (value.length > 500) {
    throw new Error('URL may not exceed 500 characters');
  }
}

/**
 * Validate url title
 *
 * @param {mixed} value Value
 */
function validateUrlTitle(value) {
  if (value.length > 50) {
    throw new Error('URL title may not exceed 50 characters');
  }
}

module.exports = Message;

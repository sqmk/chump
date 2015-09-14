'use strict';

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

class Message {
  constructor(values) {
    this.properties = DEFAULT_PROPERTIES;

    for (var i in values) {
      this[i] = values[i];
    }
  }

  static validateMessage(message) {
    validateMessage(message);
  }

  get message() {
    return this.properties.message;
  }

  set message(value) {
    this.properties.message = value;
  }

  get enableHtml() {
    return this.properties.enableHtml;
  }

  set enableHtml(value) {
    this.properties.enableHtml = value ? 1 : 0;
  }

  get user() {
    return this.properties.user;
  }

  set user(value) {
    this.properties.user = value;
  }

  get title() {
    return this.properties.title;
  }

  set title(value) {
    this.properties.title = value;
  }

  get url() {
    return this.properties.url;
  }

  set url(value) {
    this.properties.url = value;
  }

  get urlTitle() {
    return this.properties.urlTitle;
  }

  set urlTitle(value) {
    this.properties.urlTitle = value;
  }

  get priority() {
    return this.properties.priority;
  }

  set priority(value) {
    this.properties.priority = value;
  }

  get timestamp() {
    return this.properties.timestamp;
  }

  set timestamp(value) {
    this.properties.timestamp = value;
  }

  get sound() {
    return this.properties.sound;
  }

  set sound(value) {
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

module.exports = Message;

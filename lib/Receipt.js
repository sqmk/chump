'use strict';

let _ = require('lodash');

const DEFAULT_PROPERTIES = {
  'id':              null,
  'acknowledged':    false,
  'acknowledgedAt':  null,
  'acknowledgedBy':  null,
  'lastDeliveredAt': null,
  'expired':         true,
  'expiresAt':       null,
  'calledBack':      false,
  'calledBackAt':    null
}

/**
 * Receipt
 */
class Receipt {
  /**
   * Constructor for receipt
   *
   * @param {string} id      Id
   * @param {object} results Results
   */
  constructor(id, results) {
    this.properties    = Object.assign({}, DEFAULT_PROPERTIES);
    this.properties.id = id;

    for (let i in results) {
      this.properties[_.camelCase(i)] = results[i];
    }
  }

  /**
   * Get Id
   *
   * @return {string} Id
   */
  get id() {
    return this.properties.id;
  }

  /**
   * Is acknowledged
   *
   * @return {boolean} True if acknowledged, false if not
   */
  get isAcknowledged() {
    return this.properties.acknowledged;
  }

  /**
   * Set acknowledged
   *
   * @param {mixed} value Value
   */
  set acknowledged(value) {
    this.properties.acknowledged = value ? true : false;
  }

  /**
   * Get acknowledged at
   *
   * @return {mixed} Acknowledged at timestamp, or null
   */
  get acknowledgedAt() {
    return this.properties.acknowledgedAt;
  }

  /**
   * Set acknowledged at
   *
   * @param {mixed} value Value
   */
  set acknowledgedAt(value) {
    this.properties.acknowledgedAt = value ? value : null;
  }

  /**
   * Get acknowledged by
   *
   * @return {mixed} User id, or null
   */
  get acknowledgedBy() {
    return this.properties.acknowledgedBy;
  }

  /**
   * Set acknowledged by
   *
   * @param {mixed} value Value
   */
  set acknowledgedBy(value) {
    this.properties.acknowledgedBy = !_.isEmpty(value) ? value : null;
  }

  /**
   * Get delivered at
   *
   * @return {mixed} Last delivered timestamp, or null
   */
  get lastDeliveredAt() {
    return this.properties.lastDeliveredAt;
  }

  /**
   * Set last delivered at
   *
   * @param {mixed} value Value
   */
  set lastDeliveredAt(value) {
    this.properties.lastDeliveredAt = value ? value : null;
  }

  /**
   * Is expired
   *
   * @return {boolean} True if expired, false if not
   */
  get isExpired() {
    return this.properties.expired;
  }

  /**
   * Set expired
   *
   * @param {mixed} value Value
   */
  set expired(value) {
    this.properties.expired = value ? true : false;
  }

  /**
   * Get expires at
   *
   * @return {mixed} Expires at timestamp, or null
   */
  get expiresAt() {
    return this.properties.expiresAt;
  }

  /**
   * Set expires at
   *
   * @param {mixed} value Value
   */
  set expiresAt(value) {
    this.properties.expiresAt = value ? value : null;
  }

  /**
   * Has pushover called back
   *
   * @return {boolean} True if Pushover called back to server, or false
   */
  get hasCalledBack() {
    return this.properties.calledBack;
  }

  /**
   * Set called back
   *
   * @param {mixed} value Value
   */
  set calledBack(value) {
    this.properties.calledBack = value ? true : false;
  }

  /**
   * Get called back at
   *
   * @return {mixed} Called back at timestamp, or null
   */
  get calledBackAt() {
    return this.properties.calledBackAt;
  }

  /**
   * Set called back at
   *
   * @param {mixed} value Value
   */
  set calledBackAt(value) {
    this.properties.calledBackAt = value ? value : null;
  }
}

module.exports = Receipt;

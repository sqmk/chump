'use strict';

let _ = require('lodash');

const PUSHOVER_HOST    = 'https://api.pushover.net';
const PUSHOVER_VERSION = '1';

/**
 * Main client class
 */
class Client {
  /**
   * Constructor for client
   *
   * @param {string} apiToken Api token
   */
  constructor(apiToken) {
    this.options = {
      'host':    PUSHOVER_HOST,
      'version': PUSHOVER_VERSION
    };

    this.app = {
      'limit':     null,
      'remaining': null,
      'reset':     null
    }

    this.apiToken = apiToken;
  }

  /**
   * Get api token
   *
   * @return {string} Get api token
   */
  get apiToken() {
    return this.options.apiToken;
  }

  /**
   * Set api token
   *
   * @param {string} value Api token
   */
  set apiToken(value) {
    validateApiToken(value);

    this.options.apiToken = value;
  }

  /**
   * Send message
   *
   * @param {Message} message Message
   *
   * @return {Promise} Promise for chaining
   */
  sendMessage(message) {
    let SendMessage = require('./Command/SendMessage');

    return this.invokeCommand(new SendMessage(message));
  }

  /**
   * Verify user
   *
   * @param {User} user User
   *
   * @return {Promise} Promise for chaining
   */
  verifyUser(user) {
    let VerifyUser = require('./Command/VerifyUser');

    return this.invokeCommand(new VerifyUser(user));
  }

  /**
   * Cancel emergency
   *
   * @param {receipt} receipt Receipt
   *
   * @return {boolean} Cancellation status
   */
  cancelEmergency(receipt) {
    let CancelEmergency = require('./Command/CancelEmergency');

    return this.invokeCommand(new CancelEmergency(receipt));
  }

  /**
   * Get group details
   *
   * @param {Group} group Group
   *
   * @return {Promise} Promise for chaining
   */
  getGroupDetails(group) {
    let GetGroupDetails = require('./Command/GetGroupDetails');

    return this.invokeCommand(new GetGroupDetails(group));
  }

  /**
   * Add user to group
   *
   * @param {User}  user  User
   * @param {Group} group Group
   *
   * @return {Promise} Promise for chaining
   */
  addUserToGroup(user, group) {
    let AddUserToGroup = require('./Command/AddUserToGroup');

    return this.invokeCommand(new AddUserToGroup(user, group));
  }

  /**
   * Remove user from group
   *
   * @param {User}  user  User
   * @param {Group} group Group
   *
   * @return {Promise} Promise for chaining
   */
  removeUserFromGroup(user, group) {
    let RemoveUserFromGroup = require('./Command/RemoveUserFromGroup');

    return this.invokeCommand(new RemoveUserFromGroup(user, group));
  }

  enableGroupUser(user, group) {

  }

  /**
   * Enable group user
   *
   * @param {User}  user  User
   * @param {Group} group Group
   *
   * @return {Promise} Promise for chaining
   */
  enableGroupUser(user, group) {
    let EnableGroupUser = require('./Command/EnableGroupUser');

    return this.invokeCommand(new EnableGroupUser(user, group));
  }

  /**
   * Disable group user
   *
   * @param {User}  user  User
   * @param {Group} group Group
   *
   * @return {Promise} Promise for chaining
   */
  disableGroupUser(user, group) {
    let DisableGroupUser = require('./Command/DisableGroupUser');

    return this.invokeCommand(new DisableGroupUser(user, group));
  }

  /**
   * Rename group
   *
   * @param {Group}  group Group
   * @param {string} name  Name
   *
   * @return {Promise} Promise for chaining
   */
  renameGroup(group, name) {
    let RenameGroup = require('./Command/RenameGroup');

    return this.invokeCommand(new RenameGroup(group, name));
  }

  /**
   * Get transport
   *
   * Lazy loads transport
   *
   * @return {object} Transport
   */
  getTransport() {
    if (_.isUndefined(this.transport)) {
      let Transport = require('./Transport');

      this.transport = new Transport(this);
    }

    return this.transport;
  }

  /**
   * Invoke command
   *
   * @param {mixed} command Command
   *
   * @return {Promise} Promise for chaining
   */
  invokeCommand(command) {
    return command.invoke(this);
  }

  /**
   * Get app limit
   *
   * @return {integer} Limit
   */
  get appLimit() {
    return this.app.limit;
  }

  /**
   * Get app remaining
   *
   * @return {integer} Remaining
   */
  get appRemaining() {
    return this.app.remaining;
  }

  /**
   * Get app reset
   *
   * @return {integer} Timestamp
   */
  get appReset() {
    return this.app.reset;
  }
}

/**
 * Validate api token
 *
 * @param {string} value Api token
 */
function validateApiToken(value) {
  if (!value.match(/^[a-z0-9]{30}$/i)) {
    throw new Error('API token must be 30 characters long and alphanumeric');
  }
}

module.exports = Client;

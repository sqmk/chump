#!/usr/bin/env node

'use strict';

var chump  = require('../lib/Chump');
var config = require('./config.json');

let client  = new chump.Client(config.api_token);
let user    = new chump.User(config.user_id, config.device_name);
let message = new chump.Message({
  'title':      'Test: title',
  'message':    'Test: message',
  'user':       user,
  'url':        'http://example.org',
  'urlTitle':   'Example.org',
  'priority':   new chump.Priority('low')
});

console.log('Sending message...');

client.sendMessage(message)
  .then(() => {
    console.log('Message sent!');
  });

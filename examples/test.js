#!/usr/bin/env node

'use strict';

var chump  = require('../lib/Chump');
var config = require('./config.json');

let client = new chump.Client(config.api_token);
let user   = new chump.User(config.user_id, config.device_name);

console.log(`Chump version: ${chump.version}`);
console.log('Starting promise');
console.log('Verifying user');

client.verifyUser(user)
  .then((result) => {
    console.log('Sending message');

    return client.sendMessage(
      new chump.Message({
        'title':      'Chump client test',
        'message':    '<b>test</b>',
        'enableHtml': true,
        'user':       user,
        'url':        'http://google.com',
        'urlTitle':   'Google dot com',
        'timestamp':  1,
        'sound':      new chump.Sound('cashregister')
      })
    );
  })
  .then(() => {
    console.log(`App limit: ${client.appLimit}`);
    console.log(`App remaining: ${client.appRemaining}`);
    console.log(`App reset: ${client.appReset}`);
  })
  .catch((reason) => {
    console.log(reason.stack);
  });

console.log('Finishing promise');

#!/usr/bin/env node

'use strict';

var chump  = require('../lib/Chump');
var config = require('./config.json');

let client  = new chump.Client(config.api_token);
let user    = new chump.User(config.user_id, config.user_device);
let message = new chump.Message({
  'title':      'The roof is on fire!',
  'message':    '<b>Put it out immediately!</b>',
  'enableHtml': true,
  'user':       user,
  'priority':   new chump.Priority('emergency'),
  'sound':      new chump.Sound('siren')
})

console.log('Sending emergency message...');

client.sendMessage(message)
  .then((receipt) => {
    console.log(`Got receipt: ${receipt}`);

    return client.cancelEmergency(receipt);
  })
  .then((status) => {
    console.log(`Emergency cancelled: ${status}`);

    console.log(`App limit: ${client.appLimit}`);
    console.log(`App remaining: ${client.appRemaining}`);
    console.log(`App reset: ${client.appReset}`);
  })
  .catch((reason) => {
    console.log(reason.stack);
  });

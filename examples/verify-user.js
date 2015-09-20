#!/usr/bin/env node

'use strict';

var chump  = require('../lib/Chump');
var config = require('./config.json');

let client  = new chump.Client(config.api_token);
let user    = new chump.User(config.user_id, config.user_device);

console.log('Verifying user...');

client.verifyUser(user)
  .then((result) => {
    console.log('User verified!');
  });

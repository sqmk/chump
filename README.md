# Chump - Pushover.net client for node.js

[![NPM Version](https://badge.fury.io/js/chump.svg)](https://www.npmjs.com/package/chump)
[![Build Status](https://api.travis-ci.org/sqmk/chump.svg?branch=master)](https://travis-ci.org/sqmk/chump)

Chump is a client for the popular [Pushover.net](https://pushover.net) real-time
notification service.

Use Chump to send Android, iOS, watchOS, and desktop notifications.

## Installation

Chump was written for *Node 4+*.

`npm install --save chump`

## Usage

It is easy to send messages via Pushover.net using Chump.

```js
let chump = require('chump');

// Instantiate client with your api token
let client = new chump.Client('yourApiToken');

// Instantiate a destination user
let user = new chump.User('userIdHere', 'optionalUserDeviceHere');

// Instantiate a message
let message = new chump.Message({
  'title':    'Example title',
  'message':  'Example message',
  'user':     user,
  'url':      'http://example.org',
  'urlTitle': 'Example.org',
  'priority': new chump.Priority('low'),
  'sound':    new chump.Sound('magic')
});

// Send the message, handle result within a Promise
client.sendMessage(message)
  .then(() => {
	console.log('Message sent.');
  })
  .catch((reason) => {
  	console.log('An error occurred.');
    console.log(reason.stack);
  })
```

All client methods that send a command return a *Promise*.

## Examples

Want to see more examples? View them in the [examples](examples) directory included
in this repository.

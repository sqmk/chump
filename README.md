# Chump - Pushover.net client for node.js

[![NPM Version](https://badge.fury.io/js/chump.svg)](https://www.npmjs.com/package/chump)
[![Build Status](https://api.travis-ci.org/sqmk/chump.svg?branch=master)](https://travis-ci.org/sqmk/chump)

Chump is a client for the popular [Pushover.net](https://pushover.net) real-time
notification service.

Use Chump to send Android, iOS, watchOS, and desktop notifications.

Chump makes **full use** of Pushover.net's API.

## Installation

Chump was written for **node.js 4+**.

`npm install --save chump`

## Basic Usage

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
  });
```

All client methods that send a command return a **Promise**.

## Advanced Usage

Chump supports the entire Pushover.net API. The client offers convenience methods
that correspond to each Pushover.net endpoint.

### .verifyUser

### .getReceipt

### .cancelEmergency

### .getGroupDetails

### .addUserToGroup

### .removeUserFromGroup

### .enableGroupUser

### .disableGroupUser

### .renameGroup

## Track Application Limitations

Pushover.net limits the number of messages emitted from its service. Chump keeps
track of these limitations after each successful message sent. You can access app
limitations from the following client properties:

```js
// Maximum number of messages that can be sent
let appLimit = client.appLimit;

// Number of messages remaining in time period
let appRemaining = client.appRemaining;

// Date when app remaining resets to app limit
let appReset = client.appReset;

// 
```

## Examples

Want to see more examples? View them in the [examples](examples) directory included
in this repository.

## License

This software is licensed under the MIT License. [View the license](LICENSE).

Copyright © 2015 [Michael K. Squires](http://sqmk.com)
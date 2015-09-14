'use strict';

var _ = require('lodash');

const SOUND_SET = {
  'pushover':     'Pushover (default)',
  'bike':         'Bike',
  'bugle':        'Bugle',
  'cashregister': 'Cash Register',
  'classical':    'Classical',
  'cosmic':       'Cosmic',
  'falling':      'Falling',
  'gamelan':      'Gamelan',
  'incoming':     'Incoming',
  'intermission': 'Intermission',
  'magic':        'Magic',
  'mechanical':   'Mechanical',
  'pianobar':     'Piano Bar',
  'siren':        'Siren',
  'spacealarm':   'Space Alarm',
  'tugboat':      'Tug Boat',
  'alien':        'Alien Alarm (long)',
  'climb':        'Climb (long)',
  'persistent':   'Persistent (long)',
  'echo':         'Pushover Echo (long)',
  'updown':       'Up Down (long)',
  'none':         'None (silent)'
};

/**
 * Sound
 */
class Sound {
  /**
   * Constructor for sound
   *
   * @param {string} name Name of sound
   */
  constructor(name) {
    validateSoundName(name);

    this.name        = name;
    this.description = SOUND_SET[name];
  }

  /**
   * Convenience method to validate sound name
   *
   * @param {string} name Sound name
   */
  static validateSoundName(name) {
    validateSoundName(name);
  }
}

/**
 * Validate sound name
 *
 * @param {string} name Name
 */
function validateSoundName(name) {
  if (!_.has(SOUND_SET, name)) {
    throw new Error(`Sound name ${name} not valid`);
  }
}

module.exports = Sound;

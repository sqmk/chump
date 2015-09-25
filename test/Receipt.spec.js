'use strict';

let expect = require('chai').expect;
let Receipt  = require('../lib/Receipt');

describe('Receipt', () => {
  beforeEach(() => {
    this.stubResult = {
      'acknowledged':      true,
      'acknowledged_at':   1234,
      'acknowledged_by':   '1234567890',
      'last_delivered_at': 1234,
      'expired':           true,
      'expires_at':        12345678,
      'called_back':       true,
      'called_back_at':    23455678
    };

    this.receipt = new Receipt(
      '1234567890',
      this.stubResult
    );
  });

  describe('constructor', () => {
    it('should set id', () => {
      expect(this.receipt).to.have.property('id');
    });

    it('should set properties', () => {
      expect(this.receipt).to.have.property('properties');
    });

    it('should convert properties to camelCase', () => {
      expect(this.receipt.properties).to.have.property('calledBackAt');
      expect(this.receipt.properties.calledBackAt).to.equal(this.stubResult.called_back_at);
    });
  });
});

'use strict';

let expect = require('chai').expect;
let User   = require('../lib/User');

describe('User', () => {
  describe('constructor', () => {
    beforeEach(() => {
      this.id     = '123456789012345678901234567890';
      this.device = 'test-device';
      this.user   = new User(this.id, this.device);
    });

    it('should have default properties', () => {
      expect(this.user).to.have.all.keys('properties');
    });

    it('should have set initial id', () => {
      expect(this.user.id).equal(this.id);
    });

    it('should have set initial device', () => {
      expect(this.user.device).equal(this.device);
    });
  });
});

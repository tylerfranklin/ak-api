'use strict';

let mocha = require('mocha'),
    chai = require('chai'),
    restify = require('restify');

const expect = chai.expect,
    assert = chai.assert,
    entrypoint = require('../../index'),
    loadRoutes = require('../../lib/load_modules');

let testServer = restify.createServer();

module.exports = describe('"loadRoutes"', () => {

  beforeEach(() => {
    testServer = restify.createServer();
  });

  it('should be a function', () => {
    assert.typeOf(loadRoutes, 'function');
  });

  it('should return error when no endpoint definitions found', done => {
    loadRoutes('./endpoints', testServer, null, (err, data) => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('No endpoint definitions found in ./endpoints.');
      done();
    });
  });

  it('should return error when endpoint definition returns the wrong type', done => {
    loadRoutes('./spec/data/definitions/invalid/return', testServer, null, (err, data) => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Endpoint definition\'s return value has a value type of string and must be a(n) object.');
      done();
    });
  });

  it('should return error when def.respondTo is the wrong type', done => {
    loadRoutes('./spec/data/definitions/invalid/respondTo', testServer, null, (err, data) => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Endpoint definition\'s "respondTo" property has a value type of object and must be a(n) string.');
      done();
    });
  });

  it('should return error when def.endpoint is the wrong type', done => {
    loadRoutes('./spec/data/definitions/invalid/endpoint', testServer, null, (err, data) => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Endpoint definition\'s "endpoint" property has a value type of object and must be a(n) string.');
      done();
    });
  });

  it('should return error when def.handledBy is the wrong type', done => {
    loadRoutes('./spec/data/definitions/invalid/endpoint', testServer, null, (err, data) => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Endpoint definition\'s "handledBy" property has a value type of string and must be a(n) function.');
      done();
    });
  });

});

'use strict';

const request = require('supertest');
const app = require('./index');

const chai = require('chai');

let expect = chai.expect;



describe('api location validation', function() {
  it('respond to post with Bad Request status code and json', function(done) {
      request(app)
          .post('/api/location')
          .type('json')
          .send(`{
                "payload": {
                  "name": "Kremlin, Moscow",
                  "latlong": {
                    "latitude": "abc",
                    "longitude": 37.617778
                  }
                }
              }`
          )
          .expect('Content-Type', /json/)
          .expect(400, done);
  });
});

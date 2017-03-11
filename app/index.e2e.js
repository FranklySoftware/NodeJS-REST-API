'use strict';

const request = require('supertest');
const app = require('./index');
const mongoose = require('mongoose');
const Locations = mongoose.model('locations');

const chai = require('chai');
let expect = chai.expect;


describe('GET /ping', function() {
    it('respond with success status code and json', function(done) {
        request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('api location E2E', function() {
    it('respond to post with success status code and json', function(done) {
        request(app)
            .post('/api/location')
            .type('json')
            .send(`{
                	"payload": {
                		"name": "Kremlin, Moscow",
                		"latlong": {
                			"latitude": 55.751667,
                			"longitude": 37.617778
                		}
                	}
                }`
            )
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond to get with success status code and array orderByDistance', function(done) {
         request(app)
            .get('/api/location/orderByDistance/55.751667/37.617778')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res)=>{
              let resObject = JSON.parse(res.body)
              expect(resObject[0]['obj']['name']).to.equal("Kremlin, Moscow")
              done()
            })

    });


});

// shortener/test/spec/shorturlCtrlSpec.js

const server = require('./../server');
const request = require('supertest');
const assert = require('assert');

describe('ENDPOINTS BY ShorturlCtrl', () => {

    describe('POST HTTP://SHORTENER/CREATE?url=:url&CUSTOM_ALIAS=:custom_alias', () => {

        it('SHORTEN URL W/O CUSTOM ALIAS', (done) => {
            request(server).post('/shortener/create?url=http%3A%2F%2Fwww.google.com').end((err, res) => {
                assert.equal(res.statusCode, 201);
                done();
            });
        });

        it('SHORTEN URL W/ CUSTOM ALIAS', (done) => {
            request(server).post('/shortener/create?url=http%3A%2F%2Fwww.google.com&CUSTOM_ALIAS=google').end((err, res) => {
                assert.equal(res.statusCode, 201);
                done();
            });
        });

        it('CUSTOM ALIAS ALREADY EXISTS (ERR_001)', (done) => {
            request(server).post('/shortener/create?url=http%3A%2F%2Fwww.google.com&CUSTOM_ALIAS=google').end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.err_code, '001');
                done();
            });
        });

        it('NO URL TO BE SHORTEN (ERR_003)', (done) => {
            request(server).post('/shortener/create').end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.err_code, '003');
                done();
            });
        });

        it('URL NOT VALID (ERR_004)', (done) => {
            request(server).post('/shortener/create?url=URL_NOT_VALID').end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.err_code, '004');
                done();
            });
        });

    });

    describe('GET HTTP://SHORTENER/U/:alias', () => {

        it('RETRIEVE URL', (done) => {
            request(server).get('/shortener/u/google').end((err, res) => {
                assert.equal(res.statusCode, 302);
                done();
            });
        });

        it('SHORTENED URL NOT FOUND (ERR_002)', (done) => {
            request(server).get('/shortener/u/SHORTENED_URL_NOT_FOUND').end((err, res) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.err_code, '002');
                done();
            });
        });

    });

    describe('GET HTTP://SHORTENER/TOPTEN', () => {

        it('TOP 10 RETRIEVED', (done) => {
            request(server).get('/shortener/topTen').end((err, res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(JSON.parse(res.text).topTen.length, 2);
                done();
            });
        });

    });

});
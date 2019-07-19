const assert = require('assert')
const request = require('supertest')
var server;

before(function() {
    server = require('../server')
});

after(function(done){
    server.close(done)
})

describe('muc - model ur controllers', function() {
    it('should 404 properly', function(done){
        request(server)
        .get('/hdasjwasd/aawas/12314')
        .expect(404, done);
    })

    it('should get index', function(done) {
        request(server)
        .get('/')
        .expect((res) => res.body = 'hello world')
        .expect(200, done);
    });

    it('should get home', function(done) {
        request(server)
        .get('/home')
        .expect((res) => res.body = 'get')
        .expect(200, done);
    })

    it('should post home', function(done) {
        request(server)
        .post('/home')
        .expect((res) => res.body = 'post')
        .expect(200, done);
    })

    it('should save user', function(done) {
        request(server)
        .post('/home/saveUser')
        .expect((res) => res.body = 'ok')
        .expect(200, done);
    })
});
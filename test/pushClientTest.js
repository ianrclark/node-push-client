var should = require('chai').should(),
    PushClient = require('../lib/client');

describe('PushClient', function(){

    describe('channelForUser()', function() {
        var client = new PushClient({ salt: "salty salt"});

        it('should generate a channel name based on a string user', function(){
            client.channelForUser("12345").should.equal('9b1eb09e22337e34c37394fbd2461cf0');
        });

        it('should generate a channel name based on a numeric user', function(){
            client.channelForUser(12345).should.equal('9b1eb09e22337e34c37394fbd2461cf0');
        });
    });

});
'use strict';

var crypto = require('crypto'),
    Pusher = require('pusher'),
    Promise = require("bluebird");

function PushClient(options) {
    options = options || {};
    this.salt = options.salt;
    this.pusher = new Pusher({
        appId: options.appId,
        key: options.key,
        secret: options.secret
    });
}

PushClient.prototype.channelForUser = function(userId) {
    var md5 = crypto.createHash('md5');
    md5.update(String(userId));
    md5.update(":");
    md5.update(this.salt);
    return md5.digest("hex");
};

PushClient.prototype.sendToUser = function(userId, eventName, data) {
    return this.sendToChannel(this.channelForUser(userId), eventName, data);
};

PushClient.prototype.sendToChannel = function(channel, eventName, data) {
    var pusher = this.pusher;
    return new Promise(function (resolve, reject){
        pusher.trigger(channel, eventName, data, null, function(error, request, response) {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
};

module.exports = PushClient;
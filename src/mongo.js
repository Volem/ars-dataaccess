'use strict';
const mongoose = require('mongoose');

const mongoConnectionState = {
	disconnected: 0,
	connected: 1,
	connecting: 2,
	disconnecting: 3
};

const isConnected = state => state === mongoConnectionState.connected || state === mongoConnectionState.connecting;

const connect = async mongodbConnection => {
	if (!isConnected(mongoose.connection.readyState)) {
		mongoose.Promise = require('bluebird');
		await mongoose.connect(mongodbConnection, {
			socketTimeoutMS: 30000,
			connectTimeoutMS: 30000,
			keepAlive: 1000
		});
		return isConnected(mongoose.connection.readyState);
	}
};

module.exports = {
	connect: connect,
	mongoose: mongoose,
	disconnect : async () => await mongoose.disconnect(),
	mongoConnectionState: mongoConnectionState
};
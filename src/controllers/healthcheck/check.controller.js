'use strict';

// const newrelic = require('newrelic');
const os = require('os');

const HealthcheckController = (request, reply) => {
  // newrelic.setTransactionName('POST: /healthcheck');

  return {
    status: 'OK',
    data:{
      serverName: os.hostname(),
      network: os.networkInterfaces()
    } 
  }
};

module.exports = HealthcheckController;
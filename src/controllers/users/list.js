'use strict';

const newrelic = require('newrelic');
const { UsersUseCase } = require('../../use-case');

const UserListController = (request, reply) => {
  newrelic.setTransactionName('GET: /users');

  const { query } = request;
  const limit = query?.limit || 20;
  const startKey = query?.startKey || null;

  return UsersUseCase.list({
    limit,
    startKey: startKey && JSON.parse(startKey)
  });
};

module.exports = UserListController;
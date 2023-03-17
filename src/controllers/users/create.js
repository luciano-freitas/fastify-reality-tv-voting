'use strict';

const newrelic = require('newrelic');
const { UsersUseCase } = require('../../use-case');

const UserCreateController = (request, reply) => {
  newrelic.setTransactionName('POST: /users');

  if (!request?.body)
    return reply.code(400).send({
      message: 'Params [body] is required',
    })

  return UsersUseCase.create(request.body);
};

module.exports = UserCreateController;
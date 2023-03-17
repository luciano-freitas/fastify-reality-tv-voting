'use strict';

const newrelic = require('newrelic');
const { UsersUseCase } = require('../../use-case');

const UserUpdateController = (request, reply) => {
  newrelic.setTransactionName('PUT: /users/:documentNumber');

  if (!request?.body)
    return reply.code(400).send({
      message: 'Params [body] is required',
    })

  if (!request?.params)
    return reply.code(400).reply({
      message: 'Params [pathParameters] is required',
    })

  const data = request.body;
  const { documentNumber } = request.params;
  return UsersUseCase.update({ documentNumber }, data);
};

module.exports = UserUpdateController;
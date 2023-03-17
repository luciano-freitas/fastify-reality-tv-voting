'use strict';

const newrelic = require('newrelic');
const { UsersUseCase } = require('../../use-case');

const UserDeleteController = (request, reply) => {
  newrelic.setTransactionName('DELETE: /users/:documentNumber');

  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { documentNumber } = request.params;
  return UsersUseCase.delete({ documentNumber });
};

module.exports = UserDeleteController;
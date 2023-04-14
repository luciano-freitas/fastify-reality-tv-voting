'use strict';

// const newrelic = require('newrelic');
const { UsersUseCase } = require('../../use-case');

const UserGetController = (request, reply) => {
  // newrelic.setTransactionName('GET: /users/:documentNumber');

  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { documentNumber } = request.params;
  return UsersUseCase.get({ documentNumber });
};

module.exports = UserGetController;
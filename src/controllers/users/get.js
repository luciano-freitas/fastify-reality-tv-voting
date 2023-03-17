'use strict';

const { UsersUseCase } = require('../../use-case');

const UserGetController = (request, reply) => {
  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { documentNumber } = request.params;
  return UsersUseCase.get({ documentNumber });
};

module.exports = UserGetController;
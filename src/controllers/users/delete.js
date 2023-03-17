'use strict';

const { UsersUseCase } = require('../../use-case');

const UserDeleteController = (request, reply) => {
  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { documentNumber } = request.params;
  return UsersUseCase.delete({ documentNumber });
};

module.exports = UserDeleteController;
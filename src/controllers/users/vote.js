'use strict';

const { UsersUseCase } = require('../../use-case');

const UserVoteController = (request, reply) => {
  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { documentNumber, participant } = request.params;
  return UsersUseCase.votes({ documentNumber, participant });
};

module.exports = UserVoteController;
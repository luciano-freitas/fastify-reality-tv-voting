'use strict';

const newrelic = require('newrelic');
const { UsersUseCase } = require('../../use-case');

const UserVoteController = (request, reply) => {
  newrelic.setTransactionName('PATCH: /users/:documentNumber/vote/:participant');

  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { documentNumber, participant } = request.params;
  return UsersUseCase.votes({ documentNumber, participant });
};

module.exports = UserVoteController;
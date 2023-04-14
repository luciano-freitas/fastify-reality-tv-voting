'use strict';

// const newrelic = require('newrelic');
const { ParticipantsUseCase } = require('../../use-case');

const ParticipantUpdateController = (request, reply) => {
  // newrelic.setTransactionName('UPDATE: /participants/:code');

  if (!request?.body)
    return reply.code(400).send({
      message: 'Params [body] is required',
    })

  if (!request?.params)
    return reply.code(400).reply({
      message: 'Params [pathParameters] is required',
    })

  const data = request.body;
  const { code } = request.params;
  return ParticipantsUseCase.update({ code }, data);
};

module.exports = ParticipantUpdateController;
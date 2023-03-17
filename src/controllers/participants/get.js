'use strict';

const newrelic = require('newrelic');
const { ParticipantsUseCase } = require('../../use-case');

const ParticipantGetController = (request, reply) => {
  newrelic.setTransactionName('GET: /participants/:code');

  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { code } = request.params;
  return ParticipantsUseCase.get({ code });
};

module.exports = ParticipantGetController;
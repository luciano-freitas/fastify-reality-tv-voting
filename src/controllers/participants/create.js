'use strict';

const newrelic = require('newrelic');
const { ParticipantsUseCase } = require('../../use-case');

const ParticipantCreateController = (request, reply) => {
  newrelic.setTransactionName('POST: /participants');

  if (!request?.body)
    return reply.code(400).send({
      message: 'Params [body] is required',
    })

  return ParticipantsUseCase.create(request.body);
};

module.exports = ParticipantCreateController;
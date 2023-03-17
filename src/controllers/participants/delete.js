'use strict';

const { ParticipantsUseCase } = require('../../use-case');

const ParticipantDeleteController = (request, reply) => {
  if (!request?.params)
    return reply.code(400).send({
      message: 'Params [pathParameters] is required',
    })

  const { code } = request.params;
  return ParticipantsUseCase.delete({ code });
};

module.exports = ParticipantDeleteController;
'use strict';

const { ParticipantsUseCase } = require('../../use-case');

const ParticipantListController = (request, reply) => {
  const { query } = request;
  const limit = query?.limit || 20;
  const startKey = query?.startKey || null;

  return ParticipantsUseCase.list({
    limit,
    startKey: startKey && JSON.parse(startKey)
  });
};

module.exports = ParticipantListController;
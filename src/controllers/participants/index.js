const ParticipantListController = require('./list');
const ParticipantGetController = require('./get');
const ParticipantCreateController = require('./create');
const ParticipantDeleteController = require('./delete');
const ParticipantUpdateController = require('./update');

module.exports = {
  ParticipantGetController,
  ParticipantListController,
  ParticipantCreateController,
  ParticipantDeleteController,
  ParticipantUpdateController
}
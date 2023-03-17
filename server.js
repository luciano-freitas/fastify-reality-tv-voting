// Require the framework and instantiate it
require('dotenv').config();
const {
  ParticipantListController,
  ParticipantGetController,
  ParticipantUpdateController,
  ParticipantCreateController,
  ParticipantDeleteController
} = require('./src/controllers/participants');

const {
  UserListController,
  UserGetController,
  UserUpdateController,
  UserCreateController,
  UserDeleteController,
  UserVoteController
} = require('./src/controllers/users');

const fastify = require('fastify')({ logger: true });

fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
  jsoffParser(payload, function (err, body) {
    done(err, body)
  })
});

// ROUTER BY USERS
fastify.get('/users/', UserListController)
fastify.get('/users/:documentNumber', UserGetController)
fastify.put('/users/:documentNumber', UserUpdateController)
fastify.post('/users', UserCreateController)
fastify.delete('/users/:documentNumber', UserDeleteController)
fastify.patch('/users/:documentNumber/vote/:participant', UserVoteController)

// ROUTER BY PARTICIPANTS
fastify.get('/participants/', ParticipantListController)
fastify.get('/participants/:code', ParticipantGetController)
fastify.put('/participants/:code', ParticipantUpdateController)
fastify.post('/participants', ParticipantCreateController)
fastify.delete('/participants/:code', ParticipantDeleteController)

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
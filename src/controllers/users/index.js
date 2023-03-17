const UserListController = require('./list');
const UserGetController = require('./get');
const UserCreateController = require('./create');
const UserDeleteController = require('./delete');
const UserUpdateController = require('./update');
const UserVoteController = require('./vote');

module.exports = {
  UserGetController,
  UserListController,
  UserCreateController,
  UserDeleteController,
  UserUpdateController,
  UserVoteController
}
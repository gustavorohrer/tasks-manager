const Trello = require("trello");

exports.taskManagerClient = new Trello(
  process.env.TRELLO_KEY,
  process.env.TRELLO_TOKEN
);

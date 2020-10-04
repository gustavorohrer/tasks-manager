const taskManagerService = require("../services/taskManagerService");

exports.createCard = async (req, res) => {
  const result = await taskManagerService.createCard(req.body);
  return res.json(result);
};

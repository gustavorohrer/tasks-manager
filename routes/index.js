const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

const { catchErrors } = require("../middlewares/handlers/errorHandlers");
const { validateTask } = require("../middlewares/validators/taskValidator");

router.post("/", validateTask, catchErrors(taskController.createCard));

module.exports = router;

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

const { catchErrors } = require("../middlewares/handlers/errorHandlers");
const { validateCard } = require("../middlewares/validators/taskValidator");

router.post("/", validateCard, catchErrors(taskController.createCard));

module.exports = router;

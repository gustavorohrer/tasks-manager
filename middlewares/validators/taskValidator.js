const { body, validationResult } = require("express-validator");

const TASK_TYPES = ["bug", "issue", "task"];
const CATEGORIES = ["Maintenance", "Research", "Test"];

//FIXME this will not escalate if new types are added
exports.validateTask = [
  body("type")
    .exists()
    .withMessage("Type is required!")
    .bail()
    .trim()
    .escape()
    .isIn(TASK_TYPES)
    .withMessage("Invalid type!")
    .bail(),
  body("title")
    .if(body("type").exists())
    .if(body("type").not().equals("bug"))
    .exists()
    .withMessage("Title is required!")
    .bail()
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Title can not be empty!")
    .bail(),
  body("description")
    .if(body("type").exists())
    .if(body("type").not().equals("task"))
    .exists()
    .withMessage("Description is required!")
    .bail()
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Description can not be empty!")
    .bail(),
  body("category")
    .if(body("type").equals("task"))
    .exists()
    .withMessage("Category is required!")
    .bail()
    .trim()
    .escape()
    .isIn(CATEGORIES)
    .withMessage("Invalid category!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

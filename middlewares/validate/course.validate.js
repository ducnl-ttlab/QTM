const { CourseSchema } = require("./model.js");

module.exports = function (req, res, next) {
  const { error } = CourseSchema.validate(req.body);
  if (error) {
    return res.json({ error: true, msg: error.details[0].message });
  } else {
    next();
  }
};

const { UserSchema } = require("./model.js");

module.exports = function (req, res, next) {
    const { error } = UserSchema.validate(req.body);

    if (error) {
        return res.json({ error: true, msg: error.details[0].message });
    } else {
        next();
    }
};

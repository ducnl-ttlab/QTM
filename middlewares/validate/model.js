const Joi = require("joi");

const UserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).messages({
        "string.min": "Tên phải có ít nhất 3 kí tự",
        "string.max": "Tên có nhiều nhất 30 kí tự",
        "string.empty": "Tên không được bỏ trống",
        "any.required": "Tên không được bỏ trống",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required().messages({
        "string.empty": "Mật khẩu không được bỏ trống",
        "any.required": "Mật khẩu không được bỏ trống",
    }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
            "string.empty": "Email không được bỏ trống",
            "any.required": "Email không được bỏ trống",
        }),
});

module.exports = { UserSchema };

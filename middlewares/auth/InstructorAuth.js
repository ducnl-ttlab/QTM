const { Course } = require("../../db/models");

module.exports = async function (req, res, next) {
    const { role } = req.user;
    if (role === 0)
        return res.status(403).json({
            error: true,
            msg: "Bạn không có quyền truy cập vào tài nguyên của giảng viên khác.",
        });
    else {
        next();
    }
};

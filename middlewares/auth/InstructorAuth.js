const { Course } = require("../../db/models");

module.exports = async function (req, res, next) {
  const { id } = req.user;
  const { courseId } = req.params;
  let course = await Course.findOne({
    where: { id: courseId, instructorId: id },
  });
  if (!course)
    return res.status(403).json({
      error: true,
      msg: "Bạn không có quyền truy cập vào tài nguyên của giảng viên khác.",
    });
  else {
    next();
  }
};

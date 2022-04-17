module.exports = function (req, res, next) {
  const { role } = req.user;
  if (role !== 1)
    return res.status(403).json({
      error: true,
      msg: "Bạn không có quyền truy cập vào tài nguyên của giảng viên.",
    });
  else {
    next();
  }
};

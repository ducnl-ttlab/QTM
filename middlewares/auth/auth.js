const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.headers["authorization"];

    //Check if no token
    if (!token) {
        return res.status(401).json({
            error: true,
            msg: "Không có token, không thể truy cập",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({
            error: true,
            msg: "token không hợp lệ",
        });
    }
};

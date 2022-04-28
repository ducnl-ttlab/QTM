const { Course, UserCourse } = require("../../db/models");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { courseId } = req.params;
        const userCourse = await UserCourse.findOne({ where: { userId: id, courseId, status: "1" } });
        const instructor = await Course.findOne({ where: { instructorId: id } });
        if (userCourse || instructor) {
            req.courseId = req.params.courseId;
            next();
        } else {
            return res.status(403).send("Bạn không nằm trong khóa học này");
        }
    } catch (error) {
        return res.status(500).send("Server error");
    }
};

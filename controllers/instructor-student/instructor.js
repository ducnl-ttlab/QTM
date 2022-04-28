const { UserCourse, User, Notification, Course } = require("../../db/models");
const { setOrGetCache, pagination } = require("../../utils/feature");
const cloudinary = require("../../config/cloud/cloudinary");
const { UserCourseService } = require("../../service");

exports.invite = async (req, res, next) => {
    try {
        let { studentId, courseId } = req.params;

        let student = await User.findOne({
            where: {
                id: studentId,
            },
            include: {
                model: UserCourse,
            },
        });

        if (student.role === 1) {
            return res.json({ error: true, msg: "Giảng viên khác không thể tham gia khóa học này" });
        } else if (student.role === 2) {
            return res.json({ error: true, msg: "Admin không thể tham gia khóa học này" });
        } else {
            let inCourse = student.UserCourses.findIndex((usercourse) => `${usercourse.courseId}` === courseId && `${usercourse.userId}` === studentId);
            if (inCourse > -1) {
                return res.json({ error: true, msg: "Học sinh này đã tham gia khóa học" });
            } else {
                let created = await UserCourse.create({ userId: studentId, courseId, status: "1" });
                let course = await Course.findByPk(courseId);
                await Notification.create({ message: `Bạn đã được mời vào khóa học ${course.name}`, userId: created.userId, courseId: created.courseId });
                return res.json({ error: false, msg: "Đã thêm học sinh vào khóa học, Đã thông báo đến học sinh", created });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};
exports.kickStudent = async (req, res) => {
    try {
        const { courseId, studentId } = req.params;

        await UserCourse.update({ status: "3" }, { where: { courseId, userId: studentId } });
        return res.json({ error: false, msg: "Bạn đã đuổi học sinh này" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};
exports.getCourseStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentList = await UserCourse.findAll({ where: { courseId } });
        return res.json({ error: false, students: studentList });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

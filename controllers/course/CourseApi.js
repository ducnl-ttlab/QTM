const { Course } = require("../../db/models");
const { setOrGetCache } = require("../../utils/feature");

exports.getAll = async (req, res) => {
    try {
        let CourseList = await setOrGetCache("courses", async () => {
            const courses = await Course.findAll();
            return courses;
        });

        res.status(200).json({
            error: false,
            courses: CourseList,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.getDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(400).json({
                error: true,
                msg: "không tìm thấy",
            });
        } else {
            return res.status(200).json({
                error: false,
                course,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.active = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updatedCourse = await Course.update({ verified: 1 }, { where: { id: courseId } });

        return res.status(200).json({
            error: false,
            msg: "updated",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.suspend = async (req, res) => {
    try {
        const { courseId } = req.params;
        await Course.update({ verified: 0 }, { where: { id: courseId } });

        return res.status(200).json({
            error: false,
            msg: "updated",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

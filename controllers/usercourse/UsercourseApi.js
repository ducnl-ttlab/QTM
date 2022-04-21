const { UserCourseService } = require("../../service");
const { setOrGetCache, pagination } = require("../../utils/feature");

exports.getCourses = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const { page } = req.params;

        const coureList = await setOrGetCache("userCourses", async () => {
            const courses = await UserCourseService.getUserCourses(req.user.id, keyword);
            return courses;
        });
        const coursePage = pagination(coureList, page);

        res.json({ error: false, courses: coursePage });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
};

exports.joinCourse = async (req, res) => {
    try {
        res.json({ error: false, courses: [] });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
};

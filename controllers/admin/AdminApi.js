const { User } = require("../../db/models");
const { setOrGetCache } = require("../../utils/feature");
const moment = require("moment");
exports.getInstructors = async (req, res, next) => {
    try {
        let instructors = await User.findAll({ where: { role: 1 } });
        let { createdAt, updatedAt } = instructors;
        instruct;
        res.status(200).json({
            error: false,
            instructors,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

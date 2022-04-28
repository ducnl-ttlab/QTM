const { User } = require("../../db/models");
const { setOrGetCache } = require("../../utils/feature");
const moment = require("moment");

exports.getUsers = async (req, res, next) => {
    try {
        const type = req.params.type || 1;

        const userCache = await setOrGetCache(`user_${type}`, async () => {
            return await User.findAll({ where: { role: type } });
        });
        res.status(200).json({
            error: false,
            users: userCache,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

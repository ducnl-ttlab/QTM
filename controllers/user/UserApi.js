const { User } = require("../../db/models");
exports.getInfo = async (req, res) => {
    try {
        const { id } = req.user;
        const info = await User.findByPk(id);

        return res.status(200).json({
            error: false,
            info,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
};

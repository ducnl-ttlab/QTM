const { UserCourse, User, Notification, Course } = require("../../db/models");
exports.getAll = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { userId: req.user.id } });
        return res.status(200).json({ error: false, msg: req.user, notifications });
    } catch (error) {
        return res.status(500).send("Server error");
    }
};
exports.setView = async (req, res) => {
    try {
        await Notification.update({ viewed: true }, { where: { id: req.params.notificationId, userId: req.user.id } });
        return res.status(200).json({ error: false, msg: "updated successfully!" });
    } catch (error) {
        return res.status(500).send("Server error");
    }
};
exports.delete = async (req, res) => {
    try {
        await Notification.destroy({ where: { id: req.params.notificationId, userId: req.user.id } });
        return res.status(200).json({ error: false, msg: "deleted successfully!" });
    } catch (error) {
        return res.status(500).send("Server error");
    }
};

const bcrypt = require("bcryptjs"); // encrypt password
const jwt = require("jsonwebtoken");
const cloudinary = require("../../config/cloud/cloudinary");
const { User } = require("../../db/models");

module.exports = class ApiUser {
    static async register(req, res) {
        let { email } = req.body;
        console.log(email);

        try {
            let hasUser = await User.findOne({ where: { email } });
            if (hasUser) {
                return res.status(400).json({
                    error: true,
                    msg: ["Email này đã có người đăng kí"],
                });
            }

            const salt = await bcrypt.genSalt(10);
            let user = req.body;
            let { password } = user;
            user.password = await bcrypt.hash(password, salt);

            if (req.file !== undefined) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "avatars",
                    width: 150,
                    crop: "scale",
                });
                user.imageUrl = `${result.secure_url} ${result.public_id}`;
            }

            await User.create(user);
            res.status(201).json({
                error: false,
                msg: ["Đăng kí tài khoản thành công"],
                user,
            });
        } catch (error) {
            res.status(500).send("server error " + error.message);
        }
    }

    static async login(req, res) {
        return res.json("ok");
    }
};

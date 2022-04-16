const bcrypt = require("bcryptjs"); // encrypt password
const jwt = require("jsonwebtoken");
const cloudinary = require("../../config/cloud/cloudinary");
const { User } = require("../../db/models");

module.exports = {
    login: async (req, res) => {
        let { email, password } = req.body;
        //find user
        try {
            let user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    error: true,
                    msg: ["Tài khoàn này không tồn tại"],
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    error: true,
                    msg: ["Mật khẩu của bạn không chính xác"],
                });
            }
            const payload = {
                user: {
                    id: user.id,
                    role: user.role,
                },
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                if (user.imageUrl) {
                    user.imageUrl = user.imageUrl.split(" ")[0];
                }
                return res.status(200).json({
                    error: false,
                    token,
                    user: user,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server error");
        }
    },
    register: async (req, res) => {
        let { email } = req.body;

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
    },
};

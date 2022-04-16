const { Category } = require("../../db/models");
const { setOrGetCache } = require("../../utils/feature");

exports.getAll = async (req, res) => {
    try {
        const categoryList = await setOrGetCache("categories", async () => {
            let categories = await Category.findAll();
            return categories;
        });

        res.status(200).json({
            error: false,
            categories: categoryList,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.getDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(400).json({
                error: true,
                msg: "không tìm thấy",
            });
        } else {
            return res.status(200).json({
                error: false,
                category,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.invite = async (req, res, next) => {
    try {
        return res.json({ error: false, msg: "abc" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

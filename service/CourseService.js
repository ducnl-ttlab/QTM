const { sequelize } = require("../db/models");
const { QueryTypes } = require("sequelize");

exports.getInstructorCourses = async (userId, keyword = "") => {
    let nameQuery = keyword !== undefined ? `and c.name like "%${keyword}%"` : "";
    try {
        const response = await sequelize.query(
            `select c.id,c.categoryId,c.name,c.description,ca.name as categoryName,c.imageUrl,c.verified,c.createdAt from courses c
            join categories ca on c.categoryId = ca.id where c.instructorId = ? ${nameQuery} order by c.id desc;`,
            {
                replacements: [userId],
                type: QueryTypes.SELECT,
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

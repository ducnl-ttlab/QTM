const { sequelize } = require("../db/models");
const { QueryTypes } = require("sequelize");

exports.getUserCourses = async (userId, keyword) => {
    let queryStr = keyword ? `and c.name like '%${keyword}%'` : "";
    try {
        const response = await sequelize.query(
            `SELECT c.id as courseId, c.name, c.instructorId , c.imageUrl,
            u.phoneNumber,u.username, u.email , 
            uc.createdAt 
            FROM usercourses uc join courses c on c.id = uc.courseId 
            join users u on c.instructorId = u.id
             WHERE uc.userId = ${userId} ${queryStr}`,
            {
                replacements: [],
                type: QueryTypes.SELECT,
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

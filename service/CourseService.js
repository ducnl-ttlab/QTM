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

exports.getAll = async ({ keyword, rating, categoryId }) => {
    let nameQuery = keyword !== undefined ? `and c.name like "%${keyword}%"` : "";
    let ratingQuery = rating !== undefined ? ` rating >= ${rating} ` : "";
    let categoryQuery = categoryId !== undefined ? ` categoryId = ${categoryId}` : "";

    let and = rating !== undefined && categoryId !== undefined ? ` and ` : " ";
    let having = rating !== undefined || categoryId !== undefined ? `having ` : " ";
    let query = `select c.id as courseId, c.name, c.description, c.categoryId, ca.name as categoryName,
    c.instructorId, u.username,
    u.email as instructorEmail,count(uc.id) as register ,round(avg(ra.rating),1) as rating,
    c.imageUrl
    from courses c
    JOIN categories ca on ca.id = c.categoryId 
    left join usercourses uc on uc.courseId = c.id 
    left join rates ra on ra.usercourseId = uc.id
    left join users u on u.id = c.instructorId
    where c.verified = 1 
    ${nameQuery} group by c.id
    ${having} ${ratingQuery} ${and} ${categoryQuery}`;

    try {
        const response = await sequelize.query(query, {
            replacements: [],
            type: QueryTypes.SELECT,
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

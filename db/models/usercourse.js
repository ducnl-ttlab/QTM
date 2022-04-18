"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserCourse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Course, User, Comment, Rate }) {
            // define association here
            this.belongsTo(Course, {
                foreignKey: "courseId",
                onDelete: "cascade",
            });
            this.belongsTo(User, { foreignKey: "userId", onDelete: "cascade" });
            this.hasOne(Rate, { foreignKey: "usercourseId", onDelete: "cascade" });
            this.hasMany(Comment, { foreignKey: "usercourseId", onDelete: "cascade" });
        }
    }
    UserCourse.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: { model: "users", key: "id" },
                allowNull: false,
            },
            courseId: {
                type: DataTypes.INTEGER,
                references: { model: "courses", key: "id" },
                allowNull: false,
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            status: {
                type: DataTypes.ENUM("1", "2", "3"),
                defaultValue: "1",
            },
            createdAt: {
                type: "TIMESTAMP",
                defaultValue: new Date(),
                allowNull: false,
            },
            updatedAt: {
                type: "TIMESTAMP",
                defaultValue: new Date(),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            tableName: "usercourses",
            modelName: "UserCourse",
            indexes: [
                {
                    unique: true,
                    fields: ["userId", "courseId"],
                },
            ],
        }
    );
    return UserCourse;
};

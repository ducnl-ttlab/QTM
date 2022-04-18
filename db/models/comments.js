"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ UserCourse }) {
            // define association here
            this.belongsTo(UserCourse, { foreignKey: "usercourseId", onDelete: "cascade" });
        }
    }
    Comments.init(
        {
            usercourseId: {
                type: DataTypes.INTEGER,
                references: { model: "usercourses", key: "id" },
                allowNull: false,
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
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
            tableName: "comments",
            timestamps: false,
            modelName: "Comment",
        }
    );
    return Comments;
};

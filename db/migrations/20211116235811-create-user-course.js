"use strict";
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface
            .createTable("usercourses", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
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
                    defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                    allowNull: false,
                },
                updatedAt: {
                    type: "TIMESTAMP",
                    defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                    allowNull: false,
                },
            })
            .then(() => {
                queryInterface.addIndex("usercourses", ["userId", "courseId"], {
                    unique: true,
                });
            });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable("usercourses");
    },
};

"use strict";
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable("comments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
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
                defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updatedAt: {
                type: "TIMESTAMP",
                defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable("comments");
    },
};

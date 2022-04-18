"use strict";
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable("rates", {
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
            rating: {
                type: DataTypes.ENUM("1", "2", "3", "4", "5"),
                defaultValue: "1",
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
        await queryInterface.dropTable("rates");
    },
};

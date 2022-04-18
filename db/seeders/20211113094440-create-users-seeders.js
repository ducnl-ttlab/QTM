"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    uuid: "d18cdc82-0941-48a8-940f-7c2e5a82e914",
                    username: "Lương",
                    email: "admin@gmail.com",
                    phoneNumber: 12345678,
                    address: "Hoang Cuong Thanh Ba Phu Tho",
                    role: 2,
                    password: "$2a$10$xP7NXfIrxLPyL1qB1qBf.eOLi8iLrQqQQuzCO9kPXYeWz7NHbTuZ.",
                    imageUrl: "https://res.cloudinary.com/subarashis/image/upload/v1638664872/avatars/lf8g0pyi6obzotjkf1ps.png avatars/lf8g0pyi6obzotjkf1ps",
                },
                {
                    uuid: "d18cdc82-0941-48a8-940f-7c2e588qe914",
                    username: "Hiếu",
                    email: "user1@gmail.com",
                    phoneNumber: 12345678,
                    address: "Hoang Cuong Thanh Ba Phu Tho",
                    role: 0,
                    password: "$2a$10$xP7NXfIrxLPyL1qB1qBf.eOLi8iLrQqQQuzCO9kPXYeWz7NHbTuZ.",
                    imageUrl: "https://res.cloudinary.com/subarashis/image/upload/v1638665232/avatars/ug2ebsvof6y3qpt69slw.png avatars/ug2ebsvof6y3qpt69slw",
                },
                {
                    uuid: "d18cdc82-0941-48a8-940f-7c2e5882w914",
                    username: "Anh",
                    email: "instructor1@gmail.com",
                    phoneNumber: 12345678,
                    address: "Hoang Cuong Thanh Ba Phu Tho",
                    role: 1,
                    password: "$2a$10$xP7NXfIrxLPyL1qB1qBf.eOLi8iLrQqQQuzCO9kPXYeWz7NHbTuZ.",
                    imageUrl: "https://res.cloudinary.com/subarashis/image/upload/v1639913561/avatars/js6kmwjgfe36zlnxjljt.jpg avatars/js6kmwjgfe36zlnxjljt",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};

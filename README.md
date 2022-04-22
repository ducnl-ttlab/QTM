# QTM-INT3310_2

`cd QTM-INT3310_2`

`npm install`

-   Tạo cơ sở dữ liệu mysql với tên elearningdb

-   Thêm bảng database

`sequelize db:migrate`

-   Xóa database:

`sequelize db:migrate:undo:all`

-   Thêm dữ liệu tự động vào trong database

`sequelize db:seed:all`

-   Thay đổi tên file .env example thành .env

`npm start`

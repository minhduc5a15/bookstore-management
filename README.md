# Bài tập lớn: Môn Thiết Kế Web (Beta)

## Chủ đề: Web bán sách

![logo](https://raw.githubusercontent.com/minhduc5a15/bookstore-management/main/public/favicon.ico)
![logo](https://raw.githubusercontent.com/minhduc5a15/bookstore-management/main/public/favicon.ico)
![logo](https://raw.githubusercontent.com/minhduc5a15/bookstore-management/main/public/favicon.ico)

## Mục Lục

- [Giới thiệu](#giới-thiệu)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Thành viên nhóm](#thành-viên-nhóm)
- [Cách chạy dự án](#cách-chạy-dự-án)

## Giới thiệu

Dự án này là một hệ thống quản lý bán sách trực tuyến, cho phép người dùng tìm kiếm, xem chi tiết, và mua các đầu sách từ cửa hàng. Hệ thống bao gồm các chức năng cơ bản của một trang thương mại điện tử như đăng ký, đăng nhập, quản lý giỏ hàng, thanh toán và quản trị cửa hàng.

## Công nghệ sử dụng

- **Frontend**: EJS, CSS, JavaScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDb
- **Cloud**: Cloudinary

## Thành viên nhóm

1. Trưởng nhóm: Pham Minh Đức
2. Lê Phạm Thế Vũ
3. Nguyễn Quý Việt Anh
4. Nguyễn Tường Huy
5. Vũ Đức Long

---

## Cách chạy dự án

Sử dụng **npm** từ [nodejs](https://nodejs.org/en) hoặc [**bun**](https://bun.sh/)

1. Tải các package cần thiết

- Sử dụng npm:

    ```shell
    npm install 
    ```

- Sử dụng bun:

    ```shell
    bun install
    ```

2. Tạo các biến môi trường

Tạo file `.env` để lưu các biến môi trường, ví dụ:

```
PORT=4000
MONGODB_URI=
MONGODB_DB=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
SESSION_SECRET=
```

3. Khởi chạy dự án

- Sử dụng npm:

    ```shell
    npm start 
    ```

- Sử dụng bun:

    ```shell
    bun start
    ```

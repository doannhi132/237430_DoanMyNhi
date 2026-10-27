# HỆ THỐNG QUẢN LÝ NHÂN SỰ TRÊN NỀN TẢNG ĐIỆN TOÁN ĐÁM MÂY

## 1. Thông tin sinh viên

- Họ và tên: Đoàn Mỹ Nhi
- Mã số sinh viên: 237430
- Lớp: DH23TIN09
- Học phần: Điện toán đám mây
- Đề tài: Xây dựng và triển khai hệ thống quản lý nhân sự trên nền tảng đám mây

## 2. Giới thiệu dự án

Hệ thống quản lý nhân sự được xây dựng nhằm hỗ trợ quản lý thông tin nhân viên thông qua giao diện website. Người dùng có thể xem danh sách nhân viên, tìm kiếm, thêm mới, xem chi tiết, cập nhật và xóa hồ sơ nhân viên.

Ứng dụng sử dụng React cho Frontend, Node.js và Express cho Backend, MongoDB Atlas để lưu trữ dữ liệu. Mã nguồn được quản lý bằng GitHub và Backend được triển khai trên Render.

## 3. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | React, Vite, HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Quản lý mã nguồn | Git, GitHub |
| Đóng gói | Docker |
| Lưu trữ Docker image | Docker Hub |
| Triển khai | Render |
| Công cụ phát triển | Visual Studio Code |

## 4. Chức năng hệ thống

Hệ thống được xây dựng với các chức năng:

- Hiển thị danh sách nhân viên.
- Xem thông tin chi tiết nhân viên.
- Thêm hồ sơ nhân viên.
- Tìm kiếm theo mã nhân viên hoặc họ tên.
- Cập nhật thông tin nhân viên.
- Xóa nhân viên có xác nhận.
- Hiển thị thông báo khi thao tác thành công hoặc xảy ra lỗi.

## 5. Cơ sở dữ liệu MongoDB Atlas

- Cluster: Cluster0
- Database: 237430_DoanMyNhi
- Collection: employees
- Số lượng nhân viên mẫu: 3

Các trường dữ liệu gồm:

`employeeId`, `fullName`, `gender`, `dateOfBirth`, `department`, `position`, `email`, `phone`, `hireDate`, `status`.

Dữ liệu mẫu:

| Mã nhân viên | Họ tên | Phòng ban |
|---|---|---|
| NV001 | Nguyễn Văn An | Công nghệ thông tin |
| NV002 | Trần Thị Bình | Kế toán |
| NV003 | Lê Minh Cường | Nhân sự |

## 6. Cấu trúc dự án

```text
237430_DoanMyNhi/
├── backend/
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employees.js
│   ├── server.js
│   ├── test-connection.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── docker.yml
├── .gitignore
└── README.md
```

## 7. Hướng dẫn chạy ứng dụng

### 7.1. Backend

Chuyển vào thư mục Backend:

```bash
cd backend
npm install
```

Tạo file `.env` dựa trên `.env.example`, sau đó cấu hình `MONGODB_URI`, `DB_NAME`, `PORT` và `CORS_ORIGIN`.

Khởi chạy Backend:

```bash
npm run dev
```

API chạy tại cổng 5000 trong môi trường phát triển.

### 7.2. Frontend

Mở Terminal khác:

```bash
cd frontend
npm install
```

Tạo file `.env` với địa chỉ Backend API phù hợp.

Chạy:

```bash
npm run dev
```

Mở địa chỉ Local do Vite hiển thị, thông thường là `http://localhost:5173`.

## 8. REST API

| Phương thức | Endpoint | Chức năng |
|---|---|---|
| GET | /api/employees | Danh sách nhân viên |
| GET | /api/employees/:id | Chi tiết nhân viên |
| GET | /api/employees?search=An | Tìm kiếm |
| POST | /api/employees | Thêm nhân viên |
| PUT | /api/employees/:id | Cập nhật |
| DELETE | /api/employees/:id | Xóa |
| GET | /health | Kiểm tra Backend |

## 9. Kết quả thực hiện

- Câu 1: Đã tạo GitHub Repository và thực hiện commit, push.
- Câu 2: Đã tạo MongoDB Atlas với database, collection và 3 nhân viên mẫu.
- Câu 3: Đã xây dựng Backend REST API, kết nối MongoDB và chạy thành công.
- Câu 4: Đã xây dựng giao diện React, hiển thị dữ liệu nhân viên và build thành công. Đã push lên GitHub.
- Câu 5: Đã tạo Docker Hub repository Backend. Trạng thái image cần kiểm tra.
- Câu 6: Đã tạo Docker Hub repository Frontend. Trạng thái image cần kiểm tra.
- Câu 7: Chưa xác nhận triển khai Frontend lên Render.
- Câu 8: Đã triển khai Backend lên Render và xác nhận kết nối MongoDB thành công.
- Câu 9: Hoàn thiện đường link nộp bài và kiểm tra
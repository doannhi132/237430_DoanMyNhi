# HỆ THỐNG QUẢN LÝ NHÂN SỰ

## 1. Thông tin sinh viên

- Họ và tên: Đoàn Mỹ Nhi
- MSSV: 237430
- Lớp: DH23TIN09
- Học phần: Điện toán đám mây
- Đề tài: Xây dựng và triển khai hệ thống quản lý nhân sự trên nền tảng đám mây

## 2. Giới thiệu dự án

Hệ thống quản lý nhân sự được xây dựng nhằm hỗ trợ việc quản lý thông tin nhân viên. Hệ thống cho phép người dùng xem danh sách, tìm kiếm, thêm mới, xem chi tiết, chỉnh sửa và xóa thông tin nhân viên.

Ứng dụng sử dụng React để xây dựng giao diện, Node.js và Express để xử lý Backend, MongoDB Atlas để lưu trữ dữ liệu và GitHub để quản lý mã nguồn. Backend được triển khai trên nền tảng Render.

## 3. Công nghệ sử dụng

- Frontend: React, Vite, HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB Atlas, Mongoose
- Quản lý mã nguồn: Git, GitHub
- Đóng gói ứng dụng: Docker
- Lưu trữ Docker image: Docker Hub
- Triển khai ứng dụng: Render
- Công cụ lập trình: Visual Studio Code

## 4. Chức năng hệ thống

Hệ thống bao gồm các chức năng:

- Hiển thị danh sách nhân viên.
- Xem thông tin chi tiết nhân viên.
- Thêm nhân viên mới.
- Tìm kiếm nhân viên theo mã nhân viên hoặc họ tên.
- Cập nhật thông tin nhân viên.
- Xóa nhân viên có xác nhận.
- Hiển thị thông báo khi thao tác thành công hoặc thất bại.

## 5. Cơ sở dữ liệu MongoDB Atlas

- Cluster: Cluster0
- Database: 237430_DoanMyNhi
- Collection: employees
- Số lượng nhân viên mẫu: 3

Các trường dữ liệu:

- employeeId
- fullName
- gender
- dateOfBirth
- department
- position
- email
- phone
- hireDate
- status

Dữ liệu mẫu:

| Mã nhân viên | Họ tên | Phòng ban |
|---|---|---|
| NV001 | Nguyễn Văn An | Công nghệ thông tin |
| NV002 | Trần Thị Bình | Kế toán |
| NV003 | Lê Minh Cường | Nhân sự |

## 6. Cấu trúc thư mục

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

Mở Terminal trong thư mục dự án và chạy:

```bash
cd backend
npm install
```

Tạo file `.env` và cấu hình các biến môi trường:

```env
PORT=5000
DB_NAME=237430_DoanMyNhi
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
CORS_ORIGIN=http://localhost:5173
```

Khởi chạy Backend:

```bash
npm run dev
```

Backend chạy tại:

http://localhost:5000

### 7.2. Frontend

Mở Terminal khác và chạy:

```bash
cd frontend
npm install
```

Tạo file `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Khởi chạy Frontend:

```bash
npm run dev
```

Frontend chạy tại:

http://localhost:5173

## 8. REST API

| Phương thức | Endpoint | Chức năng |
|---|---|---|
| GET | /api/employees | Lấy danh sách nhân viên |
| GET | /api/employees/:id | Xem chi tiết nhân viên |
| GET | /api/employees?search=An | Tìm kiếm nhân viên |
| POST | /api/employees | Thêm nhân viên |
| PUT | /api/employees/:id | Cập nhật nhân viên |
| DELETE | /api/employees/:id | Xóa nhân viên |
| GET | /health | Kiểm tra trạng thái Backend |

## 9. Kết quả thực hiện

- Câu 1: Đã tạo GitHub Repository và thực hiện commit, push mã nguồn.
- Câu 2: Đã tạo MongoDB Atlas với database 237430_DoanMyNhi, collection employees và 3 nhân viên mẫu.
- Câu 3: Đã xây dựng Backend REST API, kết nối MongoDB Atlas và chạy thành công
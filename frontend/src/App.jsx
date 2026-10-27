
import { useEffect, useState } from "react";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyForm = {
  employeeId: "",
  fullName: "",
  gender: "Nam",
  dateOfBirth: "",
  department: "",
  position: "",
  email: "",
  phone: "",
  hireDate: "",
  status: "Đang làm việc"
};

const fields = [
  ["employeeId", "Mã nhân viên"],
  ["fullName", "Họ và tên"],
  ["gender", "Giới tính"],
  ["dateOfBirth", "Ngày sinh"],
  ["department", "Phòng ban"],
  ["position", "Chức vụ"],
  ["email", "Email"],
  ["phone", "Số điện thoại"],
  ["hireDate", "Ngày vào làm"],
  ["status", "Trạng thái"]
];

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadEmployees() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/employees`);
      if (!res.ok) throw new Error("Không tải được danh sách");

      const data = await res.json();
      setEmployees(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function openAdd() {
    setForm({ ...emptyForm });
    setEditing(false);
    setSelected(null);
    setShowForm(true);
    setMessage("");
    setError("");
  }

  function openEdit(emp) {
    const values = {};
    Object.keys(emptyForm).forEach(key => {
      values[key] = emp[key] || "";
    });

    setForm(values);
    setEditing(true);
    setSelected(null);
    setShowForm(true);
    setMessage("");
    setError("");
  }

  function changeForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function saveEmployee(e) {
    e.preventDefault();

    const employeeId = form.employeeId.trim();
    const url = editing
      ? `${API}/api/employees/${encodeURIComponent(employeeId)}`
      : `${API}/api/employees`;

    try {
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không lưu được nhân viên");
      }

      setShowForm(false);
      setMessage(editing
        ? "Cập nhật nhân viên thành công!"
        : "Thêm nhân viên thành công!"
      );
      setError("");
      await loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteEmployee(emp) {
    const agreed = window.confirm(
      `Bạn có chắc muốn xóa nhân viên ${emp.fullName}?`
    );

    if (!agreed) return;

    try {
      const res = await fetch(
        `${API}/api/employees/${encodeURIComponent(emp.employeeId)}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không thể xóa");
      }

      setSelected(null);
      setMessage("Xóa nhân viên thành công!");
      setError("");
      await loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  }

  const filtered = employees.filter(emp => {
    const keyword = search.toLowerCase().trim();
    return (
      String(emp.employeeId || "").toLowerCase().includes(keyword) ||
      String(emp.fullName || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <div className="logo">HR</div>
          <div>
            <h1>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h1>
            <p>Ứng dụng quản lý nhân viên trên nền tảng đám mây</p>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="welcome">
          <div>
            <h2>Tổng quan nhân sự</h2>
            <p>Quản lý thông tin nhân viên nhanh chóng và thuận tiện.</p>
          </div>
          <span>Đoàn Mỹ Nhi – 237430</span>
        </section>

        <div className="stats">
          <div className="stat">
            <span>Tổng nhân viên</span>
            <strong>{employees.length}</strong>
          </div>

          <div className="stat">
            <span>Đang làm việc</span>
            <strong>
              {employees.filter(e => e.status === "Đang làm việc").length}
            </strong>
          </div>

          <div className="stat">
            <span>Số phòng ban</span>
            <strong>
              {new Set(
                employees.map(e => e.department).filter(Boolean)
              ).size}
            </strong>
          </div>
        </div>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Danh sách nhân viên</h2>
              <p>Danh sách được lấy từ MongoDB Atlas</p>
            </div>
            <button className="primary" onClick={openAdd}>
              + Thêm nhân viên
            </button>
          </div>

          <div className="toolbar">
            <input
              type="search"
              placeholder="Tìm theo mã hoặc họ tên..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="secondary" onClick={loadEmployees}>
              Làm mới
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mã NV</th>
                  <th>Họ tên</th>
                  <th>Giới tính</th>
                  <th>Phòng ban</th>
                  <th>Chức vụ</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp._id || emp.employeeId}>
                    <td><b>{emp.employeeId}</b></td>
                    <td>{emp.fullName}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td>
                      <span className="status">
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button onClick={() => setSelected(emp)}>
                          Xem
                        </button>
                        <button onClick={() => openEdit(emp)}>
                          Sửa
                        </button>
                        <button
                          className="danger"
                          onClick={() => deleteEmployee(emp)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {loading && <p className="empty">Đang tải dữ liệu...</p>}
            {!loading && filtered.length === 0 && (
              <p className="empty">Không tìm thấy nhân viên.</p>
            )}
          </div>
        </section>

        {selected && (
          <section className="panel detail">
            <div className="panel-header">
              <h2>Thông tin chi tiết nhân viên</h2>
              <button
                className="secondary"
                onClick={() => setSelected(null)}
              >
                Đóng
              </button>
            </div>

            <div className="detail-grid">
              {fields.map(([key, label]) => (
                <div key={key}>
                  <span>{label}</span>
                  <strong>{selected[key] || "Chưa cập nhật"}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {showForm && (
          <div className="overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>
                  {editing ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
                </h2>
                <button onClick={() => setShowForm(false)}>✕</button>
              </div>

              <form onSubmit={saveEmployee}>
                <div className="form-grid">
                  {fields.map(([key, label]) => (
                    <label key={key}>
                      {label}

                      {key === "gender" || key === "status" ? (
                        <select
                          name={key}
                          value={form[key]}
                          onChange={changeForm}
                        >
                          {(key === "gender"
                            ? ["Nam", "Nữ", "Khác"]
                            : ["Đang làm việc", "Nghỉ việc", "Tạm nghỉ"]
                          ).map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={
                            key === "dateOfBirth" || key === "hireDate"
                              ? "date"
                              : key === "email"
                              ? "email"
                              : "text"
                          }
                          name={key}
                          value={form[key]}
                          onChange={changeForm}
                          disabled={editing && key === "employeeId"}
                          required={
                            ["employeeId", "fullName", "email"].includes(key)
                          }
                        />
                      )}
                    </label>
                  ))}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="primary">
                    {editing ? "Lưu thay đổi" : "Thêm nhân viên"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer>
        Hệ thống quản lý nhân sự | MSSV: 237430
      </footer>
    </div>
  );
}

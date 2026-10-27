
const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();
    const filter = search ? {
      $or: [
        { employeeId: { $regex: escapeRegex(search), $options: "i" } },
        { fullName: { $regex: escapeRegex(search), $options: "i" } }
      ]
    } : {};
    res.json(await Employee.find(filter).sort({ employeeId: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { employeeId, fullName, email } = req.body;
    if (![employeeId, fullName, email].every(v => typeof v === "string" && v.trim())) {
      return res.status(400).json({ message: "Thiếu mã, họ tên hoặc email" });
    }
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { employeeId, fullName, email, ...other } = req.body;
    if (fullName !== undefined && (!String(fullName).trim())) {
      return res.status(400).json({ message: "Họ tên không hợp lệ" });
    }
    if (email !== undefined && (!String(email).trim())) {
      return res.status(400).json({ message: "Email không hợp lệ" });
    }
    const updates = { ...other };
    if (fullName !== undefined) updates.fullName = fullName;
    if (email !== undefined) updates.email = email;
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeId: req.params.id });
    if (!employee) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json({ message: "Đã xóa nhân viên" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

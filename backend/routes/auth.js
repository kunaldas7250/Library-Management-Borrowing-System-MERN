
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      admissionId: req.body.admissionId,
      employeeId: req.body.employeeId,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPass,
      isAdmin: req.body.isAdmin || false,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { admissionId, employeeId, password } = req.body;

    const user = admissionId
      ? await User.findOne({ admissionId })
      : await User.findOne({ employeeId });

    console.log("USER:", user);

    if (!user) return res.status(404).json("User not found");
    if (!user.password) return res.status(500).json("Password field missing in DB");

    const valid = await bcrypt.compare(password, user.password);
    console.log("VALID:", valid);

    const token = jwt.sign({ id: user._id }, "library_secret");

    res.json({ token, user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json(err.message);
  }
});

export default router;

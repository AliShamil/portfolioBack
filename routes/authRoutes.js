const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


router.post("/register", async (Request, Response) => {
    try {
        const { firstName,lastName, email, passwordHash,phone,about,profilePic,socialMedia } = req.body;
        if (UserModel.find({ email }))
            return res.status(400).json({ message: "Email already exists" });
        const password = await bcrypt.hash(passwordHash, 10);
        const user = new UserModel({ fullname, email, password });
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/login", async (Request, Response) => {
    try {
        const { email, passwordHash } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email doesn't exist" });

        if (!(await bcrypt.compare(passwordHash, user.password))) {
            return res
                .status(401)
                .json({ error: "Geçersiz kullanıcı adı veya şifre" });
        }

        const accessToken = jwt.sign(
            { email: user.email },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1m",
            }
        );
        const refreshToken = jwt.sign(
            { email: user.email },
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: "10m",
            }
        );

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
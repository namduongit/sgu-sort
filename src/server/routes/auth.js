const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const API_LOGIN_URL = "https://thongtindaotao.sgu.edu.vn/public/api/auth/login";
const API_REFRESH_URL = "https://thongtindaotao.sgu.edu.vn/api/auth/login";

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post(
            API_LOGIN_URL,
            qs.stringify({
                username,
                password,
                grant_type: "password"
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
        res.json(response.data);
        console.log("Login data: ", response.data);
    } catch (error) {
        console.error(" login failed:", error?.response?.data || error.message);
        res.status(500).json({ message: "Login to SGU failed" });
    }
});

// Refresh token
router.post("/refresh", async (req, res) => {
    const { refresh_token } = req.body;

    try {
        const response = await axios.post(
            API_REFRESH_URL,
            qs.stringify({
                refresh_token,
                grant_type: "refresh_token"
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
        res.json(response.data);
        console.log("Refresh token data: ", response.data);

    } catch (error) {
        console.error("SGU refresh failed:", error?.response?.data || error.message);
        res.status(500).json({ message: "Refresh token failed" });
    }
});

module.exports = router;
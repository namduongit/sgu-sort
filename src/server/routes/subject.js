const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const API_FILTER_SUBJECT = "https://thongtindaotao.sgu.edu.vn/public/api/dkmh/w-locdsnhomto";
const RAW_BODY = { "is_CVHT": false, "additional": { "paging": { "limit": 99999, "page": 1 }, "ordering": [{ "name": "", "order_type": "" }] } };

// Get subject
router.post("/subjects", async (req, res) => {
    const { access_token } = req.body;
    try {
        const response = await axios.post(
            API_FILTER_SUBJECT,
            RAW_BODY,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            }
        );
        res.json(response.data);
        console.log("Subjects data: ", response.data);
    } catch (error) {
        console.error("Request subject failed:", error?.response?.data || error.message);
        res.status(500).json({ message: "Get subjects to SGU failed" });
    }
});

module.exports = router;
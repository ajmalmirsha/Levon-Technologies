"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Controllers/auth");
const router = (0, express_1.Router)();
router.post("/login", auth_1.Login);
router.post("/register", auth_1.Register);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const genToken = (userData) => {
    return (0, jsonwebtoken_1.sign)(userData, process.env.JWT_SECRET, { expiresIn: "1day" });
};
exports.genToken = genToken;

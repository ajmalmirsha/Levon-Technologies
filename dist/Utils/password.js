"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = void 0;
const bcrypt_1 = require("bcrypt");
const compareHash = (password, hash) => {
    try {
        return (0, bcrypt_1.compare)(password, hash);
    }
    catch (error) {
        console.log(error);
    }
};
exports.compareHash = compareHash;

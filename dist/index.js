"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoute_1 = __importDefault(require("../src/Routes/productRoute"));
const authRoute_1 = __importDefault(require("../src/Routes/authRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
(0, mongoose_1.connect)(process.env.MONGO_URI).then(() => {
    console.log("connected to database");
});
app.use(express_1.default.json());
app.use("/auth", authRoute_1.default);
app.use("/product", productRoute_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

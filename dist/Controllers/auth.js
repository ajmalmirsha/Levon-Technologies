"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Login = void 0;
const response_1 = require("../Utils/response");
const jwt_1 = require("../Utils/jwt");
const user_1 = require("../Model/user");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username)
            throw "username is required !";
        if (!password)
            throw "password is required !";
        const user = yield user_1.userModel
            .findOne({ username })
            .select("username password");
        if (!user)
            throw "invalid username !";
        if (!(yield (user === null || user === void 0 ? void 0 : user.comparePassword(user.password))))
            throw "invalid password !";
        const token = (0, jwt_1.genToken)({ username });
        (0, response_1.SuccessResponse)(res, { token }, "user login successful");
    }
    catch (error) {
        console.log(error);
        (0, response_1.ErrorResponse)(res, error, "failed login user !");
    }
});
exports.Login = Login;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username)
            throw "username is required !";
        if (!password)
            throw "password is required !";
        yield user_1.userModel.create({ username, password });
        const token = (0, jwt_1.genToken)({ username });
        (0, response_1.SuccessResponse)(res, { token }, "user register successful");
    }
    catch (error) {
        console.log(error);
        (0, response_1.ErrorResponse)(res, error, "failed register user !");
    }
});
exports.Register = Register;

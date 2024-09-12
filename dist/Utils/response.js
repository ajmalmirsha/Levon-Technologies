"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
const SuccessResponse = (res, data, message = "data fetched successfully", status = 200) => {
    res.status(status).json({ message, data });
};
exports.SuccessResponse = SuccessResponse;
const ErrorResponse = (res, error, message = "something went wrong", status = 500) => {
    res.status(status).json({ message, error });
};
exports.ErrorResponse = ErrorResponse;

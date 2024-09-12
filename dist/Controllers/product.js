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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createNewProduct = void 0;
const response_1 = require("../Utils/response");
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(__dirname, "../Assets/products.json");
        const products = JSON.parse((yield (0, promises_1.readFile)(filePath, "utf8")) || "[]") || [];
        const productDetails = req.body;
        const { description, inStock = true, name, price } = productDetails;
        const productId = Math.max(...products.map((x) => x.id)) || 0;
        if (!name)
            throw "product name is required !";
        if (!price || price < 0)
            throw "product price is required !";
        products.unshift({ id: productId + 1, name, price, description, inStock });
        yield (0, promises_1.writeFile)(filePath, JSON.stringify(products));
        (0, response_1.SuccessResponse)(res, products);
    }
    catch (error) {
        console.log("Error:", error);
        (0, response_1.ErrorResponse)(res, error);
    }
});
exports.createNewProduct = createNewProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(__dirname, "../Assets/products.json");
        const products = JSON.parse((yield (0, promises_1.readFile)(filePath, "utf8")) || "[]") || [];
        (0, response_1.SuccessResponse)(res, products);
    }
    catch (error) {
        console.log("Error:", error);
        (0, response_1.ErrorResponse)(res, error);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!productId)
            throw "product id is required !";
        const filePath = path_1.default.join(__dirname, "../Assets/products.json");
        const products = JSON.parse((yield (0, promises_1.readFile)(filePath, "utf8")) || "[]") || [];
        const result = products.find((x) => x.id === Number(productId));
        if (!result)
            throw "item not found !";
        (0, response_1.SuccessResponse)(res, result);
    }
    catch (error) {
        console.log("Error:", error);
        (0, response_1.ErrorResponse)(res, error);
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!productId)
            throw "product id is required !";
        const filePath = path_1.default.join(__dirname, "../Assets/products.json");
        const productDetails = req.body;
        const { description, inStock, name, price } = productDetails;
        if (!name)
            throw "product name is required !";
        if (!price || price < 0)
            throw "product price is required !";
        const products = JSON.parse((yield (0, promises_1.readFile)(filePath, "utf8")) || "[]") || [];
        const result = products.map((x) => {
            if (x.id === Number(productId)) {
                return Object.assign(Object.assign({}, x), { name: name || (x === null || x === void 0 ? void 0 : x.name), price: price || (x === null || x === void 0 ? void 0 : x.price), inStock: inStock || (x === null || x === void 0 ? void 0 : x.inStock), description: description || (x === null || x === void 0 ? void 0 : x.description) });
            }
            return x;
        });
        yield (0, promises_1.writeFile)(filePath, JSON.stringify(result));
        (0, response_1.SuccessResponse)(res, result, "product updated successfully");
    }
    catch (error) {
        console.log("Error:", error);
        (0, response_1.ErrorResponse)(res, error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!productId)
            throw "product id is required !";
        const filePath = path_1.default.join(__dirname, "../Assets/products.json");
        const products = JSON.parse((yield (0, promises_1.readFile)(filePath, "utf8")) || "[]") || [];
        const result = products.filter((x) => {
            if (x.id !== Number(productId)) {
                return x;
            }
        });
        yield (0, promises_1.writeFile)(filePath, JSON.stringify(result));
        (0, response_1.SuccessResponse)(res, result, "product deleted successfully");
    }
    catch (error) {
        console.log("Error:", error);
        (0, response_1.ErrorResponse)(res, error);
    }
});
exports.deleteProduct = deleteProduct;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../Controllers/product");
const router = (0, express_1.Router)();
router.post("/create", product_1.createNewProduct);
router.get("/get", product_1.getProducts);
router
    .route("/:productId")
    .get(product_1.getProductById)
    .put(product_1.updateProduct)
    .delete(product_1.deleteProduct);
exports.default = router;

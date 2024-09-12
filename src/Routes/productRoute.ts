import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../Controllers/product";

const router = Router();

router.post("/create", createNewProduct);
router.get("/get", getProducts);
router
  .route("/:productId")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;

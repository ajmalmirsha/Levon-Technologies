import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../Utils/response";
import { ProductType } from "../Types/Product";
import path from "path";
import { readFile, writeFile } from "fs/promises";

export const createNewProduct = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../Assets/products.json");

    const products: ProductType[] =
      JSON.parse((await readFile(filePath, "utf8")) || "[]") || [];

    const productDetails: ProductType = req.body;

    const { description, inStock = true, name, price } = productDetails;

    const productId = Math.max(...products.map((x) => x.id)) || 0;

    if (!name) throw "product name is required !";
    if (!price || price < 0) throw "product price is required !";

    products.unshift({ id: productId + 1, name, price, description, inStock });

    await writeFile(filePath, JSON.stringify(products));

    SuccessResponse(res, products);
  } catch (error) {
    console.log("Error:", error);

    ErrorResponse(res, error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../Assets/products.json");

    const products: ProductType[] =
      JSON.parse((await readFile(filePath, "utf8")) || "[]") || [];

    SuccessResponse(res, products);
  } catch (error) {
    console.log("Error:", error);

    ErrorResponse(res, error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!productId) throw "product id is required !";

    const filePath = path.join(__dirname, "../Assets/products.json");

    const products: ProductType[] =
      JSON.parse((await readFile(filePath, "utf8")) || "[]") || [];

    const result: ProductType = products.find(
      (x) => x.id === Number(productId)
    );

    if (!result) throw "item not found !";

    SuccessResponse(res, result);
  } catch (error) {
    console.log("Error:", error);
    ErrorResponse(res, error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!productId) throw "product id is required !";

    const filePath = path.join(__dirname, "../Assets/products.json");

    const productDetails: ProductType = req.body;

    const { description, inStock, name, price } = productDetails;

    if (!name) throw "product name is required !";
    if (!price || price < 0) throw "product price is required !";

    const products: ProductType[] =
      JSON.parse((await readFile(filePath, "utf8")) || "[]") || [];

    const result: ProductType[] = products.map((x) => {
      if (x.id === Number(productId)) {
        return {
          ...x,
          name: name || x?.name,
          price: price || x?.price,
          inStock: inStock || x?.inStock,
          description: description || x?.description,
        };
      }
      return x;
    });

    await writeFile(filePath, JSON.stringify(result));

    SuccessResponse(res, result, "product updated successfully");
  } catch (error) {
    console.log("Error:", error);
    ErrorResponse(res, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!productId) throw "product id is required !";

    const filePath = path.join(__dirname, "../Assets/products.json");

    const products: ProductType[] =
      JSON.parse((await readFile(filePath, "utf8")) || "[]") || [];

    const result: ProductType[] = products.filter((x) => {
      if (x.id !== Number(productId)) {
        return x;
      }
    });

    await writeFile(filePath, JSON.stringify(result));

    SuccessResponse(res, result, "product deleted successfully");
  } catch (error) {
    console.log("Error:", error);
    ErrorResponse(res, error);
  }
};

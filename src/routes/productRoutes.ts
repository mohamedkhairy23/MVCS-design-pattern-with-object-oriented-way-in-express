import express, { Request, Response } from "express";
import ProductController from "../controllers/productController";
import ProductService from "../services/ProductService";
import { generateFakeProducts } from "../utils/fakeData";

const router = express.Router();

let fakeProductsData = generateFakeProducts();

const productService = new ProductService(fakeProductsData);
const productController = new ProductController(productService);

// ** Endpoints For Products
router.get("/", (req: Request, res: Response) =>
  res.send(productController.getProducts(req))
);

router.get("/:id", (req: Request, res: Response) =>
  res.send(productController.getProductById(req, res))
);

router.post("", (req: Request, res: Response) =>
  productController.createProduct(req, res)
);

router.patch("/:id", (req: Request, res: Response) => {
  productController.updateProduct(req, res);
});

router.delete("/:id", (req: Request, res: Response) =>
  productController.deleteProduct(req, res)
);

export default router;

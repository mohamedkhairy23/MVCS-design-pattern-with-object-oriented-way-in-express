import express, { Request, Response } from "express";
import { generateFakeProducts } from "./utils/fakeData";
import ProductController from "./controllers/productController";
import ProductService from "./services/ProductService";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello Express.js</h1>");
});

let fakeProductsData = generateFakeProducts();

const productService = new ProductService(fakeProductsData);
const productController = new ProductController(productService);

// ** Endpoints For Products
app.get("/products", (req: Request, res: Response) =>
  res.send(productController.getProducts(req))
);

app.get("/products/:id", (req: Request, res: Response) =>
  res.send(productController.getProductById(req, res))
);

// ** create a new product
app.post("/products", (req: Request, res: Response) =>
  productController.createProduct(req, res)
);

app.patch("/products/:id", (req: Request, res: Response) => {
  productController.updateProduct(req, res);
});

app.delete("/products/:id", (req: Request, res: Response) =>
  productController.deleteProduct(req, res)
);

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});

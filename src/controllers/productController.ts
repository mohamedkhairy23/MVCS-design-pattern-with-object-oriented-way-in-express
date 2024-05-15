import { Request, Response } from "express";
import { Product } from "../interfaces";
import ProductService from "../services/ProductService";

class ProductController {
  constructor(private productService: ProductService) {}

  getProducts(req: Request) {
    const filterQuery = req.query.filter as string;
    if (filterQuery) {
      return this.productService.filterByQuery(filterQuery);
    }
    return this.productService.findAll();
  }

  getProductById(req: Request, res: Response) {
    const productId = +req.params.id;

    if (isNaN(productId)) {
      res.status(404).send({ message: "Invalid product ID" });
    }
    const findProduct: Product | undefined =
      this.productService.getProductById(productId);

    if (findProduct) {
      res.send({
        id: productId,
        title: findProduct.title,
        price: findProduct.price,
        description: findProduct.description,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }

  createProduct(req: Request, res: Response) {
    const productBody = req.body;

    this.productService.createProduct(productBody);

    res.status(201).send({
      id: this.productService.findAll().length,
      title: productBody.title,
      price: productBody.price,
      description: productBody.description,
    });
  }

  updateProduct(req: Request, res: Response) {
    const productId = +req.params.id;

    if (isNaN(productId)) {
      return res.status(404).send({
        message: "Product Not Found",
      });
    }

    const productIndex: number = this.productService
      .findAll()
      .findIndex((product) => product.id === productId);

    const productBody = req.body;

    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.productService.findAll()[productIndex],
        ...productBody,
      };
      this.productService.updateProductByIndex(productIndex, productBody);
      return res.status(200).send({
        message: "Product has been updated",
        data: updatedProduct,
      });
    } else {
      return res.status(404).send({
        message: "Product Not Found",
      });
    }
  }

  deleteProduct(req: Request, res: Response) {
    const productId = +req.params.id;

    if (isNaN(productId)) {
      return res.status(404).send({
        message: "Product Not Found",
      });
    }

    const productIndex: number = this.productService
      .findAll()
      .findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      let filteredProducts = this.productService.deleteProductById(productId);
      res.status(200).send(filteredProducts);
    } else {
      return res.status(404).send({
        message: "Product Not Found",
      });
    }
  }
}

export default ProductController;

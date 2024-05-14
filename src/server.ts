import express, { Request, Response } from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "./interfaces";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello Express.js</h1>");
});

let fakeProductsData = generateFakeProducts();

// ** Endpoints For Products

// ** Get All Products
app.get("/products", (req: Request, res: Response) => {
  // ** Filter By, keyof Product
  const filterQuery = req.query.filter as string;
  if (filterQuery) {
    const propertiesToFilter = filterQuery.split(",");
    let filteredProducts = [];

    filteredProducts = fakeProductsData.map((product) => {
      const filteredProduct: any = {};
      propertiesToFilter.forEach((property) => {
        if (product.hasOwnProperty(property)) {
          filteredProduct[property] = product[property as keyof Product];
        }
      });
      return { id: product.id, ...filteredProduct };
    });
    return res.send(filteredProducts);
  }
  res.send(fakeProductsData);
});

// ** Get Single Product
app.get("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;
  if (isNaN(productId)) {
    res.status(404).send({ message: "Invalid product ID" });
  }
  const findProduct: Product | undefined = fakeProductsData.find(
    (product) => product.id === productId
  );
  if (findProduct) {
    res.send({
      id: findProduct.id,
      title: findProduct.title,
      price: findProduct.price,
      description: findProduct.description,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// ** create a new product
app.post("/products", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.headers);

  const newProduct = req.body;

  fakeProductsData.push({ id: fakeProductsData.length + 1, ...newProduct });

  res.status(201).send({
    id: fakeProductsData.length + 1,
    title: newProduct.title,
    price: newProduct.price,
    description: newProduct.description,
  });
});

app.patch("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;

  if (isNaN(productId)) {
    return res.status(404).send({
      message: "Product Not Found",
    });
  }

  const productIndex: number = fakeProductsData.findIndex(
    (product) => product.id === productId
  );

  const productBody = req.body;

  if (productIndex !== -1) {
    const updatedProduct = {
      ...fakeProductsData[productIndex],
      ...productBody,
    };
    fakeProductsData[productIndex] = updatedProduct;

    return res.status(200).send({
      message: "Product has been updated",
      data: updatedProduct,
    });
  } else {
    return res.status(404).send({
      message: "Product Not Found",
    });
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;

  if (isNaN(productId)) {
    return res.status(404).send({
      message: "Product Not Found",
    });
  }

  const productIndex: number = fakeProductsData.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    const filteredProducts = fakeProductsData.filter(
      (product) => product.id !== productId
    );
    fakeProductsData = filteredProducts;
    res.status(200).send(filteredProducts);
  } else {
    return res.status(404).send({
      message: "Product Not Found",
    });
  }
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});

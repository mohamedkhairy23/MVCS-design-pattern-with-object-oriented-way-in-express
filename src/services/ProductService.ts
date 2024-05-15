import { Product } from "../interfaces";

type ProductBody = {
  title: string;
  price: number;
  description: string;
};

// ** Service is responible for data storage and retrieval
export default class ProductService {
  constructor(private products: Product[]) {
    this.products = products;
  }

  findAll(): Product[] {
    return this.products;
  }

  filterByQuery(filterQuery?: string) {
    // ** Filter By, keyof Product
    if (filterQuery) {
      const propertiesToFilter = filterQuery.split(",");
      let filteredProducts = [];
      filteredProducts = this.findAll().map((product) => {
        const filteredProduct: any = {};
        propertiesToFilter.forEach((property) => {
          if (product.hasOwnProperty(property)) {
            filteredProduct[property] = product[property as keyof Product];
          }
        });
        return { id: product.id, ...filteredProduct };
      });
      return filteredProducts;
    }
    return this.findAll();
  }

  getProductById(productId: number) {
    return this.findAll().find((product) => product.id === productId);
  }

  createProduct(productBody: ProductBody) {
    return this.findAll().push({
      id: this.findAll().length + 1,
      ...productBody,
    });
  }

  updateProductByIndex(productIndex: number, productBody: ProductBody) {
    const updatedProduct = {
      ...this.findAll()[productIndex],
      ...productBody,
    };
    this.findAll()[productIndex] = updatedProduct;
  }

  deleteProductById(productId: number) {
    return this.findAll().filter((product) => product.id !== productId);
  }
}

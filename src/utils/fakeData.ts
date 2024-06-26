import { faker } from "@faker-js/faker";
export const generateFakeProducts = () => {
  return Array.from({ length: 35 }, (_, idx) => {
    return {
      id: idx + 1,
      title: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 100, max: 200 }),
      description: faker.commerce.productDescription(),
    };
  });
};

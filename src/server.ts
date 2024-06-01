import express, { Request, Response } from "express";

import productRoutes from "./routes/productRoutes";

const app = express();

app.use(express.json());
app.set("view engine", "pug");

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.use("/products", productRoutes);

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});

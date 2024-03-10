const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/healthcheck", (req, res) => res.send("All is right"));

app.get("/api/products", async (req, res) => {
  const products = [
    {
      id: 1,
      category: "Category1",
      product: "Product1",
      price: 10.2,
      stock: 50,
    },
    {
      id: 1,
      category: "Category1",
      product: "Product2",
      price: 20.2,
      stock: 30,
    },
    {
      id: 1,
      category: "Category1",
      product: "Product3",
      price: 18.8,
      stock: 70,
    },
    {
      id: 1,
      category: "Category1",
      product: "Product4",
      price: 45.3,
      stock: 20,
    },
    { id: 1, category: "Category1", product: "Product5", price: 56, stock: 56 },
  ];
  const response = await fetch(
    process.env.backendUrl2 || "http://localhost:3020/api/products"
  ).then();
  const data = await response.json().then();
  res.json(products.concat(data));
});

app.use("**", (req, res) => res.status(404).send("Path not found"));

const server = http.createServer(app);

server.listen(3010, () => console.log(`Server is running on port 3010`));

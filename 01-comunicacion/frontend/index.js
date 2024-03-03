const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("./public"));

app.get("/healthcheck", (req, res) => res.send("All is right"));

app.get("/api/config", (req, res) => {
  res.json({
    backend1Url: "http://localhost:3010/api/products",
  });
});

app.use("**", (req, res) => res.status(404).send("Path not found"));

const server = http.createServer(app);

server.listen(3000, () => console.log(`Server is running on port 3000`));

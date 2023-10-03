const express = require('express');
const fs = require('fs');
import ProductsRouter from "./routes/products.js";
import CartRouter from "./routes/cart.js";
const app = express();
const port = 8080;

app.use(express.json());


app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartRouter);

app.listen(port, () => {
  console.log(`servidor coreriendo ${port}`);
});

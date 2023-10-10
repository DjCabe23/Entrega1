
const fs = require('fs');
import { Router } from "express";
const ProductsRouter = Router();


const productsRouter = express.Router();
app.use('/api/products', productsRouter);

const { addProduct, getProductById, updateProduct, deleteProduct } = require('./productManager');

productsRouter.get('/', (req, res) => {

});

productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;

});

productsRouter.post('/', (req, res) => {
  const {
    id,
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  } = req.body;


  if (!id || !title || !description || !code || !price || !stock || !category || !thumbnails) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

 
  const newProduct = {
    id,
    title,
    description,
    code,
    price,
    status: true, 
    stock,
    category,
    thumbnails
  };


  const addedProduct = addProduct(newProduct);


  res.status(201).json(addedProduct);
});

productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;


  const updatedProduct = updateProduct(productId, updatedFields);

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }


  res.json(updatedProduct);
});

productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;


  const deletedProduct = deleteProduct(productId);

  if (!deletedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  res.json(deletedProduct);
});
export default ProductsRouter;

const fs = require('fs');
import { Router } from "express";

const CartRouter = Router();

const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

const { createCart, getCartById, addProductToCart } = require('./cartManager');

cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;


  const cart = getCartById(cartId);

  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado.' });
  }

  res.json(cart);
});

cartsRouter.post('/', (req, res) => {
 
  const newCart = {
    id: 1, 
    products: []
  };

 
  const createdCart = createCart(newCart);

  res.status(201).json(createdCart);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;


  const cart = getCartById(cartId);

  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado.' });
  }

  const existingProduct = cart.products.find((product) => product.id === productId);

  if (existingProduct) {

    existingProduct.quantity += 1;
  } else {

    cart.products.push({ id: productId, quantity: 1 });
  }


  res.json(cart);
});

export default CartRouter;
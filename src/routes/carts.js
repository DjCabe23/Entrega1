
const fs = require('fs');
import { Router } from "express";

const CartRouter = Router();

let manager = new CartManager;

CartRouter.post("/", async (req, res)=>{
    let newCart; 
    try {
      newCart = await manager.createCarts();
      res.send({ status: "success", msg: "Carrito creado"})
    } catch (error) {
        res.status(400).send({ status: "error", msg: "carrito no creado" }) 
    } 
});

CartRouter.get("/:cid", async (req, res)=>{
    let cid = req.params.cid;
    let product;
    try {
      product = await manager.getCartsById(cid);
    } catch (error) {
      res.status(400).send({ status: "error", msg: "Producto no encontrado" }) 
    }
    res.send({ status: "success", payload: product})
});

CartRouter.post("/:cid/products/:pid", async(req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    let addProduct;
    try {
      addProduct = await manager.addProductToCart(cid, pid)
    } catch (error) {
      res.status(400).send({ status: "error", msg: "Productos no encontrado" })
    }
    res.send({ status: "success", msg: "Product Added"})
})

CartRouter.delete("/:cid", async(req,res)=>{
  let cid = req.params.cid 
  try {
    await manager.deleteAllProducts(cid)
  } catch (error) {
    res.status(400).send({ status: "error", msg: "Producto no elimiando" })
  }
  res.send({ status: "success", msg: "Producto eliminado"})
})

CartRouter.delete("/:cid/products/:pid", async(req, res)=>{
  let cid = req.params.cid;
  let pid = req.params.pid;
  let deleteProduct;
  try {
    deleteProduct = await manager.deleteProduct(cid, pid)
  } catch (error) {
    res.status(400).send({ status: "error", msg: "Producto no encontrado" })
  }
  res.send({ status: "success", msg: "Producto eliminado"})
})

CartRouter.put("/:cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let quantity = req.body.quantity;
  try {
    await manager.updateProductQuantity(cid, pid, quantity);
    res.send({ status: "success", msg: "Producto actualizado" });
  } catch (error) {
    res.status(400).send({ status: "error", msg: "Producto no encontrado" });
  }
});

export default CartRouter;
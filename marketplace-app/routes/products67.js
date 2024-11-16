const express = require('express');
const router = express.Router();
const ProductController67 = require('../controllers/ProductController67');

// RESTful API 路由
router.get("/", ProductController67.getAllProducts);

router.post("/products", ProductController67.createProduct);
router.put("/:id", ProductController67.updateProductById);
router.delete("/:id", ProductController67.deleteProductById);
router.delete("/", ProductController67.deleteAllProducts);
router.get("/search", ProductController67.findProductsByName);
router.get("/products/:id", ProductController67.getProductById);
router.get('/products', ProductController67.findProductsByName);


module.exports = router;



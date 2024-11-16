// const ProductModel = require("../models/ProductModel");
//const Product = require("../models/ProductModel");

const ProductModel = require('../models/ProductModel67');

const ProductController = {
    // 添加产品
    // createProduct: async (req, res) => {
    //     try {
    //         const newProduct = await Product.create(req.body);
    //         res.status(201).json(newProduct);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },


    // 添加新产品
    createProduct: async (req, res) => {
        const { name, description, price, quantity, category } = req.body;
        console.log('Request Body:', req.body);  // 打印请求体

        // 检查是否所有必需的字段都有提供
        if (!name || !description || !price || !quantity || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            // 创建新的产品实例
            const newProduct = new ProductModel({
                name,
                description,
                price,
                quantity,
                category,
            });

            // 保存到数据库
            await newProduct.save();

            // 返回成功的响应
            res.status(201).json({
                message: 'Product added successfully',
                product: newProduct,
            });
        } catch (error) {
            // 错误处理
            console.error('Error adding product:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message,
            });
        }
    },

    // 获取所有产品
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 根据 ID 更新产品
    updateProductById: async (req, res) => {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedProduct)
                return res.status(404).json({ error: "Product not found" });
            res.status(200).json(updatedProduct);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    // Get a product by ID
    getProductById: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.json(product);
        } catch (err) {
            res.status(500).send({ message: "Error retrieving product" });
        }
    },

    // 根据 ID 删除产品
    deleteProductById: async (req, res) => {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
            if (!deletedProduct)
                return res.status(404).json({ error: "Product not found" });
            res.status(200).json({ message: "Product deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 删除所有产品
    deleteAllProducts: async (req, res) => {
        try {
            await ProductModel.deleteMany();
            res.status(200).json({ message: "All products deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 按名称查找产品
    findProductsByName: async (req, res) => {
        try {
            const keyword = req.query.name || "";
            const products = await ProductModel.find({
                name: { $regex: keyword, $options: "i" },
            });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    findProductsByName: async (req, res) => {
        // Extract the 'name' query parameter from the request
        const keyword = req.query.name;

        // If 'name' parameter is not provided, return an error
        if (!keyword) {
            return res.status(400).json({ error: 'Query parameter "name" is required' });
        }

        try {
            // Search for products with 'name' containing the keyword (case-insensitive)
            const products = await ProductModel.find({
                name: { $regex: keyword, $options: 'i' } // 'i' makes it case-insensitive
            });

            // If no products are found, return a message
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found matching that keyword' });
            }

            // If products are found, return them in the response
            res.status(200).json(products);
        } catch (error) {
            // Handle any errors that occur during the query
            res.status(500).json({ error: 'Internal server error' });
        }
    },

};

module.exports = ProductController;


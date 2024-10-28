const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Tüm ürün kayıtlarını listele
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tek bir ürün kaydını getir
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Yeni bir ürün kaydı oluştur
router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ürün kaydını güncelle
router.put('/:productId', async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { product_id: req.params.productId }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.productId);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ürün kaydını sil
router.delete('/:productId', async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { product_id: req.params.productId }
        });
        if (deleted) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

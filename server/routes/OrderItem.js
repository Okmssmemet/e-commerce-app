const express = require('express');
const router = express.Router();
const OrderItem = require('../models/orderitem');

// Tüm kayıtları listele
router.get('/', async (req, res) => {
    try {
        const items = await OrderItem.findAll();
        res.json(items);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

// Belirli bir order ve product ID'ye göre kayıt getir
router.get('/:order_id/:product_id', async (req, res) => {
    try {
        const item = await OrderItem.findOne({ 
            where: { 
                order_id: req.params.order_id,
                product_id: req.params.product_id
            }
        });
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Order item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Yeni bir kayıt oluştur
router.post('/', async (req, res) => {
    try {
        const newItem = await OrderItem.create(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Bir kaydı güncelle
router.put('/:order_id/:product_id', async (req, res) => {
    try {
        const updatedItem = await OrderItem.update(req.body, {
            where: { 
                order_id: req.params.order_id,
                product_id: req.params.product_id 
            }
        });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Bir kaydı sil
router.delete('/:order_id/:product_id', async (req, res) => {
    try {
        const deleted = await OrderItem.destroy({
            where: { 
                order_id: req.params.order_id,
                product_id: req.params.product_id 
            }
        });
        if (deleted) {
            res.json({ message: 'Order item deleted' });
        } else {
            res.status(404).json({ error: 'Order item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');

// Tüm satıcı kayıtlarını listele
router.get('/', async (req, res) => {
    try {
        const sellers = await Seller.findAll();
        res.json(sellers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tek bir satıcı kaydını getir
router.get('/:sellerId', async (req, res) => {
    try {
        const seller = await Seller.findByPk(req.params.sellerId);
        if (seller) {
            res.json(seller);
        } else {
            res.status(404).json({ error: 'Seller not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Yeni bir satıcı kaydı oluştur
router.post('/', async (req, res) => {
    try {
        const newSeller = await Seller.create(req.body);
        res.status(201).json(newSeller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Satıcı kaydını güncelle
router.put('/:sellerId', async (req, res) => {
    try {
        const [updated] = await Seller.update(req.body, {
            where: { seller_id: req.params.sellerId }
        });
        if (updated) {
            const updatedSeller = await Seller.findByPk(req.params.sellerId);
            res.json(updatedSeller);
        } else {
            res.status(404).json({ error: 'Seller not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Satıcı kaydını sil
router.delete('/:sellerId', async (req, res) => {
    try {
        const deleted = await Seller.destroy({
            where: { seller_id: req.params.sellerId }
        });
        if (deleted) {
            res.json({ message: 'Seller deleted' });
        } else {
            res.status(404).json({ error: 'Seller not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

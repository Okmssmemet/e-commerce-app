const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Tüm inceleme kayıtlarını listele
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tek bir inceleme kaydını getir
router.get('/:reviewId', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Yeni bir inceleme kaydı oluştur
router.post('/', async (req, res) => {
    try {
        const newReview = await Review.create(req.body);
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// İnceleme kaydını güncelle
router.put('/:reviewId', async (req, res) => {
    try {
        const [updated] = await Review.update(req.body, {
            where: { review_id: req.params.reviewId }
        });
        if (updated) {
            const updatedReview = await Review.findByPk(req.params.reviewId);
            res.json(updatedReview);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// İnceleme kaydını sil
router.delete('/:reviewId', async (req, res) => {
    try {
        const deleted = await Review.destroy({
            where: { review_id: req.params.reviewId }
        });
        if (deleted) {
            res.json({ message: 'Review deleted' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

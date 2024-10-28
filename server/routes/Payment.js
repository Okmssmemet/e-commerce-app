const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

// Tüm ödeme kayıtlarını listele
router.get("/", async (req, res) => {
    try {
        const payments = await Payment.findAll();
        return res.status(200).json(payments);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Bir hata oluştu." });
    }
});

// Belirli bir ödeme kaydını order_id ve customer_id ile getir
router.get("/:orderId/:customerId", async (req, res) => {
    const { orderId, customerId } = req.params; // Parametreleri al
    try {
        const payment = await Payment.findOne({
            where: {
                order_id: orderId,
                customer_id: customerId
            }
        });
        if (payment) {
            return res.status(200).json(payment);
        } else {
            return res.status(404).json({ error: "Ödeme kaydı bulunamadı." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Bir hata oluştu." });
    }
});

// Yeni bir ödeme kaydı oluştur
router.post("/", async (req, res) => {
    try {
        const newPayment = await Payment.create(req.body);
        return res.status(201).json(newPayment);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Ödeme kaydı oluşturulurken bir hata oluştu." });
    }
});

// Belirli bir ödeme kaydını güncelle
router.put("/:orderId/:customerId", async (req, res) => {
    const { orderId, customerId } = req.params; // Parametreleri al
    try {
        const [updated] = await Payment.update(req.body, {
            where: {
                order_id: orderId,
                customer_id: customerId
            }
        });
        if (updated) {
            const updatedPayment = await Payment.findOne({
                where: {
                    order_id: orderId,
                    customer_id: customerId
                }
            });
            return res.status(200).json(updatedPayment);
        } else {
            return res.status(404).json({ error: "Ödeme kaydı bulunamadı." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Bir hata oluştu." });
    }
});

// Belirli bir ödeme kaydını sil
router.delete("/:orderId/:customerId", async (req, res) => {
    const { orderId, customerId } = req.params; // Parametreleri al
    try {
        const deleted = await Payment.destroy({
            where: {
                order_id: orderId,
                customer_id: customerId
            }
        });
        if (deleted) {
            return res.status(200).json({ message: "Ödeme kaydı başarıyla silindi." });
        } else {
            return res.status(404).json({ error: "Ödeme kaydı bulunamadı." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Bir hata oluştu." });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Order_Table = require("../models/order_table");

router.get("/", async (req, res) => {
    try {
        const orders = await Order_Table.findAll();
        if (orders.length > 0) {
            return res.status(200).json(orders); 
        } else {
            return res.status(404).json("Herhangi bir sipariş kaydı bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
});

router.get("/:orderId", async (req, res) => {
    const order_id = req.params.orderId; 
    try {
        const order = await Order_Table.findByPk(order_id);
        if (order) {
            return res.status(200).json(order);
        } else {
            return res.status(404).json("Böyle bir sipariş bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu", stack: error.stack });
    }
});

router.get("/customer/:customerId", async (req, res) => {
    const customer_id = parseInt(req.params.customerId, 10);
    try {
        const orders = await Order_Table.findAll({
            where: {
                customer_id
            }
        });
        if (orders.length > 0) {
            return res.status(200).json(orders);
        } else {
            return res.status(404).json("Müşteri herhangi bir sipariş oluşturmadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
});

router.post("/", async (req, res) => {
    const { order_date, order_amount, order_status, shipping_date, customer_id, cart_id } = req.body;
    try {
        const createdOrder = await Order_Table.create({
            order_date,
            order_amount,
            order_status,
            shipping_date,
            customer_id,
            cart_id
        });
        return res.status(201).json({ createdOrder });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Sipariş oluşturulurken bir hata oluştu.", stack: error.stack });
    }
});

router.delete("/:orderId", async (req, res) => {
    const order_id = req.params.orderId;
    try {
        const deletedOrder = await Order_Table.destroy({
            where: {
                order_id
            }
        });
        if (deletedOrder) {
            return res.status(200).json("Sipariş başarıyla silindi");
        } else {
            return res.status(404).json("Böyle bir sipariş bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu", stack: error.stack });
    }
});

router.put("/:orderId", async (req, res) => {
    const order_id = req.params.orderId;
    const { order_date, order_amount, order_status, shipping_date, customer_id, cart_id } = req.body;

    try {
        const [updatedRows] = await Order_Table.update(
            {
                order_date,
                order_amount,
                order_status,
                shipping_date,
                customer_id,
                cart_id
            },
            {
                where: { order_id }
            }
        );

        if (updatedRows) {
            return res.status(200).json({ message: "Sipariş başarıyla güncellendi." });
        } else {
            return res.status(404).json({ message: "Böyle bir sipariş bulunamadı." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", details: error.message });
    }
});

module.exports = router;

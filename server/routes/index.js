const express = require("express");

const userRoute = require("./Customer");
const addressRoute = require("./Address");
const cartRoute = require("./Cart");
const categoryRoute = require("./Category");
const orderTableRoute = require("./Order_Table");
const paymentRoute = require("./Payment");
const productRoute = require("./Product");
const reviewRoute = require("./Review");
const sellerRoute = require("./Seller");
const orderItemRoute = require("./OrderItem");
const authRoutes = require('./Auth');

const router = express.Router();

router.use("/auth",authRoutes);
router.use("/customer", userRoute);
router.use("/address", addressRoute);
router.use("/cart", cartRoute);
router.use("/category", categoryRoute);
router.use("/order-table", orderTableRoute);
router.use("/payment", paymentRoute);
router.use("/product", productRoute);
router.use("/review", reviewRoute);
router.use("/seller", sellerRoute);
router.use("/order-item", orderItemRoute);

module.exports = router;
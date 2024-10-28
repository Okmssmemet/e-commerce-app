const express = require("express");
const app = express();
const userRoute = require("./routes/Customer")
const addressRoute = require("./routes/Address")
const cartRoute = require("./routes/Cart")
const categoryRoute = require("./routes/Category")
const order_tableRoute = require("./routes/Order_Table")
const PaymentRoute = require("./routes/Payment")
const ProductRoute = require("./routes/Product")
const ReviewRoute = require("./routes/Review")
const SellerRoute = require("./routes//Seller")
const OrderItemRoute = require("./routes/OrderItem")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HomePage")
})

app.use("/customer",userRoute);
app.use("/address",addressRoute);
app.use("/cart",cartRoute);
app.use("/category",categoryRoute);
app.use("/order-table",order_tableRoute);
app.use("/payment",PaymentRoute);
app.use("/product",ProductRoute);
app.use("/review",ReviewRoute);
app.use("/seller",SellerRoute);
app.use("/order-item",OrderItemRoute);


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Server Running")
})
const Order_Table = require("../models/order_table");
const createRoutes = require("../utils/routeHelpers");
const router = createRoutes(Order_Table,"Sipariş","order_id");
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
module.exports = router;

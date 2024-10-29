const Cart = require("../models/cart");
const createRoutes = require("../utils/routeHelpers");
const router = createRoutes(Cart,"Kart","cart_id");

router.get("/user/:userId", async (req,res) => {
    const userId = parseInt(req.params.userId, 10);
    console.log(typeof userId)

    try {
        const cart = await Cart.findAll({
            where:{
                customer_id:userId
            }
        })
        if (cart.length > 0) {
            return res.status(200).json(cart)
        } else {
            return res.status(404).json("Kullanıcı Bir Kart Oluşturmadı")
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
})

module.exports=router;
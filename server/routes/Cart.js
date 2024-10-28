const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");

router.get("/", async (req, res) => {
    try {
        const cart = await Cart.findAll();
        if (cart) {
            return res.status(200).json(cart); 
        }
        else{
            return res.status(404).json("Herhangi Bir Kart Kaydı Bulunamadı")
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu." ,stack: error.stack});
    }
});

router.get("/:cartId", async (req, res) => {
    const cart_id = req.params.cartId; 
    try {
        const cart = await Cart.findByPk(cart_id);
        if (cart) {
            return res.status(200).json(cart);
        } else {
            return res.status(404).json("Böyle Bir Kart Bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir Hata Oluştu", stack: error.stack }); 
    }
});

//Olmayan bir kullanıcı id üzerinden sorgulama yapabiliyor
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

router.post("/",async (req,res)=>{
    const grandtotal = req.body.grandtotal;
    const itemtotal = req.body.itemtotal;
    const customer_id = req.body.customer_id;
    const product_id = req.body.product_id;
    try {
        const createdCart = await Cart.create({
            grandtotal,
            itemtotal,
            customer_id,
            product_id
        });
        
        return res.status(201).json({ createdCart }); 
    } catch (error) {
        console.error("Hata:", error);
        return res.status(500).json({ error: "Kart oluşturulurken bir hata oluştu." , stack : error.stack}); 
    }
});

router.delete("/:cartId",async (req,res) => {
    const cart_id = req.params.cartId; 
    try {
        const deletedCart = await Cart.destroy({
            where:{
                cart_id: cart_id
            }
        });
        if (deletedCart) {
            return res.status(200).json("Kart Başarılı Bir Şekilde Silindi")
        }
        else{
            return res.status(404).json("Böyle Bir Kart Bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir Hata Oluştu", stack: error.stack });
    }
})
router.put("/:cartId", async (req, res) => {
    const cart_id = req.params.cartId; 
    const { grandtotal, itemtotal, customer_id, product_id } = req.body;

    try {
        const [updatedRows] = await Cart.update(
            {
                grandtotal,
                itemtotal,
                customer_id,
                product_id
            },
            {
                where: { cart_id }
            }
        );

        if (updatedRows) {
            return res.status(200).json({ message: "Kart başarıyla güncellendi." });
        } else {
            return res.status(404).json({ message: "Böyle bir Kart bulunamadı." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", details: error.message });
    }
});


module.exports=router;
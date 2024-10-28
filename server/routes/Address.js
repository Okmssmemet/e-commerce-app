const express = require("express");
const router = express.Router();

const Address = require("../models/address");

router.get("/", async (req, res) => {
    try {
        const address = await Address.findAll();
        if (address) {
            return res.status(200).json(address); 
        }
        else{
            return res.status(404).json("Herhangi Bir Adres Kaydı Bulunamadı")
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu." ,stack: error.stack});
    }
});

router.get("/:addressId", async (req, res) => {
    const address_id = req.params.addressId; 
    try {
        const address = await Address.findByPk(address_id);
        if (address) {
            return res.status(200).json(address);
        } else {
            return res.status(404).json("Böyle Bir Adres Bulunamadı");
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
        const address = await Address.findAll({
            where:{
                customer_id:userId
            }
        })
        if (address.length > 0) {
            return res.status(200).json(address)
        } else {
            return res.status(404).json("Kullanıcı Bir Adres Belirtmemiş")
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
})

router.post("/",async (req,res)=>{
    const apart_no = req.body.apart_no;
    const apart_name = req.body.apart_name;
    const streetname = req.body.streetname;
    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const customer_id = req.body.customer_id;
    try {
        const createdAddress = await Address.create({
            apart_no,
            apart_name,
            streetname,
            state,
            city,
            pincode,
            customer_id
        });
        
        return res.status(201).json({ createdAddress }); 
    } catch (error) {
        console.error("Hata:", error);
        return res.status(500).json({ error: "Adres oluşturulurken bir hata oluştu." , stack : error.stack}); 
    }
});

router.delete("/:addressId",async (req,res) => {
    const address_id = req.params.addressId; 
    try {
        const deletedAddress = await Address.destroy({
            where:{
                address_id: address_id
            }
        });
        if (deletedAddress) {
            return res.status(200).json("Adres Başarılı Bir Şekilde Silindi")
        }
        else{
            return res.status(404).json("Böyle Bir Adres Bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir Hata Oluştu", stack: error.stack });
    }
})
router.put("/:addressId", async (req, res) => {
    const address_id = req.params.addressId; 
    const { apart_no, apart_name, streetname, state, city, customer_id } = req.body;

    try {
        const [updatedRows] = await Address.update(
            {
                apart_no,
                apart_name,
                streetname,
                state,
                city,
                pincode,
                customer_id
            },
            {
                where: { address_id }
            }
        );

        if (updatedRows) {
            return res.status(200).json({ message: "Adres başarıyla güncellendi." });
        } else {
            return res.status(404).json({ message: "Böyle bir Adres bulunamadı." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", details: error.message });
    }
});


module.exports=router;
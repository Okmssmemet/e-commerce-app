const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");

router.get("/", async (req, res) => {
    try {
        const customers = await Customer.findAll();
        return res.status(200).json(customers); 
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu." });
    }
});

router.get("/:customerId", async (req, res) => {
    const customer_id = req.params.customerId; 
    try {
        const customer = await Customer.findByPk(customer_id);
        if (customer) {
            return res.status(200).json(customer);
        } else {
            return res.status(404).json("Böyle Bir Kullanıcı Bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir Hata Oluştu", stack: error.stack }); 
    }
});

router.post("/",async (req,res)=>{
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const dateofbirth = req.body.dateofbirth;
    const phone = req.body.phone;
    const age = req.body.age;
    try {
        const createdUser = await Customer.create({
            firstname,
            middlename,
            lastname,
            email,
            dateofbirth,
            phone,
            age
        });
        
        return res.status(201).json({ createdUser }); 
    } catch (error) {
        console.error("Hata:", error);
        return res.status(500).json({ error: "Kullanıcı oluşturulurken bir hata oluştu." }); 
    }
});

router.delete("/:customerId",async (req,res) => {
    const customer_id = req.params.customerId; 
    try {
        const deletedCustomer = await Customer.destroy({
            where:{
                customer_id: customer_id
            }
        });
        if (deletedCustomer) {
            return res.status(200).json("Kullanıcı Başarılı Bir Şekilde Silindi")
        }
        else{
            return res.status(404).json("Böyle Bir Kullanıcı Bulunamadı");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir Hata Oluştu", stack: error.stack });
    }
})
router.put("/:customerId", async (req, res) => {
    const customer_id = req.params.customerId; 
    const { firstname, middlename, lastname, email, dateofbirth, phone, age } = req.body;

    try {
        const [updatedRows] = await Customer.update(
            {
                firstname,
                middlename,
                lastname,
                email,
                dateofbirth,
                phone,
                age
            },
            {
                where: { customer_id }
            }
        );

        if (updatedRows) {
            return res.status(200).json({ message: "Kullanıcı başarıyla güncellendi." });
        } else {
            return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", details: error.message });
    }
});


module.exports=router;
const express = require("express");
const router = express.Router();
const {findAllData,findAllDataById,insertData,deleteData,updateData,} = require("../utils/dataHelpers");

const Address = require("../models/address");

router.get("/", async (req, res) => {
  await findAllData(Address, res, "Adres Bulunamadı");
});

router.get("/:addressId", async (req, res) => {
  const address_id = req.params.addressId;
  await findAllDataById(Address,res,address_id,"Böyle Bir  Adres Bilgisi Bulunamadı");
});

router.get("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const address = await Address.findAll({
      where: {
        customer_id: userId,
      },
    });
    if (address.length > 0) {
      return res.status(200).json(address);
    } else {
      return res.status(404).json("Kullanıcı Bir Adres Belirtmemiş");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Bir hata oluştu.", stack: error.stack });
  }
});

router.post("/", async (req, res) => {
  await insertData(Address, req.body, res);
});

router.delete("/:addressId", async (req, res) => {
  const address_id = req.params.addressId;
  await deleteData(Address, res, address_id, "address_id");
});

router.put("/:addressId", async (req, res) => {
  const address_id = req.params.addressId;
  await updateData(Address, address_id, req.body, res, "address_id");
});

module.exports = router;

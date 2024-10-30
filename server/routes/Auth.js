const express = require('express');
const bcrypt = require('bcrypt');
const  Customer = require('../models/customer');
const  Seller = require('../models/seller');
const { generateToken } = require('../utils/authHelpers');

const router = express.Router();

// Müşteri kaydı
router.post('/register/customer', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const customer = await Customer.create({ firstname, lastname, email, password });
        const token = generateToken(customer);
        res.status(201).json({ token, message: 'Kayıt başarılı' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Kayıt başarısız', error });
    }
});

// Satıcı kaydı
router.post('/register/seller', async (req, res) => {
    try {
        const { seller_name, email, password } = req.body;
        const seller = await Seller.create({ seller_name, email, password });
        const token = generateToken(seller);
        res.status(201).json({ token, message: 'Kayıt başarılı' });
    } catch (error) {
        res.status(500).json({ message: 'Kayıt başarısız', error });
    }
});

// Giriş işlemi
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    const model = role === 'customer' ? Customer : Seller;

    try {
        const user = await model.findOne({ where: { email } });
        if (!user) {
            console.log('Kullanıcı bulunamadı');
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Şifre karşılaştırma öncesinde log ekleyelim
        console.log(`Veritabanındaki şifre: ${user.password}`);
        console.log(`Girilen şifre: ${password}`);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Geçersiz şifre');
            return res.status(401).json({ message: 'Geçersiz şifre' });
        }

        const token = generateToken(user);
        res.json({ token, message: 'Giriş başarılı' });
    } catch (error) {
        console.log('Hata:', error);
        res.status(500).json({ message: 'Giriş başarısız', error });
    }
});


module.exports = router;

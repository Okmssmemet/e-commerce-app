const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories.length > 0) {
            return res.status(200).json(categories);
        } else {
            return res.status(404).json("Herhangi bir kategori bulunamadı.");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
});

router.get("/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findByPk(categoryId);
        if (category) {
            return res.status(200).json(category);
        } else {
            return res.status(404).json("Böyle bir kategori bulunamadı.");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
});

router.post("/", async (req, res) => {
    const { category_name, description } = req.body;
    try {
        const createdCategory = await Category.create({ category_name, description });
        return res.status(201).json({ createdCategory });
    } catch (error) {
        return res.status(500).json({ error: "Kategori oluşturulurken bir hata oluştu.", stack: error.stack });
    }
});

router.put("/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;
    const { category_name, description } = req.body;
    try {
        const [updatedRows] = await Category.update({ category_name, description }, { where: { category_id: categoryId } });
        if (updatedRows) {
            return res.status(200).json({ message: "Kategori başarıyla güncellendi." });
        } else {
            return res.status(404).json("Böyle bir kategori bulunamadı.");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
});

router.delete("/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const deletedCategory = await Category.destroy({ where: { category_id: categoryId } });
        if (deletedCategory) {
            return res.status(200).json("Kategori başarıyla silindi.");
        } else {
            return res.status(404).json("Böyle bir kategori bulunamadı.");
        }
    } catch (error) {
        return res.status(500).json({ error: "Bir hata oluştu.", stack: error.stack });
    }
});

module.exports = router;

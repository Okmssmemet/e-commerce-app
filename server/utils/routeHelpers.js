const express = require("express");
const { findAllData, insertData, findAllDataById, deleteData } = require("./dataHelpers");

const createRoutes = (model,modelName,idField="id") =>{
    const router = express.Router();

    router.get("/",async (req,res) => {
        await findAllData(model,res,`Herhangi bir ${modelName} Bulunamadı`)
    })

    router.get("/:id",async (req,res) => {
        const id = req.params.id;
        await findAllDataById(model,res,id,`Böyle Bir ${modelName} Bulunamadı`)
    })
    
    router.post("/",async (req,res) => {
        await insertData(model,req.body,res)
    })

    router.delete("/:id",async (req,res) => {
        const id = req.params.id;
        await deleteData(model,res,id,idField,`Böyle Bir ${modelName} Bulunamadı`)
    })

    router.put("/:id", async (req, res) => {
        const id = req.params.id;
        await updateData(model, id, req.body, res, idField ,`Böyle Bir ${modelName} Bulunamadı`);
    });

    return router;
    
}

module.exports = createRoutes;
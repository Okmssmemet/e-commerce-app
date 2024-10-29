const handleError = require("./errorHelpers")


const findAllData = async (Model,res,notResultMessage ="Kayıt Bulunamadı") => {
    try {
        const data = await Model.findAll();
        if (data && data.length > 0) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({message : notResultMessage})
        }
    } catch (error) {
        handleError(res, error, notResultMessage)
    }
};

const findAllDataById = async (Model,res,id,notResultMessage ="Kayıt Bulunamadı") =>{
    try {
      const data = await Model.findByPk(id);
      if (data) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ message: notResultMessage });
      }
    } catch (error) {
        handleError(res, error, notResultMessage)
    }
}

const insertData = async(Model,data,res) =>{
    try {
        const createData = await Model.create(data);
        return res.status(201).json({ createData });
    } catch (error) {
        handleError(res, error, notResultMessage)
    }
}

const deleteData = async (Model,res,id,idField ="id",notResultMessage="Kayıt Bulunamadı") => {
    try {
        const deletedData = await Model.destroy({
            where:{
                [idField] : id
            }
        });
        if (deletedData) {
            return res.status(200).json("Kayıt Başarı İle Silindi")
        } else {
            return res.status(404).json("Böyle Bir Kayıt Bulunamadı");
        }
    } catch (error) {
        handleError(res, error, notResultMessage)
    }
}

const updateData = async (Model, id, data, res,idField ="id", notResultMessage = "Kayıt Bulunamadı") => {
    try {
        const [updatedRows] = await Model.update(data, {
            where: {
                [idField] : id
            }
        });

        if (updatedRows) {
            return res.status(200).json({ message: "Kayıt Başarıyla Güncellendi." });
        } else {
            return res.status(404).json({ message: notResultMessage });
        }
    } catch (error) {
        handleError(res, error, notResultMessage);
    }
};



module.exports = { findAllData , findAllDataById ,insertData,deleteData , updateData };
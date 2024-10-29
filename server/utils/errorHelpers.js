const handleError = (res, error, customMessage) => {
    console.error("Hata:", error);
    return res.status(500).json({ error: customMessage || "Bir hata oluştu.", details: error.message });
};

module.exports = handleError;
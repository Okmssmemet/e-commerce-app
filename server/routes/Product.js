const Product = require('../models/product');
const createRoutes = require("../utils/routeHelpers");
const router = createRoutes(Product,"Ürün","product_id");
module.exports = router;

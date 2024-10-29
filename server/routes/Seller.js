const Seller = require('../models/seller');
const createRoutes = require("../utils/routeHelpers");
const router = createRoutes(Seller,"Satıcı","seller_id");
module.exports = router;

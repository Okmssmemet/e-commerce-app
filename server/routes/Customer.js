const Customer = require("../models/customer");
const createRoutes = require("../utils/routeHelpers");
const router = createRoutes(Customer,"Kullanıcı","customer_id");
module.exports=router;
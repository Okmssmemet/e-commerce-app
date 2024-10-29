
const Address = require("../models/address");

const createRoutes = require("../utils/routeHelpers");
const router = createRoutes(Address,"Adres","address_id");

module.exports = router;

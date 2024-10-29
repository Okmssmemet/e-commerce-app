const Category = require("../models/category");
const createRoutes = require("../utils/routeHelpers")
const router = createRoutes(Category,"Kategori","category_id");
module.exports = router;

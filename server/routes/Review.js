const Review = require('../models/review');
const createRoutes = require("../utils/routeHelpers");
const router = createRoutes(Review,"Değerlendirme","review_id");
module.exports = router;

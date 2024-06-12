const router = require('express').Router();
const multer = require('multer');
const upload = multer({
	limits: { fieldSize: 25 * 1024 * 1024 }
})
const authController = require('../controllers/auth.controller')
const offersController = require('../controllers/offer.controller')
const categoryController = require('../controllers/category.controller')
const basketController = require('../controllers/basket.controller')
const orderController = require('../controllers/order.controller')
const chestController = require('../controllers/chest.controller')
const promotionController = require('../controllers/promotion.controller')
const statisticsController = require('../controllers/statistics.controller')
const customerController = require('../controllers/customer.controller')
const deliveryController = require('../controllers/delivery.controller')
const observeController = require('../controllers/observe.controller')
const variantController = require('../controllers/variant.controller')
const relateController = require('../controllers/relate.controller');
const parameterController = require('../controllers/parameter.controller')
const csvController = require('../controllers/csv.controller');
const xmlController = require('../controllers/xml.controller')
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/offer/create', upload.any(), adminMiddleware, offersController.createOffer)
router.post('/offer/delete', adminMiddleware, offersController.deleteOffer)
router.post('/offer/update', upload.any(), adminMiddleware, offersController.updateOffer)

router.post('/chest/create', adminMiddleware, chestController.createChest)
router.post('/chest/open', authMiddleware, chestController.chestOpen)


router.post('/promotions/user/get', authMiddleware, promotionController.getUserPromotion)

router.post('/observe/count', authMiddleware, observeController.getObserveCount)

router.post('/variant/create', adminMiddleware, variantController.createVariant)

router.post('/relate/create', adminMiddleware, relateController.createRelate)
router.get('/relates/get', adminMiddleware, relateController.getRelates)

router.post('/parameter/create', adminMiddleware, parameterController.createParameter);

router.post('/import-csv', upload.single('file'), adminMiddleware, csvController.importCSV)

router.post('/import-xml', upload.single('file'), adminMiddleware, xmlController.importXML)

// router.post('/categories', authMiddleware, (req, res) => {
//     router.post('/create', categoryController.createCategory);
//     router.delete('/delete/:id', categoryController.deleteCategory);
//     router.patch('/edit', categoryController.editCategory);
// })

module.exports = router
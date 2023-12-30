const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const authController = require('../controllers/auth.controller')
const offersController = require('../controllers/offer.controller')
const categoryController = require('../controllers/category.controller')
const basketController = require('../controllers/basket.controller')
const orderController = require('../controllers/order.controller')
const chestController = require('../controllers/chest.controller')
const promotionController = require('../controllers/promotion.controller')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register)
router.get('/email-verify/:token', authController.verifyEmail)
router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/check-login', authController.checkLogin)
// router.post('/change-password', authController.changePassword)

router.post('/password-change', authMiddleware, authController.changePassword);
// router.post('/password-restart', authMiddleware, authController.restartPassword);

router.post('/basket/create', authMiddleware, basketController.basketCreate)
router.post('/basket/add', authMiddleware, basketController.basketAdd)
router.post('/basket/delete', authMiddleware, basketController.basketDelete)
router.post('/basket/modify', authMiddleware, basketController.basketModify)
router.post('/basket/get', authMiddleware, basketController.basketGet)


router.post('/offer/create', upload.any(), offersController.createOffer)
router.get('/offers/get', offersController.getOffers)
router.get('/offer/get/:id', offersController.getOffer)
router.post('/offer/images', offersController.getOfferImages)

router.post('/order/create', authMiddleware,  orderController.createOrder)
router.post('/orders/user/get', authMiddleware,  orderController.getAllUserOrders)


router.post('/category/create', categoryController.categoryCreate)
router.get('/categories/get', categoryController.getCategories)

router.post('/chest/create', chestController.createChest)
router.get('/chests/get', chestController.getChests)
router.get('/chest/get/:id', chestController.getChest)
router.post('/chest/add-item', chestController.chestAddItem)
router.post('/chest/open', authMiddleware, chestController.chestOpen)


router.post('/promotion/create', promotionController.createPromotion)

// router.post('/categories', authMiddleware, (req, res) => {
//     router.post('/create', categoryController.createCategory);
//     router.delete('/delete/:id', categoryController.deleteCategory);
//     router.patch('/edit', categoryController.editCategory);
// })

module.exports = router
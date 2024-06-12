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
const authMiddleware = require('../middleware/authMiddleware');
const billingController = require('../controllers/billing.controller')

router.post('/register', authController.register)
router.post('/email-verify', authController.verifyEmail)
router.post('/resend-code', authController.resendVerifyCode)
router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/check-login', authController.checkLogin)
router.post('/user-logout', authController.logout)
router.post('/login/google', authController.loginByGoogle)
router.post('/forgot', authController.forgot)
router.post('/forgot/verify', authController.forgotVerify)
// router.post('/change-password', authController.changePassword)

router.post('/password-change', authMiddleware, authController.changePassword);
// router.post('/password-restart', authMiddleware, authController.restartPassword);

router.post('/basket/create', basketController.basketCreate)
router.post('/basket/add', basketController.basketAdd)
router.delete('/basket/delete', authMiddleware, basketController.basketDelete)
router.post('/basket/modify', basketController.basketModify)
router.post('/basket/get', basketController.basketGet)


router.get('/offers/get', offersController.getOffers)
router.get('/offer/get/:id', offersController.getOffer)
router.post('/offer/images', offersController.getOfferImages)
router.post('/offer/images', offersController.getOfferImages)

router.post('/order/create', authMiddleware,  orderController.createOrder)
router.post('/orders/user/get', authMiddleware,  orderController.getAllUserOrders)


router.post('/category/create', categoryController.categoryCreate)
router.get('/categories/get', categoryController.getCategories);
router.post('/category/get', categoryController.getCategory)

router.get('/chests/get', chestController.getChests)
router.get('/chest/get/:id', chestController.getChest)
router.post('/chest/add-item', chestController.chestAddItem)
router.post('/chest/open', authMiddleware, chestController.chestOpen)


router.post('/promotion/create', promotionController.createPromotion)
router.get('/promotions/get', promotionController.getAllPromotion)
router.post('/promotions/user/get', authMiddleware, promotionController.getUserPromotion)
router.post('/promotion/get/offerID', promotionController.getPromotionByOfferID)
// router.post('/promotion/get/promotionID', promotionController.getPromotionByID)


router.get('/statistics/get', statisticsController.getStatisticsNumber)

router.post('/customer/create', authMiddleware, customerController.createCustomer)
router.post('/customer/get', authMiddleware, customerController.getCustomer)
router.post('/customer/modify', authMiddleware, customerController.modifyCustomer)

router.get('/delivery/get', authMiddleware, deliveryController.deliveryGet)
router.post('/delivery/create', authMiddleware, deliveryController.deliveryCreate)

router.post('/observe/change', authMiddleware, observeController.changeObserve)
router.post('/observe/get', authMiddleware, observeController.getObserve)
router.post('/observe/count', authMiddleware, observeController.getObserveCount)

router.post('/billing/create', authMiddleware, billingController.createBilling)
router.get('/billing/get', authMiddleware, billingController.getBilling)
router.get('/billings/get', authMiddleware, billingController.getBillings)
router.post('/billing/edit', authMiddleware, billingController.editBilling)
router.post('/billing/delete', authMiddleware, billingController.deleteBilling)

// router.post('/categories', authMiddleware, (req, res) => {
//     router.post('/create', categoryController.createCategory);
//     router.delete('/delete/:id', categoryController.deleteCategory);
//     router.patch('/edit', categoryController.editCategory);
// })

module.exports = router
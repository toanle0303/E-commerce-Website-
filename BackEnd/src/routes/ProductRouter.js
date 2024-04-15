const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.get('/get-details-pro/:id', ProductController.getDetailsProduct)
router.delete('/delete-product/:id', authMiddleWare, ProductController.deleteProduct)
router.get('/get-all-pro', ProductController.getAllProduct)
router.post('/delete-many-pro', authMiddleWare, ProductController.deleteMany)
router.get('/get-all-type', ProductController.getAllType)

module.exports = router
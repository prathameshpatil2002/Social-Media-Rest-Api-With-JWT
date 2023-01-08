const express = require('express');
const postController = require('../controller/postController');
const authController = require('../controller/authController');

const router = express.Router();

router.get('/',authController.protect, postController.getAllPostByUser);

module.exports = router;

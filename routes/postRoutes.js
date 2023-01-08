const express = require('express');
const postController = require('../controller/postController');
const authController = require('../controller/authController');

const router = express.Router();
router.get('/:id', postController.getPost);

router.post('/', authController.protect, postController.createNewPost);
router.delete('/:id', authController.protect, postController.deletePost);

router.patch('/like/:id', authController.protect, postController.likePost);
router.patch('/unlike/:id', authController.protect, postController.unlikePost);
router.patch('/comment/:id', authController.protect, postController.addcomment);




module.exports = router;
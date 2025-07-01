const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/cards/:cardId/comments', commentController.getCommentsForCard);
router.post('/cards/:cardId/comments', commentController.createNewComment);

module.exports = router;
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/boards/:id/cards', cardController.getCardsForBoard);
router.post('/boards/:id/cards', cardController.createNewCard);
router.patch('/cards/:id', cardController.upVote);
router.delete('/cards/:id', cardController.deleteCard);

module.exports = router;
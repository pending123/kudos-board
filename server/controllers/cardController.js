const prisma = require('../models/prismaClient');

//Get all cards for a specific board
exports.getCardsForBoard = async (req, res) => {
    const boardId = Number(req.params.id);
    try {
        const cards = await prisma.card.findMany({
            where: {boardId},
        });
        res.status(200).json(cards);
    } catch (err) {
        res.status(404).json({error: 'Failed to get cards for board'});
    }
}

//Create new card
exports.createNewCard = async (req, res) => {
    const boardId = Number(req.params.id);
    const {title, cardDescription, gifUrl, owner} = req.body;
    try {
        const newCard = await prisma.card.create({
            data: {title, cardDescription, gifUrl, owner, boardId},
        });
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({error: 'Failed to create card for board'})
    }
}

//Upvote card
exports.upVote = async (req, res) => {
    const cardId = Number(req.params.id);
    try {
        const updatedCard = await prisma.card.update({
            where: {cardId},
            data: {
                voteCount: {
                    increment: 1,
                },
            },
        });
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(400).json({error: 'Failed to upvote card'});
    }
}

//Delete card
exports.deleteCard = async (req, res) => {
    const cardId = Number(req.params.id);
    try {
        await prisma.card.delete({where: {cardId}});
        res.status(204).end();
    } catch (err) {
        res.status(400).json({error: 'Failed to delete card'});
    }
}
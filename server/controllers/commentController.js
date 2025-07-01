const prisma = require('../models/prismaClient');

exports.getCommentsForCard = async (req, res) => {
    const cardId = Number(req.params.cardId);
    try {
        const comments = await prisma.comment.findMany({
            where: { cardId },
        })
        res.status(200).json(comments);
    }
    catch (err) {
        console.error('Error fetching comments:', err);
        res.status(404).json({ error: 'Failed to get comments'});
    
    }
};

exports.createNewComment = async (req, res) => {
    const cardId = Number(req.params.cardId);
    const { message, author } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Message is required'});
    }
    try {
        const newComment = await prisma.comment.create({
            data: {
                message: message.trim(),
                author: author || null, 
                cardId
            },
        });
        res.status(201).json(newComment);
    }
    catch (err) {
        console.error('Error creating comment:', err);
        res.status(400).json({error: 'Failed to create comment'});
    }
};
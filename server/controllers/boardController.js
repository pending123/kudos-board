const prisma =require("../models/prismaClient")

//getAllFunction that gets all boards in DB 
const getAllBoards = async (req,res) =>{
    try{
        const boards = await prisma.board.findMany();
        res.json(boards);
    }catch(error){
        console.error("Error Fetching boards: ", error)
    }
}

//getByID returns board based off of id query
const getBoardById = async (req,res) => {
    const {id} = req.params;
    try{
        const board = await prisma.board.findUnique({
            where:{boardId: parseInt(id)}
        })
        res.json(board)
    }catch(error){
        console.error("Error getting board: ", error)
    }
}

//Adds new board 
const addNewBoard =async (req,res) => {
    const{title, category, author, img}=req.body
    try{
        const newBoard =await prisma.board.create({
            data: {
                title,
                category,
                author,
                img
            }
        })
        res.json(newBoard)
    }catch(error){
        console.error("Could not add new board: ", error)
    }
}
//Pin board
const pinBoard = async (req, res) => {
    const boardId = Number(req.params.id);
    const board = await prisma.board.findUnique({where: {boardId}});
    if (!board) {
        return res.status(404).json({error: 'Board not found'});
    }

    const isPinning = !board.pinned;

    try {
        const updatedBoard = await prisma.board.update({
            where: {boardId},
            data: {
                pinned: isPinning,
                pinnedAt: isPinning ? new Date() : null
            },
        });
        res.status(200).json(updatedBoard);
    } catch (err) {
        res.status(400).json({error: 'Failed to pin or unpin board'});
    }
}

//Deletes Board
const deleteBoard = async (req,res) => {
    const {id} = req.params;
    try{
        const deletedBoard = await prisma.board.delete({
            where: {boardId :parseInt(id)}
        })
        res.json(deletedBoard)
    }catch(error){
        console.error("Couldn't Delete Board: ", error)
    }
}

module.exports ={
    getAllBoards,
    getBoardById,
    addNewBoard,
    deleteBoard,
    pinBoard
}
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
    deleteBoard
}
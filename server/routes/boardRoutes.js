const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController")

router.get("/", boardController.getAllBoards)
router.get("/:id", boardController.getBoardById)
router.post("/", boardController.addNewBoard)
//Possibly add an update board option as stretch
router.delete("/:id", boardController.deleteBoard)

module.exports = router
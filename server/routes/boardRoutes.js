const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController")

router.get("/", boardController.getAllBoards)
router.get("/:id", boardController.getBoardById)
router.post("/", boardController.addNewBoard)
router.patch("/:id", boardController.pinBoard)
router.delete("/:id", boardController.deleteBoard)

module.exports = router
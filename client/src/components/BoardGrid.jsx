import { useState } from "react"
import Board from "./Board"
import CreateBoardModal from "./CreateBoardModal";


export default function BoardGrid({boards, fetchBoards}) {    
    const [showCardModal, setShowCardModal] = useState(false);

    function handleClick() {
        setShowCardModal(true);
    }

    function handleClose() {
        setShowCardModal(false);
    }

    return (
        <>
        <div className="flex flex-col mt-12">
        <button onClick={handleClick} className="rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold cursor-pointer mt-3 w-fit p-2.5 self-center">Create New Board</button>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] gap-6 mt-16 mb-22 justify-center">
         {boards.map((board) => (
            <Board 
                key={board.boardId}
                title={board.title}
                category={board.category}
                author={board.author}
                image={board.img}
                boardId={board.boardId}
                fetchBoards={fetchBoards}
            />
         ))}
        </div>
        </div>

        {showCardModal && (<CreateBoardModal handleClose={handleClose} fetchBoards={fetchBoards}/>)}
        </>
    )
}
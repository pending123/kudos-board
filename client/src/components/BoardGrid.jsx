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
        <div className="flex flex-col mt-12 ">
        <button onClick={handleClick} className="rounded-lg bg-gray-600 hover:bg-gray-700 text-gray-50 text-xl font-bold cursor-pointer w-fit p-2.5 self-center">Create New Board</button>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,26px))] gap-4 mt-10 mb-58 ml-10 mr-10">
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
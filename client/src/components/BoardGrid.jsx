import { useState } from "react"
import Board from "./Board"
import CreateBoardModal from "./CreateBoardModal";


export default function BoardGrid({boards}) {    
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
        <button onClick={handleClick} className="cursor-pointer text-2xl mt-8 border border-black w-fit p-1 self-center">Create a New Board</button>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8 p-8 m-6">
         {boards.map((board) => (
            <Board 
                key={board.boardId}
                title={board.title}
                category={board.category}
                author={board.author}
                image={board.img}
                boardId={board.boardId}
            />
         ))}
        </div>
        </div>

        {showCardModal && (<CreateBoardModal handleClose={handleClose}/>)}
        </>
    )
}
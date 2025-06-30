import Board from "./Board"

export default function BoardGrid({boards}) {    
    
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8 p-8 m-8">
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
    )
}
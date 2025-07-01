import axios from "axios";

export default function Board({boardId, title, category, author, image, fetchBoards}) {    
    async function deleteBoard() {
        try {
            await axios.delete(`http://localhost:3000/boards/${boardId}`)
            await fetchBoards();
        } catch (err) {
            console.log("Failed to delete board", err);
        }
    }
    return (
        <>
        <div className="flex flex-col items-center border border-black rounded-2xl pb-4">
            <img className="aspect-[10/11] rounded-2xl" src={image} />
            <h1 className="text-4xl mt-3">{title}</h1> 
            <p className="text-2xl">{category}</p>
            <div className="flex justify-around w-full mt-3">
                <button className="text-2xl border border-black p-2 cursor-pointer">View Board</button>
                <button onClick={deleteBoard} className="text-2xl border border-black p-2 cursor-pointer">Delete Board</button>
            </div>
        </div>
        </>
    )
}
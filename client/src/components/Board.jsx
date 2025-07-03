import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"


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
        <div className="flex flex-col shadow-sm rounded-lg pb-4">
            {/*Image wrapper with overlay */}
            <div className="relative group overflow-hidden rounded-lg cursor-pointer">
                <img className="aspect-[2/3] rounded-lg object-cover" src={image} />

                {/*Dark overlay*/}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50"> </div>
            
                {/*Centered text*/}
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100">
                     <Link to={`boards/${boardId}`} className="text-white text-lg font-semibold" > View Board </Link>
                </div>

                <div className="justify-end mt-auto mb-2 flex h-fit w-full pr-1 absolute inset-0 opacity-0 group-hover:opacity-100">
                    <button onClick={deleteBoard} className="bg-white rounded-lg mr-0.5 text-lg p-1.5 px-2.5 cursor-pointer">
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
            <h1 className="text-lg ml-2 mt-2">{title}</h1> 
            <p className="text-sm ml-2">{category}</p>
            
        </div>
        </>
    )
}
import axios from "axios";
import { useState } from "react";
import BoardImageGrid from "./BoardImageGrid";

export default function CreateBoardModal({handleClose, fetchBoards}) {

    const [Image, setImage] = useState('');
    const [imageResults, setImageResults] = useState([]);
    const [showImages, setShowImages] = useState(false);


    const accessKey = import.meta.env.VITE_IMAGE_API_KEY;

    async function CreateBoard(formData) {
        const title = formData.get("title");
        const category = formData.get("category");
        const author = formData.get("author");
        setImage(formData.get("image"));
        const boardData = {
            title: title,
            category: category,
            author: author || "Anonymous",
            img: Image
        };

        try {
            await axios.post("http://localhost:3000/boards", boardData);
            await fetchBoards();
            handleClose();
        } catch (err) {
            console.error("Failed to create board", err);
        }
    }

    async function handleImageSearch(e) {
        e.preventDefault();
        const input = document.querySelector("input[name='image']");
        const searchTerm = input.value;

        const {data} = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {query: searchTerm},
            headers: {Authorization: `Client-ID ${accessKey}`}
        });
        setImageResults(data.results);
        setShowImages(true);
    }

    function handleImageSelect(imgURL) 
    {
        setImage(imgURL);
        setShowImages(false);
    }

    return (
        <div className="fixed inset-0 bg-black/15 z-50 flex items-center justify-center" onClick={handleClose}>
            <div 
                className="bg-gray-50 shadow-xl p-6 rounded-xl w-5/12 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-xl font-bold mb-4">Create a New Board</h1>
                <form action={CreateBoard} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input name="title" type="text" placeholder="Enter board title..."className="border border-black-300 p-1 pl-2 rounded-lg" required/>
                    <label className="text-sm font-medium mt-2 text-gray-700">Image</label>
                    <div className="flex gap-3 items-center rounded-lg">
                        <input name="image" placeholder="Search for image" type="text" className="border border-black p-1 pl-2 w-11/12 rounded-lg" autoComplete="off" required/>
                        <button onClick={handleImageSearch} className=" bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">Search</button>
                    </div>
                    {showImages && <BoardImageGrid images={imageResults} handleImageSelect={handleImageSelect}/>}
                    <label className="text-sm font-medium mt-2 text-gray-700">Category</label>
                    <select name="category" className="text-gray-700 border border-black-300 p-1 rounded-lg mt-1" required>
                        <option value="" disabled selected>Select a category</option>
                        <option>Celebration</option>
                        <option>Thank You</option>
                        <option>Inspiration</option>
                    </select>
                    <label className="text-sm font-medium mt-2 text-gray-700">Author</label>
                    <input placeholder="Optional" name="author" type="text" className="border border-black-300 text-1xl p-1 pl-2 rounded-lg"></input>
                    <div className="flex gap-4 items-center mt-3 ml-auto">
                        <button type="button" className="rounded-lg bg-gray-200 hover:bg-gray-300 py-2 px-4 w-fit self-center text-lg text-center cursor-pointer" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="rounded-lg text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 w-fit self-center text-lg cursor-pointer">Create Board</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
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
        <div className="fixed inset-0 bg-black/15 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-150 overflow-auto">
                <button className="text-3xl mb-4 text-center cursor-pointer" onClick={handleClose}>&times;</button>
                <h1 className="text-xl font-bold mb-4">Create a New Board</h1>
                <form action={CreateBoard} className="flex flex-col gap-2">
                    <label className="text-lg">Title</label>
                    <input name="title" type="text" className="border border-black-300 p-1 pl-2 rounded-xl" required/>
                    <label className="text-lg mt-2">Image</label>
                    <div className="flex gap-20 border border-black items-center rounded-xl">
                        <input name="image" placeholder="Search for image" type="text" className="p-1 pl-2 w-9/12 focus:outline-none" required/>
                        <button onClick={handleImageSearch} className="border-l border-black-500 p-1.5 w-text-lg rounded-xl">Search</button>
                    </div>
                    {showImages && <BoardImageGrid images={imageResults} handleImageSelect={handleImageSelect}/>}
                    <label className="text-lg mt-2">Category</label>
                    <select name="category" className="border border-black-300 p-1 rounded-xl mt-1" required>
                        <option value="" disabled selected>Select a category</option>
                        <option>Celebration</option>
                        <option>Thank You</option>
                        <option>Inspiration</option>
                    </select>
                    <label className="text-lg mt-2">Author</label>
                    <input placeholder="Optional" name="author" type="text" className="border border-black-300 text-1xl p-1 pl-2 rounded-xl"></input>
                    <button className="border border-black-500 mt-4 p-1 w-fit self-center text-lg cursor-pointer">Create Board</button>
                </form>
            </div>
        </div>
    )
}
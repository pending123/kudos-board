import {useState, useEffect} from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid"

export default function Home() {
    const [boards, setBoards] = useState([]);

    const fetchBoards = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/boards");
            setBoards(data);
        } catch (err) {
            console.log("Error fetching boards:", err);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);
    
    return (
        <>
         <BoardGrid boards={boards} fetchBoards={fetchBoards}/>
        </>
    )
}
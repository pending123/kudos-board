import {useState, useEffect} from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid"

export default function Home() {
    const [boards, setBoards] = useState([]);


    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/boards");
                setBoards(data);
            } catch (err) {
                console.log("Error fetching boards:", err);
            }
        };

        fetchBoards();
    }, []);
    
    return (
        <>
         <BoardGrid boards={boards}/>
        </>
    )
}
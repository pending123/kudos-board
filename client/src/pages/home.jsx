import {useState, useEffect} from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid"
import SubNavbar from "../components/subNavbar";

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
        <div className="navBar">
        <SubNavbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchInputValue={searchInputValue}
        handleOnSearchInputChange={handleOnSearchInputChange}
        handleSearchSubmit={handleSearchSubmit}
        handleClearSearch={handleClearSearch}
        />
        <p>Welcome to Home Page!</p>
        </div>
         <BoardGrid boards={boards} fetchBoards={fetchBoards}/>
        </>
    )
}
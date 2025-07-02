import {useState, useEffect} from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid"
import SubNavbar from "../components/subNavbar";

export default function Home({
  activeCategory,
  setActiveCategory,
  searchInputValue,
  handleOnSearchInputChange,
  handleSearchSubmit,
  handleClearSearch,
  submittedSearch
}) {
    const [boards, setBoards] = useState([]);

    const fetchBoards = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/boards");
            const boardsByCategory= 
              activeCategory !== "All" && activeCategory !== "Recent"
              ? data.filter((b) => b.category === activeCategory) 
              : data  
            //checks if it is recent
            const boardsRecent =
              activeCategory === "Recent"
              ?[...boardsByCategory].sort((boardA, boardB) => {
                const dateA = new Date(boardA.createdAt);
                const dateB = new Date(boardB.createdAt);
                return dateB.getTime() - dateA.getTime();
                })
              : 
                boardsByCategory;
            const searchTerm = searchInputValue.trim().toLowerCase();
            console.log(searchInputValue)
            const boardsShown = Boolean(searchTerm) 
            ? boardsRecent.filter((b) => b.title.toLowerCase().includes(searchTerm) )
            : boardsRecent

            setBoards(boardsShown);
        } catch (err) {
            console.log("Error fetching boards:", err);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [setBoards, activeCategory, submittedSearch]);
    
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
        </div>
         <BoardGrid boards={boards} fetchBoards={fetchBoards}/>
        </>
    )
}
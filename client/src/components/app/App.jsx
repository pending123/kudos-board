import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import CardPage from "../../pages/cardPage";
import NoMatch from "../../pages/noMatch";
import Header from "../header";
import Footer from "../footer";
import SubNavbar from "../subNavbar";

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [submittedSearch, setSubmittedSearch] =useState("")
  const [boards, setBoards] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };


  const handleClearSearch = () => {
    setSearchInputValue("")
    setSubmittedSearch("")
    console.log("hello")
  };

  const handleSearchSubmit =(query) => {
    setSubmittedSearch(query)
  }
  



  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                setSearchInputValue={setSearchInputValue}
                boards={boards}
                setBoards={setBoards}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleOnSearchInputChange={handleOnSearchInputChange}
                handleSearchSubmit={handleSearchSubmit} 
                handleClearSearch={handleClearSearch}
              />
            }
          />

          <Route path="/boards/:id" element={<CardPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

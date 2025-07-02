import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from './components/BoardPage/BoardPage';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl">Random</h1>} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
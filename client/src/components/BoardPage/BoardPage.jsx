import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardGrid from "./CardGrid";
import CreateCardModal from "./CreateCardModal";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const BoardPage = () => {
    const { boardId } = useParams();
    const [cards, setCards] = useState([]);
    const [board, setBoard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useScrollToTop();

    useEffect(() => {
        const loadBoardData = async () => {
            if (!boardId) return;

            try {
                setIsLoading(true);
                setError(null);

                // Load board data
                const { data: boardData } = await axios.get(`http://localhost:3000/boards/${boardId}`);
                setBoard(boardData);

                // Load cards for this board
                const { data: cardsData } = await axios.get(`http://localhost:3000/boards/${boardId}/cards`);
                setCards(cardsData);
            }
            catch (err) {
                console.error('Failed to load board data:', err);
                setError('Failed to load board data');
            }
            finally {
                setIsLoading(false);
            }
        };
        loadBoardData();
    }, [boardId]);

    const handleAddCard = async (cardData) => {
        try {
            // Add debugging log
            console.log('Sending card data:', cardData);
            
            const { data: newCard } = await axios.post(`http://localhost:3000/boards/${boardId}/cards`, cardData);

            setCards(prevCards => [newCard, ...prevCards]);
            setShowCreateModal(false);
        }
        catch (err) {
            console.error('Failed to create card: ', err);
            
            // Log the full error response
            if (err.response) {
                console.error('Error response:', err.response.data);
                console.error('Error status:', err.response.status);
            }
            
            setError('Failed to create card');
        }
    };

    const handleUpvoteCard = async (cardId) => {
        try {
            const { data: updatedCard } = await axios.patch(`http://localhost:3000/cards/${cardId}`);

            setCards(prevCards =>
                prevCards.map(card =>
                    card.cardId === cardId ? updatedCard : card
                )
            );
        }
        catch (err) {
            console.error('Failed to upvote card:', err);
            setError('Failed to upvote card');
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await axios.delete(`http://localhost:3000/cards/${cardId}`);

            setCards(prevCards =>
                prevCards.filter(card => card.cardId !== cardId)
            );
        }
        catch (err) {
            console.error('Failed to delete card', err);
            setError('Failed to delete card');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Loading board...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="board-page min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {board?.title || 'Board'}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        {/*board?.category && `Category: ${board.category}`*/}
                    </p>

                    {/* Create Card Button*/}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                        Create New Card
                    </button>
                </div>

                {/* Cards List */}
                <CardGrid 
                    cards={cards}
                    onUpvote={handleUpvoteCard}
                    onDelete={handleDeleteCard}
                />
                
                {/* If no cards */}
                {cards.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">No cards yet. Be the first to add one!</p>
                    </div>
                )}
            </div>

            {/* Create Card Modal */}
            {showCreateModal && (
                <CreateCardModal 
                    onSubmit={handleAddCard}
                    onCancel={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
};

export default BoardPage;
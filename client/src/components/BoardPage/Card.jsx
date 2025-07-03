import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentsModal from "./CommentsModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Card = ({ card, onUpvote, onDelete }) => {
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    // Load comment
    useEffect(() => {
        const loadCommentCount = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/cards/${card.cardId}/comments`);
                setCommentCount(data.length);
            } catch (err) {
                console.error('Failed to load comment count:', err);
                setCommentCount(0);
            }
        };

        loadCommentCount();
    }, [card.cardId]);

    // Updates comment count once modal closes
    const handleCommentsModalClose = () => {
        setShowCommentsModal(false);
        const loadCommentCount = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/cards/${card.cardId}/comments`);
                setCommentCount(data.length);
            } catch (err) {
                console.error('Failed to load comment count:', err);
            }
        };
        loadCommentCount();
    };

    return (
        <>
            <div className="card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-96 flex flex-col">
            
                {/* Card Image */}
                <div className="card-media relative flex-shrink-0">
                    {card.gifUrl ? (
                        <img 
                            src={card.gifUrl} 
                            alt="GIF"
                            className="w-full h-56 object-cover"
                        />
                    ) : (
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No GIF</span>
                        </div>
                    )}
            
                    {/* Delete button */}
                    <button
                        
                        onClick={onDelete}
                        className="absolute top-2 right-2 flex items-center justify-center transition duration-200"
                        title="Delete card"
                    >
                        {/* X used to be here */}
                        <FontAwesomeIcon className="text-white" icon={faCircleXmark} size="2xl" style={{color: "fb2c36",}}/>
                    </button>
                </div>
                
                {/* Card Content */}
                <div className="card-content p-4 flex-grow flex flex-col justify-between">
            
                    {/* Card Details*/}
                    <div className="mb-4">
                        {card.title && (
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {card.title}
                            </h3>
                        )}
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {card.cardDescription || card.message}
                        </p>
                    </div>

                    {/* Card Owner */}
                    {card.owner && (
                        <p className="text-xs text-gray-500 mb-3">
                        By: {card.owner}
                        </p>
                    )}

                    {/* Card Actions */}
                    <div className="card-actions flex items-center justify-between mt-auto">
                        
                        {/* Upvote action */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={onUpvote}
                                className="upvote-btn bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium transition duration-200 flex items-center space-x-1"
                                title="Upvote this card"
                            >
                                <span>👍</span>
                            {/* Vote count */}
                                <span>
                                    {card.voteCount || 0}
                                </span>
                            </button>

                        </div>

                        {/* Comments section button */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowCommentsModal(true)}
                                className="comments-btn bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium transition duration-200 flex items-center space-x-1"
                                title="View comments"
                            >
                                <span>💬</span>
                                <span>{commentCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Modal */}
            {showCommentsModal && (
                <CommentsModal
                    card={card}
                    onClose={handleCommentsModalClose}
                />
            )}
        </>
    );
};

export default Card;
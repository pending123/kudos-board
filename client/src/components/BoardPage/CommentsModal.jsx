import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentsModal = ({ card, onClose }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        message: '',
        author: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Char limit for comments
    const MAX_COMMENT_LENGTH = 200;

    // Loads comments when moeal is open
    useEffect(() => {
        const loadComments = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`http://localhost:3000/cards/${card.cardId}/comments`);
                setComments(data);
            } catch (err) {
                console.error('Failed to load comments:', err);
                setError('Failed to load comments');
            } finally {
                setIsLoading(false);
            }
        };

        loadComments();
    }, [card.cardId]);

    // Handle comment input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Handle char limit for message
        if (name === 'message' && value.length > MAX_COMMENT_LENGTH) {
            return; // Don't update if over 200 char
        }
        
        setNewComment(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    // Handle comment submission
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        
        if (!newComment.message.trim()) {
            setError('Comment message is required');
            return;
        }

        try {
            setIsSubmitting(true);
            
            const { data: createdComment } = await axios.post(
                `http://localhost:3000/cards/${card.cardId}/comments`, 
                {
                    message: newComment.message,
                    author: newComment.author || null  // Or null in case author is not defined
                }
            );
            
            // Add new comment to the list
            setComments(prev => [createdComment, ...prev]);
            
            // Reset form
            setNewComment({
                message: '',
                author: ''
            });
            
            setError('');
        } catch (err) {
            console.error('Failed to add comment:', err);
            setError('Failed to add comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle modal close
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={handleModalClick}
        >
            <div 
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Card Comments</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>

                {/* Card Information */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Card GIF */}
                        <div className="flex-shrink-0">
                            {card.gifUrl ? (
                                <img 
                                    src={card.gifUrl} 
                                    alt="Card GIF"
                                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full md:w-48 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                    <span className="text-gray-500">No GIF</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Card Details */}
                        <div className="flex-grow">
                            {card.title && (
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {card.title}
                                </h3>
                            )}
                            <p className="text-gray-700 mb-2">
                                {card.cardDescription || card.message}
                            </p>
                            {card.owner && (
                                <p className="text-sm text-gray-500">
                                    By: {card.owner}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add New Comment Form */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h3>
                    
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                        {/* Comment Message */}
                        <div>
                            <label htmlFor="commentMessage" className="block text-sm font-medium text-gray-700 mb-2">
                                Message:
                            </label>
                            <textarea
                                id="commentMessage"
                                name="message"
                                value={newComment.message}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your comment..."
                            />
                            {/* Character counter */}
                            <div className="flex justify-between mt-1">
                                <span></span>
                                <p className={`text-sm ${
                                    newComment.message.length > MAX_COMMENT_LENGTH * 0.9 
                                        ? 'text-red-600' 
                                        : 'text-gray-500'
                                }`}>
                                    {newComment.message.length}/{MAX_COMMENT_LENGTH}
                                </p>
                            </div>
                        </div>

                        {/* Comment Author */}
                        <div>
                            <label htmlFor="commentAuthor" className="block text-sm font-medium text-gray-700 mb-2">
                                Author (optional):
                            </label>
                            <input
                                type="text"
                                id="commentAuthor"
                                name="author"
                                value={newComment.author}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your name..."
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        {/* Submit button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || !newComment.message.trim()}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition duration-200"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Comment'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Comments List */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Comments ({comments.length})
                    </h3>

                    {isLoading ? (
                        <div className="text-center py-4">
                            <p className="text-gray-500">Loading comments...</p>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                            {comments.map((comment, index) => (
                                <div key={comment.commentId || index} className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-800 mb-2">{comment.message}</p>
                                    <p className="text-xs text-gray-500">
                                        By: {comment.author || 'Anonymous'}
                                        {comment.createdAt && (
                                            <span className="ml-2">
                                                • {new Date(comment.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentsModal;
import React, { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

const CreateCardModal = ({ onSubmit, onCancel }) => {
  // Form state management
    const [formData, setFormData] = useState({
        title: '',
        cardDescription: '',
        gifUrl: '',
        owner: ''
    });
    
    // GIF search state
    const [gifSearchQuery, setGifSearchQuery] = useState('');
    const [gifResults, setGifResults] = useState([]);
    const [isSearchingGifs, setIsSearchingGifs] = useState(false);
    const [selectedGif, setSelectedGif] = useState(null);
    const [submitDisabled, setSubmitDisabled] = useState(false)
    
    // GIF URL paste state
    const [pastedGifUrl, setPastedGifUrl] = useState('');
    
    // Form validation and submission state
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Character limit for message
    const MAX_MESSAGE_LENGTH = 200;

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Handle character limit for cardDescription
        if (name === 'cardDescription' && value.length > MAX_MESSAGE_LENGTH) {
            return; // Don't update if over limit

        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    
        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle GIF URL paste
    const handleGifUrlChange = (e) => {
        const url = e.target.value;
        setPastedGifUrl(url);
        
        // Update form data with pasted URL
        setFormData(prev => ({
            ...prev,
            gifUrl: url
        }));
        
        // Clear selected GIF from search if URL is pasted
        if (url) {
            setSelectedGif(null);
            setGifResults([]);
        }
        
        // Clear GIF error if present
        if (errors.gif) {
            setErrors(prev => ({
                ...prev,
                gif: ''
            }));
        }
    };

  // Search for GIFs using GIPHY API
    const searchGifs = async () => {
        if (!gifSearchQuery.trim()) return;
    
        try {
            setIsSearchingGifs(true);

            const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
                params: {
                    api_key: API_KEY,
                    q: gifSearchQuery,
                    limit: 8,
                    rating: 'g'
                }
            });
            setGifResults(response.data.data);
            // Clear pasted URL when searching
            setPastedGifUrl('');
        } 
        catch (err) {
            console.error('Failed to search GIFs:', err);
            setErrors(prev => ({
                ...prev,
                gif: 'Failed to search GIFs. Please try again.'
            }));
        }
        finally {
            setIsSearchingGifs(false);
        }
    };

    // Handle GIF selection
    const handleGifSelect = (gif) => {
        setSelectedGif(gif);
        setFormData(prev => ({
            ...prev,
            gifUrl: gif.images.fixed_height.url
        }));
        
        // Clear pasted URL when selecting from search
        setPastedGifUrl('');
        
        // Clear GIF error if present
        if (errors.gif) {
            setErrors(prev => ({
                ...prev,
                gif: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'A title is required.';
        }
        
        if (!formData.cardDescription.trim()) {
            newErrors.cardDescription = 'A message is required.';
        }
        
        if (!formData.gifUrl) {
            newErrors.gif = 'Please select a GIF or paste a GIF URL.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        try {
            setIsSubmitting(true);
            await onSubmit(formData);
            
            // Reset form after successful submission
            setFormData({
                    title: '',
                    cardDescription: '',
                    gifUrl: '',
                    owner: ''
            });
            setSelectedGif(null);
            setGifResults([]);
            setGifSearchQuery('');
            setPastedGifUrl('');
        }
        catch (err) {
            console.error('Failed to submit card:', err);
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to create card. Please try again.'
            }));
        }
        finally {
            setIsSubmitting(false);
        }
    };

    // Handle modal close
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={handleModalClick}
        >
            <div 
                className="create-card-modal bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create New Card</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Card Title */}
                <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title:
                        </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter card title..."
                    />
                    
                    {/*TESTING */}
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}                    
                </div>

                {/* Card Description */}
                <div>
                    <label htmlFor="cardMessage" className="block text-sm font-medium text-gray-700 mb-2">
                        Message:
                    </label>
                    <textarea
                        id="cardDescription"
                        name="cardDescription"
                        value={formData.cardDescription}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.cardDescription ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your message..."
                    />
                    {/* Character counter */}
                    <div className="flex justify-between mt-1">
                        {errors.cardDescription && (
                            <p className="text-sm text-red-600">{errors.cardDescription}</p>
                        )}
                        <p className={`text-sm ml-auto ${
                            formData.cardDescription.length > MAX_MESSAGE_LENGTH * 0.9 
                                ? 'text-red-600' 
                                : 'text-gray-500'
                        }`}>
                            {formData.cardDescription.length}/{MAX_MESSAGE_LENGTH}
                        </p>
                    </div>
                </div>

                {/* Author */}
                <div>
                    <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-2">
                        Author (optional):
                    </label>
                    <input
                        type="text"
                        id="owner"
                        name="owner"
                        value={formData.owner}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter author name..."
                    />
                </div>

                {/* GIF URL Paste Section */}
                <div>
                    <label htmlFor="gifUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        Copy GIF URL:
                    </label>
                    <input
                        type="url"
                        id="gifUrl"
                        value={pastedGifUrl}
                        onChange={handleGifUrlChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.gif && !formData.gifUrl ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Paste GIF URL here..."
                    />
                </div>

                {/* OR divider */}
                <div className="text-center text-gray-500 font-medium">
                    OR
                </div>

                {/* GIF Search Section */}
                <div>
                    <label htmlFor="gifSearch" className="block text-sm font-medium text-gray-700 mb-2">
                        Search and Select GIF:
                    </label>
                    
                    {/* GIF Search Input */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            id="gifSearch"
                            value={gifSearchQuery}
                            onChange={(e) => setGifSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), searchGifs())}
                            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.gif && !formData.gifUrl ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Search for GIFs..."
                        />
                        <button
                            type="button"
                            onClick={searchGifs}
                            disabled={isSearchingGifs || !gifSearchQuery.trim()}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                        {isSearchingGifs ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {/* Selected GIF Preview */}
                    {selectedGif && (
                        <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Selected GIF:</p>
                        <div className="inline-block border-2 border-green-500 rounded-lg overflow-hidden">
                            <img 
                            src={selectedGif.images.fixed_height.url}
                            alt="Selected GIF"
                            className="h-32 object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Pasted GIF Preview */}
                {pastedGifUrl && !selectedGif && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Pasted GIF:</p>
                        <div className="inline-block border-2 border-green-500 rounded-lg overflow-hidden">
                            <img 
                                src={pastedGifUrl}
                                alt="Pasted GIF"
                                className="h-32 object-cover"
                                onError={() => {
                                    setErrors(prev => ({
                                        ...prev,
                                        gif: 'Invalid GIF URL. Please check the URL and try again.'
                                    }));
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* GIF Search Results */}
                {gifResults.length > 0 && (
                    <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Choose a GIF:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        {gifResults.map((gif) => (
                        <button
                            key={gif.id}
                            type="button"
                            onClick={() => handleGifSelect(gif)}
                            className={`relative overflow-hidden rounded-lg transition duration-200 hover:scale-105 aspect-square ${
                            selectedGif?.id === gif.id ? 'ring-2 ring-green-500' : ''
                            }`}
                        >
                            <img 
                            src={gif.images.fixed_height_small.url}
                            alt={gif.title}
                            className="w-full h-full object-cover object-cover"
                            />
                        </button>
                        ))}
                    </div>
                    </div>
                )}

                {errors.gif && (
                    <p className="mt-1 text-sm text-red-600">{errors.gif}</p>
                )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting || submitDisabled}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition duration-200"
                >
                    {isSubmitting ? 'Creating...' : 'Create Card'}
                </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default CreateCardModal;
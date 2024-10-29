import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Go Back
            </button>
        </div>
    );
};

export default Error;
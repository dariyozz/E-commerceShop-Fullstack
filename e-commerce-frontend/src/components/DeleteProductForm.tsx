import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteProduct} from "../services/api";
import {toast} from "react-toastify";

const DeleteProductForm: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const handleConfirm = async () => {
        if (id) {
            try {
                await deleteProduct(+id);
                toast.success('Product deleted successfully!');
                navigate('/admin'); // Redirect to the admin page after deletion
            } catch (error) {
                toast.error("Failed to delete product! Try again.")
            }
        }
    };

    const handleCancel = () => {
        navigate('/admin'); // Redirect to the admin page without deleting
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-between">
                <button
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                    Confirm
                </button>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteProductForm;
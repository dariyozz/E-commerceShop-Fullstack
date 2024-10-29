import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, Product } from '../services/api';

const EditProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (err) {
            setError('Failed to load products. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Products</h2>

            {error && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <ul>
                {products.map(product => (
                    <li key={product.id} className="mb-4 p-4 border rounded">
                        <div className="flex justify-between items-center">
                            <span>{product.name}</span>
                            <div>
                                <Link
                                    to={`/edit/${product.id}`}
                                    className="mr-2 p-2 bg-blue-500 text-white rounded"
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={`/delete/confirm/${product.id}`}
                                    className="p-2 bg-red-500 text-white rounded"
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditProducts;
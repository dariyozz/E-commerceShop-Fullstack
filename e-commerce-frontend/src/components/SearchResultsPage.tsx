import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Product, searchProducts} from '../services/api';

const SearchResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState<Product[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                try {
                    const response = await searchProducts(query);
                    setResults(response.data);
                } catch (err) {
                    console.log('Failed to fetch search results. Please try again later.');
                }
            }
        };
        fetchResults();
    }, [query]);

    return (
        <div className="container mx-auto mt-8 h-svh px-10">
            <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
            {results.length === 0 ? (
                <p className="text-lg text-gray-600">No results found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {results.map(product => (
                        <div key={product.id}
                             className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="relative">
                                <img
                                    src={product.imageUrl || "/api/placeholder/300/300"}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{product.category.name}</span>
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getCategories, Product, Category } from '../services/api';
import { Link } from 'react-router-dom';
import { Search, Filter, SortDesc } from 'lucide-react';

const ProductListingPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filter, setFilter] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | number>('all');
    const [sort, setSort] = useState<'price' | 'name'>('name');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (category) {
            setSelectedCategoryId(Number(category));
        } else {
            setSelectedCategoryId('all');
        }
    }, [category]);

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(filter.toLowerCase()) &&
            (selectedCategoryId === 'all' || product.category.id === selectedCategoryId)
        )
        .sort((a, b) => {
            if (sort === 'price') {
                return a.price - b.price;
            }
            return a.name.localeCompare(b.name);
        });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>

            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        <select
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500"
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        <select
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500"
                            onChange={(e) => setSort(e.target.value as 'price' | 'name')}
                        >
                            <option value="price">Sort by Price</option>
                            <option value="name">Sort by Name</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
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
        </div>
    );
};

export default ProductListingPage;
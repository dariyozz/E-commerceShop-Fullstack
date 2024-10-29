import React, { useEffect, useState } from 'react';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Category, getCategories } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContextProvider';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { cart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await getCategories();
                setCategories(categoriesResponse.data);
            } catch (err) {
                console.log('Failed to fetch categories. Please try again later.');
            }
        };
        fetchData();
    }, []);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 font-bold text-xl">
                        <Link to="/">
                            <span className="text-blue-600">express</span>Buy
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/products/all/${category.id}`}
                                className="text-gray-600 hover:text-blue-600 font-bold"
                            >
                                {category.name}
                            </Link>
                        ))}
                        <Link to="/admin" className="text-blue-600 hover:text-black font-bold">
                            Admin Page
                        </Link>
                    </nav>

                    {/* Search, Cart, and User */}
                    <div className="hidden md:flex items-center space-x-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-8 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </form>
                        <Link
                            to="/cart"
                            className="relative">
                            <ShoppingCart className="h-6 w-6 text-gray-600" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => alert('User menu clicked!')}>
                            <User className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="flex flex-col space-y-2">
                            {categories.map(category => (
                                <Link
                                    key={category.id}
                                    to={`/products/all/${category.id}`}
                                    className="text-gray-600 hover:text-blue-600 py-2"
                                >
                                    {category.name}
                                </Link>
                            ))}
                            <Link to="/admin" className="text-gray-600 hover:text-blue-600 py-2">
                                Admin Page
                            </Link>
                        </div>
                        <div className="mt-4 flex flex-col space-y-4">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full pl-8 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
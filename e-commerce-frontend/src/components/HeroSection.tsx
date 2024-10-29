import React from 'react';
import { ArrowRight, ShoppingBag, Truck, Shield } from 'lucide-react';
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            Discover Amazing Products for
                            <span className="text-blue-600"> Your Lifestyle</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Explore our curated collection of high-quality items that enhance your daily life. From essentials to luxuries, we've got you covered.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={"/products/all"} className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center">
                                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <button onClick={() => alert('View Deals clicked!')} className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition">
                                View Deals
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img
                                src="https://media.istockphoto.com/id/1428271936/photo/young-man-using-laptop-with-shopping-cart-icon.jpg?s=2048x2048&w=is&k=20&c=oc72ZEKRlb3ZtHhC1q58SUf0ApZ-0-FExi0LLoj6ut4="
                                alt="Featured products"
                                className="rounded-md"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-center text-sm font-medium">
                                <span className="text-green-500 mr-2">●</span>
                                24/7 Customer Support
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <ShoppingBag className="h-10 w-10 text-blue-600 mr-4" />
                        <div>
                            <h3 className="font-semibold">Wide Selection</h3>
                            <p className="text-gray-600">Thousands of products to choose from</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Truck className="h-10 w-10 text-blue-600 mr-4" />
                        <div>
                            <h3 className="font-semibold">Fast Delivery</h3>
                            <p className="text-gray-600">Get your items quickly and efficiently</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Shield className="h-10 w-10 text-blue-600 mr-4" />
                        <div>
                            <h3 className="font-semibold">Secure Shopping</h3>
                            <p className="text-gray-600">Your transactions are always protected</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
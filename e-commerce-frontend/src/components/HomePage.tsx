import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, ArrowRight, Mail } from 'lucide-react';
import HeroSection from "./HeroSection";

const HomePage = () => {
    return (
        <div className="home overflow-hidden">
            <HeroSection/>

            {/* Trending Items Section */}
            <section className="trending-items py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Trending Now
                        </h2>
                        <button className="group flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800">
                            View all
                            <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1"/>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Blue Light Glasses",
                                description: "Protect your eyes in style",
                                image: "/api/placeholder/400/300",
                                tag: "Bestseller"
                            },
                            {
                                title: "Weighted Blanket",
                                description: "Sleep better tonight",
                                image: "/api/placeholder/400/300",
                                tag: "New"
                            },
                            {
                                title: "Air Fryer Pro",
                                description: "Healthy cooking made easy",
                                image: "/api/placeholder/400/300",
                                tag: "Limited"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {item.tag}
                                </div>
                                <img src={item.image} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"/>
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                    <button className="mt-4 flex items-center text-blue-600 font-semibold group-hover:text-blue-800">
                                        Learn more
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"/>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="reviews py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-16">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "This store completely changed how I shop online. The quality is unmatched!",
                                author: "Emma Thompson",
                                role: "Verified Buyer",
                                rating: 5
                            },
                            {
                                text: "Fast shipping, great prices, and the customer service is absolutely outstanding.",
                                author: "Michael Chen",
                                role: "Loyal Customer",
                                rating: 5
                            },
                            {
                                text: "I've recommended this store to all my friends. They never disappoint!",
                                author: "Sarah Johnson",
                                role: "Tech Enthusiast",
                                rating: 5
                            }
                        ].map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 rounded-2xl shadow-lg"
                            >
                                <div className="flex mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current"/>
                                    ))}
                                </div>
                                <p className="text-lg mb-6">{review.text}</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {review.author[0]}
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-semibold">{review.author}</p>
                                        <p className="text-gray-600 text-sm">{review.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="blog py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-16">Latest Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Science of Sleep: Choosing Your Perfect Weighted Blanket",
                                category: "Wellness",
                                image: "/api/placeholder/400/250",
                                readTime: "5 min read"
                            },
                            {
                                title: "10 Game-Changing Air Fryer Recipes You Need to Try",
                                category: "Cooking",
                                image: "/api/placeholder/400/250",
                                readTime: "7 min read"
                            },
                            {
                                title: "Digital Eye Strain: How Blue Light Glasses Can Help",
                                category: "Health",
                                image: "/api/placeholder/400/250",
                                readTime: "4 min read"
                            }
                        ].map((post, index) => (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-xl mb-4">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                                        {post.category}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600">{post.readTime}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <Mail className="w-16 h-16 mx-auto mb-6" />
                    <h2 className="text-5xl font-bold mb-4">Stay in the Loop</h2>
                    <p className="text-xl mb-8 text-blue-100">Get exclusive offers, unique insights, and more delivered straight to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
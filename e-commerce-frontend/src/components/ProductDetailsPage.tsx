import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Truck, Shield, Star, ChevronRight } from 'lucide-react';
import { getProductById, Product } from '../services/api';
import { useCart } from './CartContextProvider';
import {toast} from "react-toastify";

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(Number(id));
                const productData = response.data;

                // Provide mock data if necessary
                productData.images = productData.images || [productData.imageUrl];
                productData.colors = productData.colors || ['Default Color'];
                productData.rating = productData.rating || 0;
                productData.reviews = productData.reviews || 0;
                productData.relatedProducts = productData.relatedProducts || [];

                setProduct(productData);
                setSelectedColor(productData.colors[0]);
            } catch (err) {
                setError('Failed to fetch product details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product && product.id !== undefined) {
            addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
                imageUrl: product.images ? product.images[selectedImage] : ''
            });
            toast.success('Added to cart!');
        }
    };

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

    if (!product) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Images */}
                <div className="lg:w-1/2">
                    <div className="mb-4">
                        <img
                            src={product.images ? product.images[selectedImage] : '/api/placeholder/400/400'}
                            alt={product.name}
                            className="w-full rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {product.images && product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`border rounded-md overflow-hidden ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}`}
                            >
                                <img src={image} alt={`Product view ${index + 1}`} className="w-full"/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    <div className="flex items-center mb-4">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="ml-2 text-gray-600">{product.reviews} reviews</span>
                    </div>

                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <div className="mb-6">
                        <h2 className="font-semibold mb-2">Color</h2>
                        <div className="flex space-x-4">
                            {product.colors && product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 border rounded-md ${selectedColor === color ? 'border-blue-600 text-blue-600' : 'border-gray-200'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="font-semibold mb-2">Quantity</h2>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-1 border rounded-md"
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-1 border rounded-md"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                            <Truck className="w-5 h-5 mr-2" />
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Shield className="w-5 h-5 mr-2" />
                            <span>2-year warranty included</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {product.relatedProducts && product.relatedProducts.map(relatedProduct => (
                        <div key={relatedProduct.id} className="border rounded-lg overflow-hidden">
                            <img src={relatedProduct.imageUrl} alt={relatedProduct.name} className="w-full" />
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">${relatedProduct.price}</span>
                                    <button
                                        onClick={() => alert(`View ${relatedProduct.name}`)}
                                        className="text-blue-600 hover:text-blue-700 flex items-center"
                                    >
                                        View <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
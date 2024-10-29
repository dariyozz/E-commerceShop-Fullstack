import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Category, getCategories, getProductById, updateProduct, Product } from '../services/api';
import {toast} from "react-toastify";

interface FormData {
    name: string;
    description: string;
    price: string;
    stockQuantity: string;
    categoryId: string;
    imageUrl: string;
}

const EditProductForm: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
        imageUrl: ''
    });
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate('/error'); // Redirect to an error page or handle the error appropriately
            return;
        }
        fetchCategories();
        fetchProductDetails();
    }, [id]);

    const productId = id ? parseInt(id, 10) : null;

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (err) {
            setError('Failed to load categories. Please try again later.');
        }
    };

    const fetchProductDetails = async () => {
        if (!productId) return;
        try {
            const response = await getProductById(productId);
            const product: Product = response.data;
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price.toString(),
                stockQuantity: product.stockQuantity.toString(),
                categoryId: product.category?.id?.toString() || '',
                imageUrl: product.imageUrl || ''
            });
        } catch (err) {
            setError('Failed to load product details. Please try again later.');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!productId) return;

        try {
            const product: Product = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stockQuantity: parseInt(formData.stockQuantity),
                category: { id: parseInt(formData.categoryId), name: '' },
                imageUrl: formData.imageUrl,
                updatedAt: new Date().toISOString()
            };
            console.log(product)
            await updateProduct(productId,product);
            toast.success('Product updated successfully!');
            navigate("/admin")
        } catch (err) {
            setError('Failed to update product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

            {error && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Product Name</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className="block mb-1 font-medium">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="stockQuantity" className="block mb-1 font-medium">Stock Quantity</label>
                        <input
                            id="stockQuantity"
                            name="stockQuantity"
                            type="number"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="categoryId" className="block mb-1 font-medium">Category</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block mb-1 font-medium">Image URL</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? 'Updating...' : 'Update Product'}
                </Button>
            </form>
        </div>
    );
};

export default EditProductForm;
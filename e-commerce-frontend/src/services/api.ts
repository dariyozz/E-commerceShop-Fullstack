import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// Types based on backend models
export type Category = {
    id?: number;
    name: string;
    description?: string;
};

export type Product = {
    id?: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: {
        id: number;
        name: string;
    };
    imageUrl: string;
    createdAt?: string;
    updatedAt: string;
    // Mock data fields
    colors?: string[];
    images?: string[];
    rating?: number;
    reviews?: number;
    relatedProducts?: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
    }[];
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export type OrderItem = {
    id: number;
    product: Product;
    quantity: number;
    price: number;
};

export type Order = {
    id: number;
    customer: any; // You might want to define a Customer type if needed
    orderItems: OrderItem[];
    totalPrice: number;
    status: OrderStatus;
    createdAt?: string;
    updatedAt: string;
};

// API functions
export const getProducts = async () => await api.get<Product[]>('/products/all');
export const getProductById = async (id: number) => await api.get<Product>(`/products/${id}`);
export const getCategoryById = async (id: number) => await api.get<Category>(`products/categories/${id}`);
export const getCategories = async () => await api.get<Category[]>('/products/categories');
export const getProductsByCategory = (categoryId: number) =>
    api.get<Product[]>(`/products/category/${categoryId}`);


export const createProduct = async (product: Product) => {
    return await api.post('/products/createproduct', product);
};

export const updateProduct = async (id: number, product: Product) => {
    return await api.put(`/products/${id}`, product, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
}
export const searchProducts = async (query: string) => {
    return await api.get(`products/search`, {
        params: {query},
    })
};
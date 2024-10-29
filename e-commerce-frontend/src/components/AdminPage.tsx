import { Link } from "react-router-dom";

export default function AdminPage() {
    return (
        <div className="p-6 font-bold text-black bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-8">Admin Dashboard</h1>
            <div className="space-y-4">
                <Link
                    to="/addproduct"
                    className="block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Add Product
                </Link>
                <Link
                    to="/edit"
                    className="block px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                    Edit Products
                </Link>
            </div>
        </div>
    );
}
import { useCart } from './CartContextProvider';

const CartPage = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto mt-8 h-svh px-10">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-lg text-gray-600">Your cart is empty</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <ul className="divide-y divide-gray-200 mb-6">
                        {cart.map((item) => (
                            <li key={item.productId} className="py-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="text-gray-700 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(item.productId)} className="ml-4 text-red-600 hover:text-red-800">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center border-t pt-4">
                        <span className="text-xl font-bold">Total: ${calculateTotal()}</span>
                        <button onClick={clearCart} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
                            Clear Cart
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
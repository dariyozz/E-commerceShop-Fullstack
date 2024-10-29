import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import ProductListingPage from "./components/ProductListingPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";
import AddProductForm from "./components/AddProductForm";
import EditProducts from "./components/EditProducts";
import EditProductForm from "./components/EditProductForm";
import Error from "./components/Error";
import DeleteProductForm from "./components/DeleteProductForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SearchResultsPage from "./components/SearchResultsPage";

const App = () => (
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/products/all/:category?" element={<ProductListingPage/>}/>
            <Route path="/products/:id" element={<ProductDetailsPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/addproduct" element={<AddProductForm/>}/>
            <Route path="/edit" element={<EditProducts/>}/>
            <Route path="/edit/:id" element={<EditProductForm/>}/>
            <Route path="/delete/confirm/:id" element={<DeleteProductForm/>}/>
            <Route path="/search" element={<SearchResultsPage/>}></Route>
            <Route path="/error" element={<Error/>}/>
        </Routes>
        <Footer/>
        <ToastContainer
            position="top-right"
            autoClose={3000}
        />
    </Router>
);

export default App;
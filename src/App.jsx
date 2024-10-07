import './App.css'
import Home from './component/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import Product from './component/product/Product';
import { useState } from 'react';
import Cart from './component/Cart';
import Blog from './component/blog/Blog';
import NavBar from './component/NavBar';
import Header from './component/Header';
import ReadBlog from './component/blog/ReadBlog';
import ProducDetail from './component/product/ProducDetail';
import Footer from './component/Footer';



function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  return (
    <Router>
      <Header/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/readBlog/:id" element={<ReadBlog/>}/>
        <Route path="/product" element={<Product addToCart={addToCart} />}></Route>
        <Route path="/productDetail/:id" element={<ProducDetail/>}></Route>
        <Route path="/cart" element={<Cart/>} />
      </Routes>
     
      <Footer/>
    </Router>
  );
}

export default App;


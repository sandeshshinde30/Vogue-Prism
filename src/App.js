import React, { useState , Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Product from './pages/Product';
import Products from './pages/Products';
import AdminMain from './pages/AdminMain';
import AdminLogin from './pages/AdminLogin';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Category from './pages/Category'


class App extends Component {
  render() {

    return (
     <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/admin' element={<AdminMain/>}/>
        <Route path='/login' element={<AdminLogin/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/category' element={<Category/>}/>
      

      </Routes>
     </Router>
    );
  }
}

export default App;

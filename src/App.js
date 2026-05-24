import React, { useState , Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Product from './pages/Product';
import AdminMain from './pages/AdminMain';
import AdminLogin from './pages/AdminLogin';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Category from './pages/Category'
import PrivacyPolicy from './pages/PrivacyPolicy'
import JoinCommunity from './pages/JoinCommunity'


class App extends Component {
  render() {

    return (
     <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/product' element={<Product/>}/> */}
        <Route path="/product/:id" element={<Product />} />
        <Route path='/admin' element={<AdminMain/>}/>
        <Route path='/login' element={<AdminLogin/>}/>
        <Route path='/' element={<ContactUs/>}/>
        <Route path='/' element={<AboutUs/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/join' element={<JoinCommunity/>}/>
        
      

      </Routes>
     </Router>
    );
  }
}

export default App;

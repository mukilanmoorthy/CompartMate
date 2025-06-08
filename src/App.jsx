import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Booking from './Pages/Booking';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Searchresults from './Pages/Searchresults'
import Payment from './Pages/Payment';
import Ticket from './Pages/Ticket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="sr" element={<Searchresults />} />
        <Route path="payment" element={<Payment />} />
        <Route path="t" element={<Ticket />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
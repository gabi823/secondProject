import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import NavBar from './components/NavBar/NavBar.js';
import Welcome from './pages/Welcome/Welcome.js';
import React from 'react';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';


function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}


export default App;

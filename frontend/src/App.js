import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import Profile from './pages/Profile/Profile.js'
import Welcome from './pages/Welcome/Welcome.js';
import Settings from './pages/Settings/Settings.js';
import Selection from './pages/Selection/Selection.js';
import Login from './pages/Login/Login.js';
import CreateAccount from "./pages/CreateAccount/CreateAccount.js";
import WrappedIntro from "./pages/Wrapped/WrappedIntro.js";
import WrappedSongs from "./pages/Wrapped/WrappedSongs.js";
import WrappedGenres from "./pages/Wrapped/WrappedGenres.js";
import WrappedArtists from "./pages/Wrapped/WrappedArtists.js";
import WrappedAlbums from "./pages/Wrapped/WrappedAlbums";
import WrappedPersonality from "./pages/Wrapped/WrappedPersonality";



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/selectionscreen" element={<Selection />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/createaccount" element={<CreateAccount />}></Route>

                <Route path="/wrappedintro" element={<WrappedIntro />}></Route>
                <Route path="/topsongs" element={<WrappedSongs />}></Route>
                <Route path="/topgenres" element={<WrappedGenres />}></Route>
                <Route path="/topartists" element={<WrappedArtists />}></Route>
                <Route path="/topalbums" element={<WrappedAlbums />}></Route>
                <Route path="/listening-personality" element={<WrappedPersonality />}></Route>


            </Routes>
        </Router>
    );
};


export default App;

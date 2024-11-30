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
import WrappedIntro from "./pages/Wrapped/WrappedIntro/WrappedIntro.js";
import WrappedSongs from "./pages/Wrapped/WrappedSongs/WrappedSongs.js";
import WrappedGenres from "./pages/Wrapped/WrappedGenres/WrappedGenres.js";
import WrappedArtists from "./pages/Wrapped/WrappedArtists/WrappedArtists.js";
import WrappedAlbums from "./pages/Wrapped/WrappedAlbums/WrappedAlbums";
import WrappedPersonality from "./pages/Wrapped/WrappedPersonality/WrappedPersonality";
import WrappedPlaylist from "./pages/Wrapped/WrappedPlaylist/WrappedPlaylist";
import WrappedSummary from "./pages/Wrapped/WrappedSummary/WrappedSummary";
import AboutUs from './pages/AboutUs/aboutUs.js';



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
                <Route path="/about" element={<AboutUs />}></Route>

                <Route path="/wrapped-intro" element={<WrappedIntro />}></Route>
                <Route path="/top-songs" element={<WrappedSongs />}></Route>
                <Route path="/top-genres" element={<WrappedGenres />}></Route>
                <Route path="/top-artists" element={<WrappedArtists />}></Route>
                <Route path="/top-albums" element={<WrappedAlbums />}></Route>
                <Route path="/listening-personality" element={<WrappedPersonality />}></Route>
                <Route path="/your-playlist" element={<WrappedPlaylist />}></Route>
                <Route path="/wrapped-summary" element={<WrappedSummary />}></Route>


            </Routes>
        </Router>
    );
};


export default App;

import './App.css';
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
import TopGenres from "./pages/Wrapped/WrappedGenres.js";
import Artists from "./pages/Wrapped/WrappedArtists.js";



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
                <Route path="/topgenres" element={<TopGenres />}></Route>
                <Route path="/topartists" element={<Artists />}></Route>

            </Routes>
        </Router>
    );
};


export default App;

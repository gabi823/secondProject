import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import Profile from './pages/Profile/Profile.js'
import Welcome from './pages/Welcome/Welcome.js';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/profile" element={<Profile />}></Route>
            </Routes>
        </Router>
    );
};


export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import NavBar from './components/NavBar/NavBar.js';
import Welcome from './pages/Welcome/Welcome.js';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </Router>
    );
};


export default App;

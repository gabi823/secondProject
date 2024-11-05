import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import './CreateAccount.css';

const CreateAccount = () => {
    return (
        <>
            <NavBar />
            <div className="images-container">
                <div className="images-row">
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 1" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 2" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 3" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 4" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 5" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 6" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 7" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 8" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 9" />
                </div>
                <div className="images-row second">
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 9" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 10" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 11" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 12" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 13" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 14" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 15" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 16" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 17" />
                </div>
            </div>
            <div className="create-account-container">
                <div className="create-account-form">
                    <div className="form-heading">Create Account</div>
                    <div className="form-label">Username:</div>
                    <input type="text" className="form-input" />
                    <div className="form-label">Password:</div>
                    <input type="password" className="form-input" />
                    <div className="form-label">Email:</div>
                    <input type="text" className="form-input" />
                    <button className="create-button">Create Account</button>
                </div>
            </div>
        </>
    );
};

export default CreateAccount;

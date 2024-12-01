import './ProfileWrapped.css';
import React, { useState } from "react";

const ProfileWrapped = ({ albumCoverUrl, wrappedName, dateCreated, onDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        onDelete();
        setShowConfirmation(false); // Close the confirmation modal after deletion
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <div className="wrapped-section">
                <img
                    src={albumCoverUrl}
                    alt={`Wrapped #${wrappedName}`}
                    className="wrapped-image"
                />
                <div className="wrapped-title">
                    {wrappedName}
                    <br/>
                    <span className="wrapped-date">Date Created: {dateCreated}</span>
                </div>

                <span className="delete" onClick={handleDeleteClick}>&times;</span>
                <span className="divider"></span>
            </div>


            {
                showConfirmation && (
                    <div className="confirmation-modal">
                        <div className="modal-content">
                            <p>Are you sure you want to delete this Wrap?</p>
                            <button className="confirm-button" onClick={confirmDelete}>
                                Yes
                            </button>
                            <button className="cancel-button" onClick={cancelDelete}>
                                No
                            </button>
                        </div>
                    </div>
                )}
        </>
    );
};

export default ProfileWrapped;
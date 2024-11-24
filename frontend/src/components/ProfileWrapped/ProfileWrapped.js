import './ProfileWrapped.css';

const ProfileWrapped = () => {
    return (
        <>
        <div className="wrapped-section">
            <img
                src="https://via.placeholder.com/160x160"
                alt="Wrapped Image"
                className="wrapped-image"
            />
            <div className="wrapped-title">
                Your Wrapped #1<br/>
                <span className="wrapped-date">Date Created: 2024-10-9</span>
            </div>

            <span className="delete">&times;</span>

        </div>
        <hr className="divider"/>
        </>
    );
};

export default ProfileWrapped;


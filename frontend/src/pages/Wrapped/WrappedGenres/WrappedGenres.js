import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import './WrappedGenres.css';
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle';

const WrappedGenres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopGenres = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get("https://secondproject-8lyv.onrender.com/api/top-genres/", {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                setGenres(response.data.top_genres);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching top genres:", err);
                setError(err.response?.data?.error || "Failed to load genres");
                setLoading(false);
            }
        };

        fetchTopGenres();
    }, [navigate]);

    if (loading) return <div className="loading">Loading your top genres...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="wrapped-genres-container">
            {/* Static Header */}
            <div className="header">
                <h1 className="title">Your Top Genres</h1>
                <Link
                    to="/profile"
                    className="exit-button"
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>

            {/* Genres */}
            {genres.map((genre, index) => (
                <motion.div
                    key={genre.rank}
                    className={`genre position-${index + 1}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                >
                    {genre.rank}. {genre.name}
                </motion.div>
            ))}

            {/* Lines for Top Five */}
            <div className="lines-top">
                {[...Array(5)].map((_, index) => (
                    <motion.div
                        key={index}
                        className={`line position-${index + 1}`}
                        initial={{ opacity: 0, y: 50 }} // Lines coming from the bottom
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.1 }}
                    />
                ))}
            </div>

            {/* Lines for Bottom Three */}
            <div className="lines-bottom">
                {[...Array(3)].map((_, index) => (
                    <motion.div
                        key={index + 5}
                        className={`line position-${index + 6}`}
                        initial={{ opacity: 0, y: -50 }} // Lines coming from the top
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + 5) * 0.2 + 0.1 }}
                    />
                ))}
            </div>

            {/* Static Next Button */}
            <Link
                to="/top-artists"
                className="next-button"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
            <DarkModeToggle />
        </div>
    );
};

export default WrappedGenres;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './WrappedGenres.css';

const genres = [
    { rank: 1, name: "Pop" },
    { rank: 2, name: "Indie Pop" },
    { rank: 3, name: "Rap" },
    { rank: 4, name: "K-Pop" },
    { rank: 5, name: "Rock" },
    { rank: 6, name: "RNB" },
    { rank: 7, name: "Jazz" },
    { rank: 8, name: "Hip Hop" },
];

const WrappedGenres = () => {
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
                    className={`genre ${genre.name.toLowerCase().replace(/\s+/g, '-')}`}
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
                        className={`line line-${genres[index].name.toLowerCase().replace(/\s+/g, '-')}`}
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
                        className={`line line-${genres[index + 5].name.toLowerCase().replace(/\s+/g, '-')}`}
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
        </div>
    );
};

export default WrappedGenres;

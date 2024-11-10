import React from "react";
import { Link } from "react-router-dom";
import './WrappedGenres.css';

const genres = [
    { rank: 1, name: "Pop" },
    { rank: 2, name: "Indie Pop" },
    { rank: 3, name: "Rap" },
    { rank: 4, name: "K-Pop" },
    { rank: 5, name: "Rock" },
    { rank: 6, name: "R&B" },
    { rank: 7, name: "Jazz" },
    { rank: 8, name: "Hip Hop" },
];

const WrappedGenres = () => {
    return (
        <>
            <div className="wrapped-genres-container">
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

                {/* Genre Texts */}
                <div className="genre pop">1. Pop</div>
                <div className="genre indie-pop">2. Indie Pop</div>
                <div className="genre rap">3. Rap</div>
                <div className="genre k-pop">4. K-Pop</div>
                <div className="genre rock">5. Rock</div>
                <div className="genre rnb">6. R&B</div>
                <div className="genre jazz">7. Jazz</div>
                <div className="genre hip-hop">8. Hip Hop</div>

                {/* Vertical Lines under the first five genres */}
                <div className="line line-pop"></div>
                <div className="line line-indie-pop"></div>
                <div className="line line-rap"></div>
                <div className="line line-k-pop"></div>
                <div className="line line-rock"></div>

                {/* Vertical Lines above the last three genres */}
                <div className="line line-rnb"></div>
                <div className="line line-jazz"></div>
                <div className="line line-hip-hop"></div>
            </div>

            {/* Next Page Arrow */}
            <Link
                to="/top-artists"
                className="next-page-arrow"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
        </>
    );
};

export default WrappedGenres;

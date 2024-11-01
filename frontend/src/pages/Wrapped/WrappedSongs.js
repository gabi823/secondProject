import React from "react";
import { Link } from "react-router-dom";

const songs = [
  { rank: 1, title: "APT.", artist: "ROSE, Bruno Mars", image: "path/to/apt.jpg" },
  { rank: 2, title: "I Love You, I’m Sorry", artist: "Gracie Abrams", image: "path/to/iloveyou.jpg" },
  { rank: 3, title: "A Bar Song (Tipsy)", artist: "Shaboozey", image: "path/to/barsong.jpg" },
  { rank: 4, title: "Pink Pony Club", artist: "Chappell Roan", image: "path/to/pinkpony.jpg" },
  { rank: 5, title: "Guess", artist: "Charli XCX, Billie Eilish", image: "path/to/guess.jpg" },
  { rank: 6, title: "Diet Pepsi", artist: "Addison Rae", image: "path/to/dietpepsi.jpg" },
  { rank: 7, title: "A Bar Song (Tipsy)", artist: "Shaboozey", image: "path/to/barsong.jpg" },
  { rank: 8, title: "Pink Pony Club", artist: "Chappell Roan", image: "path/to/pinkpony.jpg" },
  { rank: 9, title: "Guess", artist: "Charli XCX, Billie Eilish", image: "path/to/guess.jpg" },
  { rank: 10, title: "Diet Pepsi", artist: "Addison Rae", image: "path/to/dietpepsi.jpg" },
  { rank: 11, title: "A Bar Song (Tipsy)", artist: "Shaboozey", image: "path/to/barsong.jpg" },
  { rank: 12, title: "Pink Pony Club", artist: "Chappell Roan", image: "path/to/pinkpony.jpg" }
];

const WrappedSongs = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Link
        to="/profile"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "28px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "none"
        }}
        onClick={() => console.log("Exit clicked")}
      >
        &times;
      </Link>
      <h1 style={{ fontSize: "36px", fontWeight: "700", fontFamily: "Manrope" }}>Your Top Songs</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        {songs.map((song) => (
          <div key={song.rank} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              src="https://via.placeholder.com/161x161"
              alt={`${song.title} cover`}
              style={{ width: "161px", height: "161px",}}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "40px", fontWeight: "700", color: "black", fontFamily: "Manrope" }}>
                {song.rank}
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", fontFamily: "Manrope", marginTop: "10px" }}>
                {song.title}
              </div>
              <div style={{ fontSize: "16px", fontWeight: "400", fontFamily: "Manrope", color: "gray", marginTop: "5px" }}>
                {song.artist}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WrappedSongs;

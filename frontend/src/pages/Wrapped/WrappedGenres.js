import React from "react";
import { Link } from "react-router-dom";

// Array of genres with specific line heights CHANGE WHEN LINKING TO API
const genres = [
  { rank: 1, name: "Pop", lineHeight: "100px" },
  { rank: 2, name: "Indie Pop", lineHeight: "80px" },
  { rank: 3, name: "Rap", lineHeight: "90px" },
  { rank: 4, name: "K-Pop", lineHeight: "70px" },
  { rank: 5, name: "Rock", lineHeight: "85px" },
  { rank: 6, name: "R&B", lineHeight: "110px" },
  { rank: 7, name: "Jazz", lineHeight: "120px" },
  { rank: 8, name: "Hip Hop", lineHeight: "130px" }
];

const WrappedGenres = () => {
  return (
      <div style={{padding: "20px", position: "relative"}}>
          {/* Title and Exit */}
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "top"}}>
              <h1 style={{fontSize: "36px", fontWeight: "700", fontFamily: "Manrope", margin: 0}}>Your Top Genres</h1>
              <Link
                  to="/profile"
                  style={{
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
          </div>

          {/* Genres List */}
          <div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
              <div style={{
                  width: 370.06,
                  height: 0,
                  left: 989,
                  top: 748.01,
                  position: 'absolute',
                  transform: 'rotate(90.62deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
              <div style={{
                  width: 493,
                  height: 0,
                  left: 720,
                  top: 670,
                  position: 'absolute',
                  transform: 'rotate(89.88deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
              <div style={{
                  width: 616,
                  height: 0,
                  left: 445.50,
                  top: 551,
                  position: 'absolute',
                  transform: 'rotate(89.91deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
              <div style={{
                  width: 764.01,
                  height: 0,
                  left: 176.50,
                  top: 1204.01,
                  position: 'absolute',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
              <div style={{
                  width: 215,
                  height: 0,
                  left: 1260,
                  top: 865,
                  position: 'absolute',
                  transform: 'rotate(90deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
              <div style={{
                  width: 208,
                  height: 58,
                  left: 1148,
                  top: 762,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>Rock
              </div>
              <div style={{
                  width: 208,
                  height: 58,
                  left: 1156,
                  top: 552,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>R&B
              </div>
              <div style={{
                  width: 208,
                  height: 58,
                  left: 885,
                  top: 433,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>Jazz
              </div>
              <div style={{
                  width: 255,
                  height: 58,
                  left: 592,
                  top: 321,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>Hip Hop
              </div>
              <div style={{
                  width: 268,
                  height: 78,
                  left: 880,
                  top: 642,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>K-Pop
              </div>
              <div style={{
                  width: 302,
                  height: 86,
                  left: 295,
                  top: 440,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>Indie Pop
              </div>
              <div style={{
                  width: 180,
                  height: 78,
                  left: 630,
                  top: 564,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>Rap
              </div>
              <div style={{
                  width: 175,
                  height: 63,
                  left: 89,
                  top: 336,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 48,
                  fontFamily: 'Manrope',
                  fontWeight: '700',
                  wordWrap: 'break-word'
              }}>Pop
              </div>
              <div style={{
                  width: 47,
                  height: 0,
                  left: 1356,
                  top: 969,
                  position: 'absolute',
                  border: '5px black solid'
              }}></div>
              <div style={{
                  width: 764.01,
                  height: 0,
                  left: 1253,
                  top: -238,
                  position: 'absolute',
                  transform: 'rotate(90deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
              <div style={{
                  width: 764.01,
                  height: 0,
                  left: 989,
                  top: -365,
                  position: 'absolute',
                  transform: 'rotate(90deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
              <div style={{
                  width: 456,
                  height: 0,
                  left: 721,
                  top: -163,
                  position: 'absolute',
                  transform: 'rotate(90deg)',
                  transformOrigin: '0 0',
                  border: '2px black solid'
              }}></div>
          </div>

          {/* Next Page Arrow */}
          <Link
              to="/topartists"
              style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                  fontSize: "36px",
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer"
              }}
              onClick={() => console.log("Next page clicked")}
          >
              &#8594;
          </Link>
      </div>
  );
};

export default WrappedGenres;

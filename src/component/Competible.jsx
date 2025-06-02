import { div } from "framer-motion/client";
import React from "react";
import "../App.css";

const Competible = () => {
  return (
    <>
      <div
        className="copetible"
        style={{ width: "100%", clear: "both", display: "block" }}
      >
        <div className=" mx-auto py-10 ">
          <div className="bg-gray-200 rounded-lg p-6 py-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Proud Partners with:
            </h2>

            <div className="flex flex-wrap justify-center gap-6 py-10">
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  className="max-h-full bg-white max-w-full object-contain grayscale hover:grayscale-0 transition"
                  src="https://www.plex.tv/wp-content/uploads/2021/11/Paramount-Black-500x500-1.png"
                  alt="Paramount"
                />
              </div>
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition"
                  src="https://www.plex.tv/wp-content/uploads/2019/09/warner-bros.png"
                  alt="Warner Bros"
                />
              </div>
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition"
                  src="https://www.plex.tv/wp-content/uploads/2019/11/metro-goldwyn-mayer.png"
                  alt="MGM"
                />
              </div>
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition"
                  src="https://www.plex.tv/wp-content/uploads/2019/09/lionsgate.png"
                  alt="Lionsgate"
                />
              </div>
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition"
                  src="https://www.plex.tv/wp-content/uploads/2019/11/legendary.png"
                  alt="Legendary"
                />
                </div>
                <div className="w-24 h-24 flex items-center justify-center">
                  <img
                    className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition"
                    src="https://www.plex.tv/wp-content/uploads/2020/03/magnolia.png"
                    alt="Magnolia"
                  />
                </div>
              
            </div>
          </div>

        
        </div>

        <div
          className="inner-copetible"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "3rem",
          }}
        >
          {/* <div className="firstcidsnsm" > */}
          <div
            className="first-copetible"
            style={{
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "15px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="title-copetible"
              style={{ color: "#333", fontSize: "20px", fontWeight: "500" }}
            >
              <h2 style={{ color: "#333", fontSize: "45px" }}>
                We’re compatible.
              </h2>
            </div>
            <div
              className="decription-copetible"
              style={{ maxWidth: "400px", color: "#333", fontSize: "20px" }}
            >
              <p>
                Stream Plex from just about any phone, tablet, smart TV, gaming
                consoles, or PC.
              </p>
            </div>
            <div
              className="image-copetible"
              style={{ width: "400px", display: "block" }}
            >
              <img
                src="https://www.plex.tv/wp-content/uploads/2020/03/avod-device-icons-1.png"
                alt=""
              />
            </div>
          </div>
          <div
            className="second-copetible"
            style={{
              width: "50%",
              paddingRight: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="imageright-copetible">
              <img
                src="https://www.plex.tv/wp-content/uploads/2025/03/watch-free-compatible-devices-1024x610.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Competible;

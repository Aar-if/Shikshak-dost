import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import SunbirdVideoPlayer from "./Player";
import Header from "./Header";
import imagePath from "../assets/TSHeader.png";

function StoryDetatils() {
  const location = useLocation();
  const state = location?.state;
  const [showIframe, setShowIframe] = useState(true);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div
        className="product-card"
        style={{
          marginTop: "60px",
          height: "auto",
          width: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="player-header">
          <h1>Detailes of story : {state?.product?.attributes?.Provider}</h1>
          <button
            className="player-button"
            onClick={() => setShowIframe(!showIframe)}
          >
            {showIframe ? "X" : "▶"}
          </button>
        </div>
        {showIframe && (
          <div className="video-player">
            <SunbirdVideoPlayer
              url={state?.product?.attributes?.link}
              width="90vh"
              height="50vh"
            />
          </div>
        )}
        <div className="detailsBox">
          <div>
            <img
              src="https://onest-strapi.tekdinext.com/uploads/images_e7f841a17f.png"
              style={{ width: "50px", height: "auto", marginRight: "50px" }}
            />
          </div>
          <div>
            <b style={{ marginTop: "" }}>
              Actor: {state?.product?.attributes?.Actor}
            </b>
            <p>Language: {state?.product?.attributes?.Language}</p>
            <p>Age: {state?.product?.attributes?.Age}</p>
            <p>Theme: {state?.product?.attributes?.Theme}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryDetatils;

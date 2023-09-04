import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SunbirdVideoPlayer from "./Player";
import Header from "./Header";
import imagePath from "../assets/TSHeader.png";

function StoryDetatils() {
  const location = useLocation();
  const state = location?.state;
  const [showIframe, setShowIframe] = useState(true);
  const navigate = useNavigate();


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
  <div className="title-wrapper">
    <h1 style={{fontSize:"18px"}}>{state?.product?.attributes?.Title}</h1>
    <h1 style={{fontSize:"14px",fontStyle: "italic"}}>{state?.product?.attributes?.Provider}</h1>
  </div>
  <button
    className="player-button"
    onClick={() => {
      navigate("/home");
    }}
  >
    {showIframe ? "X" : "▶"}
  </button>
</div>


        {showIframe && (
          <div className="video-player">
            <SunbirdVideoPlayer
             url={ state?.product?.attributes.PDF.data ? state.product.attributes.PDF.data[0].attributes.url : state?.product?.attributes?.link }
              width="90vh"
              height="50vh"
            />
          </div>
        )}
 <div className="container">
    <div className="left-column">
    <img src={`https://onest-strapi.tekdinext.com` + state?.product?.attributes?.image?.data?.attributes?.url} alt="Product Image" />    </div>
    <div className="right-column">
    <p> Actor: {state?.product?.attributes?.Actor}</p>
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

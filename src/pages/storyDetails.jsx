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
  <h1>{state?.product?.attributes?.Title}</h1>
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
        <div className="detailsBox">
          <div>
            {<img
           //   src="https://onest-strapi.tekdinext.com/uploads/images_e7f841a17f.png"
            src={`https://onest-strapi.tekdinext.com`+ state?.product?.attributes?.image?.data?.attributes?.url}

              style={{ width: "200px", height: "auto", marginRight: "50px" }}
            /> }
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

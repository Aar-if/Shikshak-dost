import React, { useState, useEffect } from "react";
import ProductCard from "./Card";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaUndo } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

function App() {
  const [story, setStory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "all"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "all"
  );
  const [ageGroup, setAgeGroup] = useState(
    localStorage.getItem("ageGroup") || "all"
  );
  const [actor, setActor] = useState(localStorage.getItem("actor") || "all");
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination

  const itemsPerPage = 10; // Number of items per page
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://onest-strapi.tekdinext.com/api/stories?populate=*",
      responseType: "stream",
    })
      .then(function (response) {
        const obj = JSON.parse(response.data);
        const parsedData = obj.data;
        setStory(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      localStorage.removeItem("selectedCategory");
    } else {
      localStorage.setItem("selectedCategory", selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (language === "all") {
      localStorage.removeItem("language");
    } else {
      localStorage.setItem("language", language);
    }
  }, [language]);

  useEffect(() => {
    if (ageGroup === "all") {
      localStorage.removeItem("ageGroup");
    } else {
      localStorage.setItem("ageGroup", ageGroup);
    }
  }, [ageGroup]);

  useEffect(() => {
    if (actor === "all") {
      localStorage.removeItem("actor");
    } else {
      localStorage.setItem("actor", actor);
    }
  }, [actor]);

  // Filter the story array based on selectedCategory
  const filteredStory = story.filter((item) => {
    const categoryFilter =
      selectedCategory === "all" ||
      item?.attributes?.Theme === selectedCategory;
    const languageFilter =
      language === "all" || item?.attributes?.Language === language;
    const ageGroupFilter =
      ageGroup === "all" || item?.attributes?.Age == ageGroup;
    const actorFilter = actor === "all" || item?.attributes?.Actor === actor;

    return categoryFilter && languageFilter && ageGroupFilter && actorFilter;
  });

  // Slice the filteredStory array based on pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStory = filteredStory.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredStory.length / itemsPerPage);
  const breakLabel = pageCount > 5 ? "..." : null;
  // Function to handle page change
  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setLanguage("all");
    setAgeGroup("all");
    setActor("all");
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="product-container" style={{ marginTop: "70px" }}>
          <div
            style={{
              position: "sticky",
              top: "70px",
              zIndex: 1000,
              background: "#fff",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <select
                  className="filters"
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                >
                  <option value="all">{t("age")}</option>
                  <option value={1}>{t("1")}</option>
                  <option value={2}>{t("2")}</option>
                  <option value={3}>{t("3")}</option>
                  <option value={4}>{t("4")}</option>
                  <option value={5}>{t("5")}</option>
                </select>
              </div>

              <div style={{ marginRight: "10px" }}>
                <select
                  className="filters"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="all">{t("language")}</option>
                  <option value="English">English</option>
                  <option value="Hindi">हिंदी</option>
                </select>
              </div>

              <div style={{ marginRight: "10px" }}>
                <select
                  className="filters"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">{t("type")}</option>
                  <option value="Video">{t("video")}</option>
                  <option value="Audio">{t("audio")}</option>
                  <option value="Read">{t("read")}</option>
                </select>
              </div>
            </div>

            <div style={{ marginLeft: "5px" }}>
              <button onClick={resetFilters}>
                <FaUndo />
              </button>
            </div>
          </div>

          {paginatedStory.length === 0 ? (
            <p>No data available for the selected filters.</p>
          ) : (
            paginatedStory.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))
          )}

          {/* Pagination */}
          <div>
          <ReactPaginate
   previousLabel="<"
   nextLabel=">"
   breakLabel={breakLabel}
   pageCount={pageCount}
   marginPagesDisplayed={2}
   pageRangeDisplayed={5}
   onPageChange={handlePageClick}
   containerClassName={"pagination"}
   subContainerClassName={"pages pagination"}
   activeClassName={"active"}
/>
          </div>
          
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;

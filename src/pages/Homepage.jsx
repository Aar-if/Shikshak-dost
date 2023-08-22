import React, { useState, useEffect } from "react";
import ProductCard from "./Card";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function App() {
  const [story, setStory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [language, setLanguage] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [actor, setActor] = useState("all");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://onest-strapi.tekdinext.com/api/stories",
      responseType: "stream",
    })
      .then(function (response) {
        const obj = JSON.parse(response.data);

        const parsedData = obj.data;

        console.log(parsedData);
        setStory(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter the story array based on selectedCategory
  const filteredStory = story.filter((item) => {
    const categoryFilter =
      selectedCategory === "all" ||
      item?.attributes?.Theme === selectedCategory;
    const languageFilter =
      language === "all" || item?.attributes?.Language === language;
    const ageGroupFilter =
      ageGroup === "all" || item?.attributes?.Age === ageGroup;
    const actorFilter = actor === "all" || item?.attributes?.Actor === actor;

    return categoryFilter && languageFilter && ageGroupFilter && actorFilter;
  });

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="product-container" style={{ marginTop: "70px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {/* Filter dropdowns */}
            <select
              className="filters"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="all">{t("age")}</option>
              <option value={1}>{t("1")} </option>
              <option value={2}>{t("2")}</option>
              <option value={3}>{t("3")}</option>
              <option value={4}>{t("4")}</option>
              <option value={5}>{t("5")}</option>
              <option value={6}>{t("6")}</option>
              <option value={7}>{t("7")}</option>
              <option value={8}>{t("8")}</option>
              <option value={9}>{t("9")}</option>
              <option value={10}>{t("10")}</option>
              <option value={11}>{t("11")}</option>
              <option value={12}>{t("12")}</option>
              <option value={13}>{t("13")}</option>
              <option value={14}>{t("14")}</option>
              <option value={15}>{t("15")}</option>
              <option value={16}>{t("16")}</option>
            </select>
            <select
              className="filters"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="all">{t("language")}</option>
              <option value="English">English</option>
              <option value="Hindi">हिंदी</option>
              {/* <option value="Gujarati">Gujarati</option>
              <option value="Assamese">Assamese</option>
              <option value="Tamil">Tamil</option>
              <option value="Marathi">Marathi</option>
              <option value="Kannada">Kannada</option> */}
            </select>
            <select
              className="filters"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">{t("type")}</option>
              <option value="Video">{t("video")}</option>

              <option value="Audio">{t("audio")}</option>
              <option value="Read">{t("read")}</option>
              <option value="Other">{t("other")}</option>
            </select>
            <select
              className="filters"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
            >
              <option value="all">{t("actor")}</option>
              <option value="Student">{t("student")}</option>
              <option value="Parent">{t("parent")}</option>
              <option value="Teacher">{t("teacher")}</option>
            </select>
          </div>
          {filteredStory.length === 0 ? (
            <p>No data available for the selected filters.</p>
          ) : (
            filteredStory.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
                {/* <Button
                  className="viewButton"
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    navigate("/storyDetails", {
                      state: {
                        product: product,
                      },
                    });
                  }}
                >
                  View Story
                </Button> */}
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;

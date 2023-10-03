/* eslint-disable no-mixed-spaces-and-tabs */
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
// import Divider from "../components/Divider";
import Footer from "./FooterDiksha";
import Footer2 from "./Footer";
import HeaderDiksha from "./HeaderDiksha";
import Messages from "./Message";
import Axios from "axios";
import Header from "./Header";

const DikshachatbotUi = () => {
  let [messages, setMessages] = useState([
    { from: "computer", text: "Welcome to the Diksha AI Discovery Bot." },
    // { from: "me", text: "Hey there" },
    // { from: "me", text: "Myself Ferin Patel" },
    // {
    //   from: "computer",
    //   text: "Help me with content for teaching 9th grade ",
    // },
    ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    setMessages((old) => [...old, { from: "me", text: inputMessage }]);

    setIsLoading(true); // Start loading
    //chatbot
    try {
        const requestBody = {
            searchType: "text",
            searchString: inputMessage,
            audioCode: "",
          };
        
          const response = await Axios.post(
            "http://13.233.33.253:1245/intent/openai/search",
            requestBody
          );
        
          const data = response.data;
        
          if (data) {
            setInputMessage("");
            setMessages((old) => [...old, { from: "computer", text: data }]);
          }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    // <><div className={styles.menuDiv}>
    //   <button onClick={() => navigate("/")}>🏠</button>
    // </div>
    <>
      <Header />
      <Flex w="100%" h="85vh" justify="center" align="center" marginTop="80px">
        <Flex h="100%" flexDir="column">
          <HeaderDiksha />
          <Messages messages={messages} />
          {isLoading && (
            <div>Loading...</div> // Display loading indicator
          )}
          <div>
            <Footer
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default DikshachatbotUi;

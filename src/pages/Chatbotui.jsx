/* eslint-disable no-mixed-spaces-and-tabs */
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
// import Divider from "../components/Divider";
import Footer from "./FooterChat";
import HeaderChat from "./HeaderChat";
import Messages from "./Message";
import Axios from 'axios'
import Header from "./Header";

const Chatbotui = () => {
  const [messages, setMessages] = useState([]);
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
      const response = await Axios(`https://beta-ncfsaarathi.sunbird.org/ncf-chat/answer?model=gpt-4&q=${inputMessage}&sources=NCF_SE;NCF_FS;NEP`);
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
    
    <Flex w="100%" h="100vh" justify="center" align="center">
        <Flex h="90%" flexDir="column">
          <HeaderChat />
          <Messages messages={messages} />
          {isLoading && (
            <div>Loading...</div> // Display loading indicator
          )}
          <div><Footer
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage} />
          </div>

        </Flex>
      </Flex>
  );

};

export default Chatbotui;
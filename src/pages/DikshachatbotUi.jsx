/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";// import Divider from "../components/Divider";
import Footer from "./FooterDiksha";
import Footer2 from "./Footer";
import HeaderDiksha from "./HeaderDiksha";
import Messages from "./Message";
import Axios from "axios";
import Header from "./Header";
import { Flex } from "@chakra-ui/react";
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
        audioCode: "",
      };
      const queryParams = {
        searchType: "text",
        searchString: inputMessage,
      };
  
      const response = await Axios.post(
        `https://aidiscovery.uniteframework.io/intent/openai/search`,
        requestBody,
        {
          params: queryParams,
        }
      );
      const data = response.data.result.data;

      if (response) {
        console.log('Received response');

        console.log(response.data.result,data);
        const botMessage = data;
        if (data && Array.isArray(data)) {
          const extractedData = data.slice(0, 3).map(item => {
            const { title, link } = item;
            return { title, link };
          });
  
          let newMessages = [
            ...messages,
            { from: "computer", text: 'Based on your search, here are some diksha content...' }
          ];
  
          extractedData.forEach(item => {
  
            const message = `${item.title}:`;
            const linkText = (
              <a
                href={item.link}
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.link}
              </a>
            );
            newMessages = [
              ...newMessages,
              {
                from: "computer", text: (
                  <React.Fragment>
                    {message}{linkText}
                  </React.Fragment>
                )
              },
            ];
          });
  
          setMessages(newMessages);
        } else {
          console.error('API request failed');
        }
      } else {
        console.error('API request failed');
      }
  
      setInputMessage("");
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
      <Flex
  w="100%"
  h="85vh"
  justify="center"
  align="center"
  marginTop="80px"
  paddingX={{ base: "10px", md: "20px", lg: "40px" }}
>
  <Flex h="100%" flexDir="column">
    <HeaderDiksha />
    <Messages messages={messages} />
    {isLoading && <div>Loading...</div>}
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

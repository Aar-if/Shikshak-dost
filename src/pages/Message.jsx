import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text, Box} from "@chakra-ui/react";
const fontSize = "md";
const Messages = ({ messages }) => {
  
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    return <div ref={elementRef} />;
  };

  return (
  <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
    {messages.map((item, index) => (
      <Flex
        key={index}
        w={{ base: "100%", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
        justify={item.from === "me" ? "flex-end" : "flex-start"}
      >
        {item.from !== "me" && (
          <Box
            as="img"
            src="https://beta-ncfsaarathi.sunbird.org/assets/img/ncp/humanavatar.png"
            alt="Avatar"
            bg="blue.300"
            borderRadius="full"
            boxSize="30px"
            mr="2"
          />
        )}
        <Flex
          bg={item.from === "me" ? "#61A7E9" : "gray.100"}
          color="black"
          minW="80%"
          display="grid"
          maxW="80%"
          my="1"
          p="3"
        >
          <Text
            style={{
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              width:"90%",
              fontSize: fontSize, // Set the font size here
            }}
          >
            {item.text}
          </Text>
        </Flex>
      </Flex>
    ))}
  </Flex>
  );
};


export default Messages;

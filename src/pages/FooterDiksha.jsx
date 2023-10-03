import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const FooterDiksha = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
	<Flex  w="90%" mt="5" marginLeft="10px" marginRight="10px">
  	<Input
    	placeholder="Type Something..."
    	
    	borderRadius="none"
		border= "1px solid black"

    	_focus={{
      	border: "1px solid black",
    	}}
    	onKeyPress={(e) => {
      	if (e.key === "Enter") {
        	handleSendMessage();
      	}
    	}}
    	value={inputMessage}
    	onChange={(e) => setInputMessage(e.target.value)}
  	/>
  	<Button
	
    	 bg="#61A7E9"
		 color="black"
    	borderRadius="none"
    	_hover={{
      	bg: "white",
      	color: "black",
      	border: "1px solid black",
    	}}
    	disabled={inputMessage.trim().length <= 0}
    	onClick={handleSendMessage}
  	>
    	Send
  	</Button>
	</Flex>
  );
};

export default FooterDiksha;
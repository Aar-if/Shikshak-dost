import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Text,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show loading effect
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        <Card
        onClick={() => {
          navigate("/storyDetails", {
            state: {
              product: product,
            },
          });
        }}
        display="flex"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.200"
       

        _hover={{
          borderColor: "blue.400",
        }}
        cursor="pointer"
      >
  <Image
    src={`https://onest-strapi.tekdinext.com` + product?.attributes?.image?.data?.attributes?.url}
    alt="Image not available"
    maxW={{ base: "100%", sm: "230px" }}
    
    objectFit="cover"
    p="10px" 
  />     
        <Stack p={4} spacing={4} align="flex-start">
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="YourPreferredFont, sans-serif"
            color="black.500"
          >
            {product?.attributes?.Title
              ? product.attributes.Title.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
              : "Title not available"}
          </Text>
          <Stack spacing={0}>
            <Text fontWeight="200">Recommended Age: {product?.attributes?.Age || "N/A"}</Text> 
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="200">Language: {product?.attributes?.Languag}</Text>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="200" >Type: {product?.attributes?.Theme || "N/A"}</Text>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="200">Published By: {product?.attributes?.Provider || "N/A"}</Text>
          </Stack>
          <Text fontWeight="200">
            {product?.attributes?.Description}
          </Text>
          {/* Add other fields as needed */}
        </Stack>
      </Card>
      )}
    </div>
  );
};

export default ProductCard;

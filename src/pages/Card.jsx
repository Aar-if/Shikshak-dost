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
 console.log("product",product?.attributes?.image?.data?.attributes?.url)
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
          className="cardDiv"
          onClick={() => {
            navigate("/storyDetails", {
              state: {
                product: product,
              },
            });
          }}
          direction={{ base: "row", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "50%", sm: "200px" }}
            // src="https://onest-strapi.tekdinext.com/uploads/images_e7f841a17f.png"
            src={`https://onest-strapi.tekdinext.com`+ product?.attributes?.image?.data?.attributes?.url}
            alt="Caffe Latte"
          />

<Stack>
            <CardBody>
              {isLoading ? (
                <SkeletonText
                  mt="2"
                  noOfLines={2}
                  spacing="2"
                  skeletonHeight="2"
                />
              ) : (
                <>
                   <span className="age-info1">
  <Text  py="2" className="age-info5">{product?.attributes?.Title}</Text>
 
</span>
                  <span className="age-info">
  <Text py="2">Recommended Age:</Text>
  <Text py="2" className="age-info2">{product?.attributes?.Age}</Text>
</span>


<span className="age-info">
  <Text py="2">Language:</Text>
  <Text py="2" className="age-info2"> {product?.attributes?.Language}</Text>
</span>
<span className="age-info">
  <Text py="2">Type:</Text>
  <Text py="2" className="age-info2">{product?.attributes?.Theme}</Text>
</span>
<span className="age-info">
  <Text py="2">Pubished By:</Text>
  <Text py="2" className="age-info2">{product?.attributes?.Provider}</Text>
</span>
{/* <span className="age-info">
  
  <Text py="2" className="age-info2">{product?.attributes?.Description}</Text>
</span> */}
<Text py="2" className="age-info3">{product?.attributes?.Description}</Text>
                 
                </>
              )}
            </CardBody>

            {/* <CardFooter>
              {isLoading ? (
                <SkeletonText
                  mt="2"
                  noOfLines={1}
                  spacing="2"
                  skeletonHeight="2"
                />
              ) : (
                <Heading size="sm"> {product?.attributes?.Provider}</Heading>
              )}
            </CardFooter> */}
          </Stack>
        </Card>
      )}
    </div>
  );
};

export default ProductCard;

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  Image,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "../Redux/ProductReducer/action";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://gnanavelfireworks.in/api/category/show")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch category data");
        }
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);
  return (
    <Box border="1px solid #E8E8E8">
      <Menu>
        <Flex>
          <MenuButton
            pr=".5rem"
            p=".5rem"
            bg="#84c225"
            w={{ base: "100%", lg: "15rem" }}
            _hover={{ bg: "#84c225" }}
            border="1px solid #84c225"
            className="category_Btn"
            borderRadius="0px"
            rightIcon={<ChevronDownIcon color="white" />}
            _expanded={{ bg: "#84c225" }}
          >
            <Text
              fontSize="15px"
              fontWeight="500"
              fontFamily="Poppins"
              color="white"
            >
              SHOP BY CATEGORY
            </Text>
          </MenuButton>
        </Flex>
        <Flex>
          <MenuList
            w={{ base: "113%", lg: "none" }}
            px=".3rem"
            mt="-.5rem"
            borderRadius="0px"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          >
            {categories.map(({ _id, parent, img, description }) => {
              return (
                <Link to={`/${parent}`} key={_id}>
                  <MenuItem
                    minH="48px"
                    key={_id}
                    // onClick={() => dispatch(getProducts(url))}
                    //   _hover={{ color: "blue", bg: "#84c225" }}
                  >
                    {img && (
                      <Image
                        boxSize="1rem"
                        borderRadius="full"
                        src={img}
                        alt="Category Image"
                        mr="12px"
                      />
                    )}
                    <Text
                      fontSize="13px"
                      fontFamily="Poppins"
                      fontWeight="400"
                      color="#808080"
                    >
                      {description}
                    </Text>
                  </MenuItem>
                </Link>
              );
            })}
          </MenuList>
        </Flex>
      </Menu>
    </Box>
  );
};
export default Category;

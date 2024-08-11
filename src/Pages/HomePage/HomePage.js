import { Flex, Spacer, Text, Box } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import React, { useEffect } from "react";
import FeedPosts from "../../Components/HomePage/FeedPosts";
import SearchUser from "../../Components/HomePage/SearchUser";
import useGetBooks from "../../hooks/useGetBooks";
import useBookStore from "../../store/books";

const HomePage = () => {
  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      px={{ base: "5", md: "20" }}
      py={10}
      backgroundImage="url('/bgHome.jpg') "
      backgroundColor="rgba(252, 126, 126, 1)"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      backgroundBlendMode="overlay"
    >
      <Box h={"200px"}></Box>
      <Flex display={{ base: "block", lg: "none" }} mb={10}>
        <SearchUser />
        <Box h={"50px"}></Box>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <FeedPosts />
        <Flex
          position={{ lg: "fixed" }}
          display={{ base: "none", md: "none", lg: "block" }}
          right={20}
        >
          <SearchUser />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePage;

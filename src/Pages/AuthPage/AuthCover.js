import { Flex, Text, Image } from "@chakra-ui/react";
import React from "react";

const AuthCover = () => {
  return (
    <Flex
      backgroundImage="url('/bookcover.jpg') "
      backgroundColor="rgba(48, 131, 255, 1)" 
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundBlendMode="multiply"
    >
      <Flex
        h={"100vh"}
        direction={"column"}
        justifyContent={"center"}
      >
        <Flex>
          <Image src="/BookfolioText.svg" />
        </Flex>

        <Text color={"white"} mx={20} textAlign={"center"}>
          BookFolio is an app where users can explore a feed of books, like
          their favorites, and track reads. Discover new titles, share your
          reading progress, and connect with a community of book lovers. Perfect
          for keeping up with popular reads and building your personal book
          collection!
        </Text>
      </Flex>
    </Flex>
  );
};

export default AuthCover;

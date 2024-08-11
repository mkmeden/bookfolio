import { Flex,Button,  Spacer, Text, Box, useDisclosure } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import React, { useEffect } from "react";
import FeedPosts from "../../Components/HomePage/FeedPosts";
import SearchUser from "../../Components/HomePage/SearchUser";
import useGetBooks from "../../hooks/useGetBooks";
import useBookStore from "../../store/books";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import SuggestedUsersModal from "../../Components/Modals/SuggestedUsersModal";

const HomePage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Flex display={{ base: "block", md : "block", lg: "none" }} mb={10}>
        <SearchUser />
        <Flex h={"20px"}></Flex>
        <Button  width={"100%"} color={"black"} bg={"blue.300"} onClick={onOpen}>Suggested Users</Button>
        <Box h={"50px"}></Box>
      </Flex>
      <Flex justifyContent={{ base : "center", lg:"start"}} alignItems="start">
        <Flex >
        <FeedPosts />
        </Flex>
        <Flex
          position={{ lg: "fixed" }}
          display={{ base: "none", md: "none", lg: "block" }}
          right={20}
        >
          <SearchUser />
          <Flex h={"100px"}></Flex>
          <Button  width={"100%"} color={"black"} bg={"blue.300"} onClick={onOpen}>Suggested Users</Button>
        </Flex>
      </Flex>
      <SuggestedUsersModal isOpen = {isOpen}  onClose= {onClose}/>
    </Flex>
  );
};

export default HomePage;

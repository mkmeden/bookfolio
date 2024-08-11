import {
  Flex,
  Image,
  Circle,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import useOnLike from "../../hooks/useOnLike";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Avatar,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useOnRead from "../../hooks/useOnRead";
import { useLocation, useParams } from "react-router-dom";

const ImageHolder = ({ details, data, src, title }) => {
  const [like, liked, loading] = useOnLike(data);
  const [readMark, read, readLoading] = useOnRead(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  console.log("path", location);
  return (
    <Flex
      bg={"#FFF5E7"}
      p={5}
      borderRadius={"5"}
      border="2px"
      borderColor="black"
      direction={"column"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      cursor={"pointer"}
      _hover={{ transform: "scale(1.05)" }}
      transition="transform 0.2s"
    >
      {location.pathname === "/" && (
        <Flex
          display={{ base: "block", md: "none" }}
          direction="column" // Stack items vertically
          alignItems="center" // Center items horizontally
        >
          <Text >{`${details.name} ${details.type}`}</Text>
        </Flex>
      )}

      <Image src={src} onClick={onOpen} />
      <Text textAlign={"center"} width={"150px"}>{title}</Text>
      <Flex gap={3} justifyContent={"center"}>
        <Button
          variant="link"
          colorScheme="transparent"
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s"
          onClick={() => {
            like(data);
          }}
          isLoading={loading}
        >
          <Circle
            bg={!liked ? "white" : "red.200"}
            border="1px"
            borderColor="black"
            p={3}
          >
            <FaHeart />
          </Circle>
        </Button>

        <Button
          colorScheme="transparent"
          variant="link"
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s"
          onClick={() => {
            readMark(data);
          }}
          isLoading={readLoading}
        >
          <Circle
            bg={!read ? "white" : "green.200"}
            border="1px"
            borderColor="black"
            p={3}
          >
            <FaBook />
          </Circle>
        </Button>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent border="2px" borderColor="black" borderRadius="lg">
          <ModalBody bg={"#FFF5E7"} border="2px">
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
              <Flex>
                <Image src={src} width={"2000px"} />
              </Flex>

              <Flex>
                <Flex direction={"column"}>
                  <Flex gap={"20"}></Flex>
                  <Text>Description : </Text>
                  <Text width={"90%"} style={{ fontFamily: "Lato" }}>
                    {data.description}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ImageHolder;

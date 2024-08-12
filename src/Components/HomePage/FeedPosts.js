import React from "react";
import FeedPost from "./FeedPost";
import { Center, Flex } from "@chakra-ui/react";
import useGetFeedPostBooks from "../../hooks/useGetFeedPostBooks";
import Lottie from "react-lottie";
import animationData from "../../assets/animationData.json";

const FeedPosts = () => {
  const [friendsBooks, loading] = useGetFeedPostBooks();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (loading)
    return (
      <Center  minW="80vw">
        <Lottie options={defaultOptions} height={400} width={400} />
      </Center>
    );
  else
    return (
      <Flex>
        {friendsBooks.length == 0 && (
          <Flex
            bg={"#FFF5E7"}
            p={5}
            borderRadius={"5"}
            border="2px"
            borderColor="black"
          >
            Your friends have no books in their collection. If you don't have
            any friends make some here.
          </Flex>
        )}
        <Flex
          direction={"column"}
          alignItems={{ base: "center", md: "start" }}
          justifyContent={"start"}
          gap={10}
        >
          {friendsBooks.map((book) => (
            <FeedPost book={book} />
          ))}
        </Flex>
      </Flex>
    );
};

export default FeedPosts;

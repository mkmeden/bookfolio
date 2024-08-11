import React from "react";
import FeedPost from "./FeedPost";
import { Flex } from "@chakra-ui/react";
import useGetFeedPostBooks from "../../hooks/useGetFeedPostBooks";

const FeedPosts = () => {
  const [friendsBooks,loading] = useGetFeedPostBooks();

  if(loading)
    return(<Flex>Loading</Flex>)
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
          Your friends have no books in their collection. If you don't have any friends make some here.
        </Flex>
      )}
      <Flex  direction={"column"}  alignItems={"start"} justifyContent={"start"} gap={10}>
        {friendsBooks.map((book) => (
          <FeedPost book={book} />
        ))}
      </Flex>
    </Flex>
  );
};

export default FeedPosts;

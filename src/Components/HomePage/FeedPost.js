import React from "react";
import { Flex, Circle, Text,Avatar } from "@chakra-ui/react";
import ImageHolder from "../ImageHolder/ImageHolder";

const FeedPost = ({ book }) => {
  return (
    <div>
      <Flex alignItems={"center"} justifyContent={"center"} gap={10}>
        <Flex
          direction={"column"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <ImageHolder
            details = {book}
            data={book.book}
            src={book.book.thumbnail}
            title={book.book.title.split("(")[0]}
          />
        </Flex>

        <Flex direction={"column"} justifyContent={{lg: "start" , base : "center"}}>
          <Flex
            display={{base :"none" , lg:"block"}}
            width={"50%"}
            bg={"#FFF5E7"}
            p={5}
            borderRadius={"5"}
            border="2px"
            borderColor="black"
            direction={"column"}
          >
            <Avatar size={"md"} src = {book.profilePicURL}/>
              <Text>{`${book.name} ${book.type} this book`}</Text>

            <Flex gap={"20"}>
              <Text>{`Likes : ${book.book.likes.length}`}</Text>
              <Text>{`Reads : ${book.book.reads.length}`}</Text>
            </Flex>
            <Text>Description : </Text>
            <Text style={{ fontFamily: "Lato" }}>
             {book.book.description}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default FeedPost;

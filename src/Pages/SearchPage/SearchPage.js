import { Flex, Spacer, Text, Box, Input, Grid, Button } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import React, { useState } from "react";
import FeedPosts from "../../Components/HomePage/FeedPosts";
import SearchUser from "../../Components/HomePage/SearchUser";
import { MdLocationSearching } from "react-icons/md";
import axios from "axios";
import useShowToast from "../../hooks/useShowToast";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
const SearchPage = () => {
  const [bookName, setBookName] = useState("");
  const [result, setResult] = useState(null);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await axios.get(
      process.env.REACT_APP_KEY1 + bookName + process.env.REACT_APP_KEY2
    );
    setResult(res.data);

    setLoading(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      px={"20"}
      py={10}
      backgroundImage="url('/bgHome.jpg') "
      backgroundColor="rgba(166, 135, 255, 1)"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      backgroundBlendMode="overlay"
    >
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex h={"150px"}></Flex>
        <Flex
          bg={"#FFF5E7"}
          p={5}
          borderRadius={"5"}
          border="2px"
          borderColor="black"
          gap={5}
        >
          <Input
            placeholder="Search Books"
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value);
            }}
          />
          <Button
            bg={"blue.400"}
            fontSize={"x-large"}
            isLoading={loading}
            onClick={() => {
              handleSearch();
            }}
          >
            <MdLocationSearching />
          </Button>
        </Flex>
        <Flex h={"20px"}></Flex>
      </Flex>
      {result && (
        <>
          <Grid templateColumns={{ base : "repeat(1, 1fr)",md:"repeat(3, 1fr)",lg:"repeat(5, 1fr)"}} gap={6} w="100%">
            {result.items.map((book) => {

              const data = {
                id: book.id,
                title:book.volumeInfo.title.split("(")[0],
                description : book.volumeInfo.description,
                thumbnail : book.volumeInfo.imageLinks.thumbnail
              }
              return <ImageHolder
                data={data}
                src={book.volumeInfo.imageLinks.thumbnail}
                title={book.volumeInfo.title.split("(")[0]}
              />;
            })}
          </Grid>
        </>
      )}
    </Flex>
  );
};

export default SearchPage;

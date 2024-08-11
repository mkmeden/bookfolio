import { Flex, Text, Input, Button, Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdLocationSearching } from "react-icons/md";
import useGetUserByUsername from "../../hooks/useGetUserByUsername";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../../store/profile";

const SearchUser = () => {
  const [searchUser, user, loading] = useGetUserByUsername();
  const [input, setInput] = useState("");
  const setUserProfile = useProfileStore(state => state.setUserProfile);
  const navigate = useNavigate();

  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"#FFF5E7"}
      p={5}
      borderRadius={"5"}
      border="2px"
      borderColor="black"
      width={{ base: "100%", lg: "300px" }} // Ensure a fixed width on large screens
    >
      <Text fontSize={"xx-large"} mb={3}>Search User</Text>
      <Flex gap={5} width="100%">
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button
          bg={"blue.400"}
          fontSize={"x-large"}
          onClick={() => {
            searchUser(input);
          }}
          isLoading={loading}
        >
          <MdLocationSearching />
        </Button>
      </Flex>

      {user && (
        <Flex
          onClick={() => {
            navigate(`/${user.username}`);
            setUserProfile(user);
            localStorage.setItem("profile-info", JSON.stringify(user));
          }}
          cursor={"pointer"}
          bg={"#FFF5E7"}
          mt={5}
          p={5}
          borderRadius={"5"}
          border="2px"
          borderColor="black"
          gap={5}
          width="100%"
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            width={"100%"}
          >
            <Avatar size={"xl"} src={user.profilePicURL} />
            <Flex direction={"column"}>
              <Text>{`Username: ${user.username}`}</Text>
              <Text>{`Name: ${user.name}`}</Text>
              <Text>{`Likes: ${user.likes.length}`}</Text>
              <Text>{`Reads: ${user.reads.length}`}</Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default SearchUser;

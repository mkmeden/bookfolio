import { Flex, Text, Input, Button, Avatar } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { MdLocationSearching } from "react-icons/md";
import useGetUserByUsername from "../../hooks/useGetUserByUsername";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../../store/profile";
const SearchUser = () => {
  const [searchUser, user, loading] = useGetUserByUsername();
  const [input, setInput] = useState("");
  const setUserProfile = useProfileStore(state=> state.setUserProfile) 
  const navigate = useNavigate();
  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} >
      <Text fontSize={"xx-large"}>Search User</Text>
      <Flex
        bg={"#FFF5E7"}
        p={5}
        borderRadius={"5"}
        border="2px"
        borderColor="black"
        gap={5}
      >
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
        <>
          <Flex mt={2}></Flex>
          <Flex
            onClick={() => {
              navigate(`/${user.username}`);

              setUserProfile(user);
              localStorage.setItem('profile-info',JSON.stringify(user))
            }}
            cursor={"pointer"}
            bg={"#FFF5E7"}
            p={5}
            borderRadius={"5"}
            border="2px"
            borderColor="black"
            gap={5}
          >
            <Flex justifyContent={"center"} alignItems={"center"} gap={3} width={"300px"}>
              <Avatar size={"xl"} src={user.profilePicURL} />
              <Flex direction={"column"}>
                <Flex>{`Username: ${user.username}`}</Flex>
                <Flex>{`Name:${user.name}`}</Flex>
                <Flex>{`Likes: ${user.likes.length}`}</Flex>
                <Flex>{`Reads: ${user.reads.length}`}</Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default SearchUser;

import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Avatar,
  Flex,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import useGetFriends from "../../hooks/useGetFriends";
import { useNavigate, useParams } from "react-router-dom";
import useProfileStore from "../../store/profile";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser";

const SuggestedUsersModal = ({ isOpen, onClose }) => {
  const [suggestedUsers] = useGetSuggestedUser();
const {username}  = useParams()

  const navigate = useNavigate()
  const setUserProfile = useProfileStore(state=>state.setUserProfile)
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior = "inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Suggested Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Flex direction={"column"} alignItems={"center"} gap={5}  >
                
          {suggestedUsers.map((friend) => (
              <Flex
              justifyContent={"start"}
              alignItems={"center"}
              gap={3}
              bg={"#FFF5E7"}
              p={3}
              borderRadius={"5"}
              border="2px"
              borderColor="black"
              width={"300px"}
              cursor={"pointer"}
              onClick={() => {
                navigate(`/${friend.username}`);
                setUserProfile(friend);
                localStorage.setItem('profile-info',JSON.stringify(friend))
                onClose()
              }}
              >
              <Avatar size={"lg"} src={friend.profilePicURL} />
              <Flex direction={"column"}>
                <Flex>{`${friend.name}`}</Flex>
                <Flex>{`Likes: ${friend.likes.length}`}</Flex>
                <Flex>{`Reads: ${friend.reads.length}`}</Flex>
              </Flex>
            </Flex>
          ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuggestedUsersModal;

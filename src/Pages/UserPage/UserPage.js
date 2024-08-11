import {
  Flex,
  Spacer,
  Text,
  Box,
  Input,
  Avatar,
  Grid,
  Skeleton,
  GridItem,
  Center,
  Button,
  Circle,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Global } from "@emotion/react";
import FeedPosts from "../../Components/HomePage/FeedPosts";
import SearchUser from "../../Components/HomePage/SearchUser";
import { MdLocationSearching } from "react-icons/md";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/auth";
import { useParams } from "react-router-dom";
import useProfileStore from "../../store/profile";
import useAddFriend from "../../hooks/useAddFriend";
import useOnLike from "../../hooks/useOnLike";
import FriendsModal from "../../Components/Modals/FriendsModal";
import useGetFriends from "../../hooks/useGetFriends";
import { MdModeEditOutline } from "react-icons/md";
import useUploadImage from "../../hooks/useUploadImage";
const UserPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [booksCollection, setBooksCollection] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { username } = useParams();
  const profileUser = useProfileStore((state) => state.user);
  const setUserProfile = useProfileStore((state) => state.setUserProfile);
  const visitingAnotherProfile = username !== authUser.username;
  const visitingOwnProfile = username === authUser.username;
  const currentUser = visitingAnotherProfile ? profileUser : authUser;
  const [addFriend, isFriends, isLoading] = useAddFriend(currentUser.uid);
  const browseRef = useRef(null);
  const [uploadImage, uploading] = useUploadImage();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserProfile(doc.data());
      });
    };
    fetchUserProfile();

    const getUserBookCollection = async () => {
      setLoading(true);
      const userDocRef = doc(firestore, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      const likes = userDoc.data().likes;
      const reads = userDoc.data().reads;

      const bookIdCollection = [...new Set([...likes, ...reads])];

      if (bookIdCollection.length === 0) {
        setLoading(false);
        return;
      }

      const booksRef = collection(firestore, "books");
      const q = query(booksRef, where("id", "in", bookIdCollection));
      const querySnapshot = await getDocs(q);
      const books = [];

      querySnapshot.forEach((doc) => {
        books.push(doc.data());
      });
      setBooksCollection(books);
      setLoading(false);
    };

    getUserBookCollection();
  }, [username, currentUser.uid, authUser.likes, authUser.reads]);

  return (
    <div>
      <FriendsModal isOpen={isOpen} onClose={onClose} />
      <Flex
        direction={"column"}
        minH={"100vh"}
        px={"20"}
        py={10}
        backgroundImage="url('/bgHome.jpg') "
        backgroundColor="rgba(135, 183, 255, 1)"
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

          <Flex alignItems={"center"} gap={2} >
            <Input
              type="file"
              display={"none"}
              ref={browseRef}
              onChange={(e) => uploadImage(e)}
            />
            {visitingOwnProfile && (
              <Button
                bg={"white"}
                borderRadius="50%"
                width="50px"
                height="50px"
                onClick={() => browseRef.current.click()}
                isLoading={uploading}
              >
                <MdModeEditOutline />
              </Button>
            )}
            <Circle border="2px" borderColor="black">
              <Avatar size={{ base:"xl" ,md:"2xl"}} src={currentUser.profilePicURL} />
            </Circle>
            <Flex direction={"column"} w={"200px"} gap={2}>
              <Flex
                bg={"#FFF5E7"}
                p={1}
                justifyContent={"start"}
                borderRadius={"5"}
                border="2px"
                borderColor="black"
              >
                {currentUser.name}
              </Flex>
              <Flex
                bg={"#FFF5E7"}
                p={1}
                justifyContent={"start"}
                borderRadius={"5"}
                border="2px"
                borderColor="black"
              >
                {currentUser.username}
              </Flex>
              <Flex
                onClick={() => {
                  onOpen();
                }}
                cursor={"pointer"}
                bg={"#FFF5E7"}
                p={1}
                justifyContent={"start"}
                borderRadius={"5"}
                border="2px"
                borderColor="black"
              >
                {`Friends: ${currentUser.friends.length}`}
              </Flex>

              {visitingAnotherProfile && (
                <Button
                  border={"2px"}
                  borderColor="black"
                  color={"white"}
                  bg={"blue.400"}
                  _hover={{ bg: "blue.500" }}
                  onClick={() => {
                    addFriend(currentUser.uid);
                  }}
                  isLoading={isLoading}
                >
                  {isFriends ? "Unfriend" : "Add friend"}
                </Button>
              )}
            </Flex>
          </Flex>

          <Flex
            m={10}
            bg={"#FFF5E7"}
            px={10}
            py={2}
            justifyContent={"start"}
            borderRadius={"5"}
            border="2px"
            borderColor="black"
          >
            Collections
          </Flex>

          {loading ? (
            <LoadingCollection />
          ) : (
            <Grid templateColumns={{ base:"repeat(1, 1fr)",md:"repeat(3, 1fr)" ,lg:"repeat(5, 1fr)"}} gap={6} w="100%">
              {booksCollection.map((book) => (
                <ImageHolder
                  data={book}
                  src={book.thumbnail}
                  title={book.title.split("(")[0]}
                />
              ))}
            </Grid>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default UserPage;

const LoadingCollection = () => {
  return (
    <Grid templateColumns={{ base:"repeat(1, 1fr)",md:"repeat(3, 1fr)" ,lg:"repeat(5, 1fr)"}} gap={6} w="100%">
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ].map((_) => (
        <Skeleton startColor="black" endColor="blue.500" height="300px" />
      ))}
    </Grid>
  );
};

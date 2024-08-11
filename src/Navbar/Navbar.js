import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/auth";
import useLogout from "../hooks/useLogout";
import useProfileStore from "../store/profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
const Navbar = ({ children }) => {

  const {pathname} = useLocation()
  const authUser = useAuthStore(state=> state.user)
  const user = useAuthState(auth)
  const canRenderNavbar = authUser && pathname !=='/auth'
  const [logout, loading ,error] = useLogout() 
  const setUserProfile = useProfileStore(state=> state.setUserProfile)
  const userProfile = useProfileStore(state=> state.user)
  return (
    <>
      { canRenderNavbar && <Flex
      zIndex={1000}
        borderRadius={"20px"}
        h="10vh"
        bg={"black"}
        position={"fixed"}
        justifyContent={{ base : "center" , md :  "space-between"}}
        left={{ base: 5, md: 10 }} 
        right={{ base: 5, md: 10 }} 
        top={{ base: 5, md: 10 }}
        alignItems={"center"}
      > 
        <Box w={"10%"} display={{base: "none", md:"block"}} >
          <Link to={'/'}>
          <Image src="/BookfolioText.svg" />
          </Link>
        </Box>
        <Flex gap={10} mx={20}>
        <Box color={"white"} display={{base: "block", md:"none"}} >
          <Link to={'/'}>
          <Text >Home</Text>
          </Link>
        </Box>
          <Link to={'/search'}>
          <Box color={"white"} fontSize={{base : "lg", lg:"x-large"}}>
            Search
          </Box>
          </Link>
          <Link to={`/${authUser.username}`}>
          <Box color={"white"} fontSize={{base : "lg", lg:"x-large"}} onClick={()=> { setUserProfile(authUser)}}>
            Profile
          </Box>
          </Link>

          <Link to={'/auth'}>
          <Box color={"white"} fontSize={{base : "lg", lg:"x-large"}}onClick={()=> {logout()}} > 
            Logout
          </Box>
          </Link>
        </Flex>
      </Flex>}
      <Box>{children}</Box>
    </>
  );
};

export default Navbar;

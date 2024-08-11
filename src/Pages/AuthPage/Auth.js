import React from 'react'
import { Center, Flex, Box } from "@chakra-ui/react";
import AuthCover from './AuthCover';
import AuthPage from './AuthPage';
const Auth = () => {
  return (
    <>
          <Flex>
        <Box flex={1} h={"100vh"} display={{base :"none" , md : "block"}}>
          <AuthCover />
        </Box>

        <Box flex={1} h={"100vh"}>
          <AuthPage />
        </Box>
      </Flex>
    </>
  )
}

export default Auth

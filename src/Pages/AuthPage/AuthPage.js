import React, { useState } from "react";
import {
  Input,
  Button,
  Box,
  Flex,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import Login from "../../Components/Auth/Login";
import Signup from '../../Components/Auth/Signup'
import useGAuth from '../../hooks/useGAuth'
import GAuth from "../../Components/Auth/GAuth";

const AuthPage = () => {

  const {GLogin} = useGAuth();

const [login , setLogin] = useState(true)
    return (
    <>
      <Flex
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundImage="url('/grid.jpg')"
        w={"full"}
        h={"full"}
        px={{ base : 10 ,md:20}}
        direction={"column"}
        justifyContent={"center"}
      >
        <Text   fontSize={{ base  : "5xl",  md : "7xl"}} color={"#2A74E2"} fontWeight={"bold"}>
          Welcome
        </Text>

        { login? <Login /> : <Signup />}

        <Flex alignItems={"center"} gap={2} mt={10} >
          <Divider borderWidth="1px" borderColor="gray.700" />
          <Text fontSize={"2xl"} color={"#2A74E2"} fontWeight={"bold"}>
            OR
          </Text>
          <Divider borderWidth="1px" borderColor="gray.700"  />
        </Flex>

        <Flex justifyContent={"center"} gap={2} alignItems={'center'}>
            <Text fontSize={"2xl"} color={"#2A74E2"} fontWeight={"bold"} >Sign up with</Text>
             <Box w={"40px"} cursor={"pointer"} onClick={()=>{
              
              GLogin()}
              
              } >
                <Image src ="/googleIcon.png"/>
             </Box>
        </Flex>
        <Flex gap={2} justifyContent={"center"}  >
            <Text fontSize={"2xl"} color={"#2A74E2"} fontWeight={"bold"} >{login?  "Dont have an account?":"Already have an account?"} </Text>
            <Box cursor={"pointer"} onClick={()=> setLogin(!login)} >
            <Text textDecoration="underline" fontSize={"2xl"} color={"#2A74E2"} fontWeight={"bold"}> {login? "Signup" : "Login"} </Text>
            </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AuthPage;

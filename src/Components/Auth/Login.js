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
import { useState } from "react";
import useSignIn from "../../hooks/useSignIn";

const Login = () => {


  const [inputs, setInputs] = useState({
    email : "", password: ""
  }) 

  const [loading , error ,signIn] = useSignIn()

  return (
    <Flex direction={"column"} gap={10}>
      
      <Input
        placeholder="Email"
        fontSize={14}
        bg={"#5A5A5A"}
        color={"white"}
        value = {inputs.email}
        onChange={(e)=>{setInputs({...inputs, email : e.target.value})}}
        _placeholder={{ opacity: 1, color: "white" }}
      />

      <Input
        placeholder="Password"
        type="password"
        fontSize={14}
        bg={"#5A5A5A"}
        color={"white"}
        _placeholder={{ opacity: 1, color: "white" }}
        value = {inputs.password}
        onChange={(e)=>{setInputs({...inputs, password : e.target.value})}}
      />


      <Flex w={"full"} justifyContent={"center"}>
        <Button w={"25%"} colorScheme="blue" isLoading= {loading}  onClick={()=> {signIn(inputs)}} >
          Login
        </Button>
      </Flex>
    </Flex>
  )
}

export default Login

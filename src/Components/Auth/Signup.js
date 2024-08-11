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
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
const Signup = () => {

  const [loading , error , signup] = useSignUpWithEmailAndPassword()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    username: "",
  });

  return (
    <Flex direction={"column"} gap={10}>
      <Flex gap={10} w={"full"}>
        <Input
          flex={3}
          placeholder="Name"
          fontSize={14}
          bg={"#5A5A5A"}
          color={"white"}
          value={inputs.name}
          onChange={(e)=>{setInputs({...inputs, name : e.target.value})}}
          _placeholder={{ opacity: 1, color: "white" }}
        />
        <Select
          placeholder="Gender"
          flex={2}
          variant={"filled"}
          bg={"#5A5A5A"}
          color={"white"}
          _hover={{ bg: "#5A5A5A" }}
          _focus={{ bg: "#5A5A5A", boxShadow: "none" }}
          sx={{
            option: {
              backgroundColor: "#5A5A5A",
              color: "white",
            },
          }}
        >
          <option value="option1">Male</option>
          <option value="option2">Female</option>
        </Select>
      </Flex>
      <Input
        placeholder="Username"
        fontSize={14}
        bg={"#5A5A5A"}
        color={"white"}
        _placeholder={{ opacity: 1, color: "white" }}
        value={inputs.username}
        onChange={(e)=>{setInputs({...inputs, username : e.target.value})}}
      />

      <Input
        placeholder="Email"
        fontSize={14}
        bg={"#5A5A5A"}
        color={"white"}
        _placeholder={{ opacity: 1, color: "white" }}
        value={inputs.email}
        onChange={(e)=>{setInputs({...inputs, email : e.target.value})}}
      />
      <Input
        placeholder="Password"
        type="password"
        fontSize={14}
        bg={"#5A5A5A"}
        color={"white"}
        _placeholder={{ opacity: 1, color: "white" }}
        value={inputs.password}
        onChange={(e)=>{setInputs({...inputs, password : e.target.value})}}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        fontSize={14}
        bg={"#5A5A5A"}
        color={"white"}
        _placeholder={{ opacity: 1, color: "white" }}
        value={inputs.confirmPassword}
        onChange={(e)=>{setInputs({...inputs, confirmPassword : e.target.value})}}
      />

      <Flex w={"full"} justifyContent={"center"}>
        <Button w={"25%"} colorScheme="blue" isLoading = {loading} onClick={()=> {

          signup(inputs)
        }}  >
          Signup
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signup;

import {
  FormControl,
  InputRightElement,
  FormLabel,
  VStack,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
function SignUp() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState();
  const [picloading, setpicLoading] = useState();
  const [error, setError] = useState(false);
  const toast = useToast();

  // const history = useHistory();
  const handleClick = () => setShow(!show);

  const postDetails = (pic) => {
    setpicLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please select an image.",

        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(pic);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "durdvyxw3");
      fetch("https://api.cloudinary.com/v1_1/durdvyxw3/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setpicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setpicLoading(false);
        });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
      return;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setpicLoading(true);
    if (!name || !email || !password ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
      return;
    }


    // if(password !==confirmpassword){
    //   toast({
    //     title:"passwords do not match",
    //     status:"warning",
    //     duration:5000,
    //     isClosable:true,
    //     position:"bottom",
    //   });
    //   return;
    // }
    console.log(name, email, password, pic);
    
    try {
      const res = await axios.post(
        "https://chatappnodeheroku.herokuapp.com/api/user",
        {
          name,
          email,
          password,
        
        }
      );
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  //   if (!name || !email || !password || !pic) {
  //     toast({
  //       title: "Please Fill all the Fields",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setpicLoading(false);
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     toast({
  //       title: "Passwords Do Not Match",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }
  //   console.log(name, email, password, pic);
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "http://localhost:7001/api/user/api/user",
  //       {
  //         name,
  //         email,
  //         password,
  //         pic,
  //       },
  //       config
  //     );
  //     console.log(data);
  //     toast({
  //       title: "Registration Successful",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     localStorage.setItem("userInfo", JSON.stringify(data));
  //     setpicLoading(false);
  //     history.push("/chats");
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured!",
  //       description: error.response.data.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setpicLoading(false);
  //   }
  // };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <InputGroup>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </InputGroup>
      </FormControl>
      <Button
        colorSchema="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
}
export default SignUp;
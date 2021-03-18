import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {Box, Button, Center, Flex, FormControl, Heading, Input,Spacer, Text} from '@chakra-ui/react';
import {FaFacebookSquare} from 'react-icons/fa';

import {AuthContext} from "../context/auth"
import Label from '../components/Label'
import CoffeeSignUpImg from '../assets/coffeeSignUp.jpg';

const Signup = (props) => {
    const context =useContext(AuthContext)
    const [formData,setFormData]=useState({firstname:"",lastname:"",email:"",password:""})
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSignUp = async()=>{
        try {
            const response = await axios.post("http://localhost:5000/api/users/signup",formData)
            if(response.status===200){
                context.login(response.data);
                props.history.push('/')
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Flex>
            <Box className="container" style={{width: '50%'}}>
                <img src={CoffeeSignUpImg} alt="Coffe" style={{maxWidth: '100%'}}/>
            </Box>
            <Flex className="container" w={'50%'} direction={'column'} justify={'center'} align={'center'}>
                <Heading p={'5px'} as={'h2'} color={'blue.500'}>Sign-up</Heading>
                <Text p={'5px'} color={'gray.500'} fontSize={'sm'}>Already have an account?
                    <Text display='inline'
                          color={'gray.800'}
                    ><Link to={"/login"}><b> Login</b></Link>
                    </Text>
                </Text>

                <Box w={'500px'} p={'20px'}>
                    <Button w={'100%'} mb={'20px'} colorScheme="facebook"
                            leftIcon={<FaFacebookSquare size={'1.75em'}/>}>
                        Join via facebook
                    </Button>

                    <Flex direction={'row'}>
                        <FormControl id="firstname" w={'47%'} my={'10px'} color={'gray.500'}>
                            <Label label={'First Name'} error={""}/>
                            <Input type="text" name={"firstname"} onChange={handleChange}/>
                        </FormControl>
                        <Spacer/>
                        <FormControl id="lastname" w={'47%'} my={'10px'} color={'gray.500'}>
                            <Label label={'Last Name'} error={""}/>
                            <Input type="text" name={"lastname"} onChange={handleChange}/>
                        </FormControl>
                    </Flex>

                    <FormControl id="email" w={'100%'} my={'10px'} color={'gray.500'}>
                        <Label label={'Email address'} error={""}/>
                        <Input type="email" name={"email"} onChange={handleChange}/>
                    </FormControl>
                    <FormControl id="password" w={'100%'} my={'10px'} color={'gray.500'}>
                        <Label label={'Password'} error={""}/>
                        <Input type="password" name={"password"} onChange={handleChange}/>
                    </FormControl>

                    <Button w={'100%'} mt={'30px'} mb={'20px'} colorScheme="green" onClick={handleSignUp}>
                        Join our community
                    </Button>

                    <Center>
                        <Text color={'gray.400'} fontSize={'xs'}>
                            By joining, you agree to the
                            <Text
                                display='inline'
                                color={'gray.600'}
                            ><b> Terms </b>
                            </Text>
                            and
                            <Text
                                display='inline'
                                color={'gray.600'}
                            ><b> Privacy Policy</b>
                                .
                            </Text>
                        </Text>
                    </Center>
                </Box>
            </Flex>
        </Flex>
    );
};
export default Signup;
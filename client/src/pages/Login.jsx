import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {Box, Button, Center, Flex, FormControl, Heading, Input, Text} from '@chakra-ui/react';
import {FaFacebookSquare} from 'react-icons/fa';
import {AuthContext} from '../context/auth'
import CoffeeImg from '../assets/coffee.jpg';

import Label from '../components/Label'

const Login = (props) => {
        const [data, setData] = useState({email: "", password: ""})
        const context = useContext(AuthContext)
        const [credentials, setCredentials] = useState({email: "", password: ""});

        const hanldeChange = (e) => {
            setCredentials({
                ...credentials,
                [e.target.name]: e.target.value
            })
        }
        const handleLogin = async (event) => {
            try {
                const response = await axios.post("http://localhost:5000/api/users/login", credentials)
                if (response.status === 200) {
                    context.login(response.data);
                    props.history.push('/')
                }
            } catch
                (err) {
                console.error(err)
            }
        }

        return (
            <Flex>
                <Box className="container" style={{width: '50%'}}>
                    <img src={CoffeeImg} alt="Coffe" style={{maxWidth: '100%'}}/>
                </Box>
                <Flex className="container" w={'50%'} direction={'column'} justify={'center'} align={'center'}>
                    <Heading p={'5px'} as={'h2'} color={'blue.500'}>Login</Heading>
                    <Text p={'5px'} color={'gray.500'} fontSize={'sm'}>Don't have an account?
                        <Text display='inline'
                              color={'gray.800'}
                        ><Link to={'/signup'}><b> Sign up</b></Link>
                        </Text>
                    </Text>

                    <Box w={'500px'} p={'20px'}>
                        <Button w={'100%'} mb={'20px'} colorScheme="facebook"
                                leftIcon={<FaFacebookSquare size={'1.75em'}/>}>
                            Login via facebook
                        </Button>

                        <FormControl id="email" w={'100%'} my={'10px'} color={'gray.500'}>
                            <Label label={'Email address'}/>
                            <Input type="email" name={'email'} onChange={hanldeChange}/>
                        </FormControl>
                        <FormControl id="password" w={'100%'} my={'10px'} color={'gray.500'}>
                            <Label label={'Password'}/>
                            <Input type="password" name='password' onChange={hanldeChange}/>
                        </FormControl>

                        <Button w={'100%'} mt={'30px'} mb={'20px'} colorScheme="green" onClick={handleLogin}>
                            Login our community
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
    }
;
export default Login;
import React, {useLayoutEffect, useState} from 'react';
import axios from 'axios'
import {Box, Flex,Heading, Icon, SimpleGrid,Text} from '@chakra-ui/react'
import {IoLogoGooglePlaystore} from 'react-icons/io5'
import {AiOutlineHome} from 'react-icons/ai'

const Home = (props) => {
    const [users, setUsers] = useState([])
    useLayoutEffect(async () => {
        const response = await axios.get("http://localhost:5000/api/users/", {
            headers: {
                "Authorization": localStorage.getItem('jwtToken') || ""
            }
        })
        if (response.data.msg) {
            props.history.push('/login')
        }
        if (response.data.length > 0) {
            setUsers(response.data)
        }

    }, [])

    return (
        <Flex direction={'row'}>
            <Box p={'30px'}>
                <Flex direction={'column'}>
                    <Icon as={IoLogoGooglePlaystore} mb={'30px'} fontSize={'2.5em'} color={'gray.500'}/>
                    <Icon as={AiOutlineHome} mb={'20px'} fontSize={'2em'} color={'gray.600'}/>
                </Flex>
            </Box>
            <Box w={'100%'} borderLeft='1px' borderColor={'gray.200'}>
                <Box borderBottom={'1px'} borderColor={'gray.200'}>
                    <Heading p={'20px'}>Dashboard</Heading>
                </Box>
                <SimpleGrid p={'20px'} columns={[3, null, 4]} spacing={10}>
                    {
                        users.length > 0 ? users.map(user => <Box px={'20px'} bgColor={'gray.100'}>
                            <Text p={'10px'}>Name: {user.firstname + " " + user.lastname}</Text>
                            <Text p={'10px'}>Email: {user.email}</Text>
                        </Box>) : null
                    }
                </SimpleGrid>
            </Box>
        </Flex>
    )
}

export default Home
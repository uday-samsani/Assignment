import React from 'react';

import {Flex, FormLabel,Icon, Spacer, Text} from '@chakra-ui/react';

import {VscSmiley} from 'react-icons/vsc';

const Label = ({label}) => {
    return (
        <FormLabel>
            <Flex direction={'row'}>
                <Text>{label}</Text>
                <Spacer/>
                <Icon as={VscSmiley} color={'green.400'} w={6} h={6}/>
            </Flex>
        </FormLabel>
    );
};

export default Label
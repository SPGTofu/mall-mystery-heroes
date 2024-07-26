import {
    Flex,
    Button,
    ModalOverlay,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, 
    AlertDialogContent,
    useDisclosure,

} from '@chakra-ui/react';
import React from 'react';
import { endGame } from './dbCalls';
import { useNavigate, Link as RouterLink } from 'react-router-dom';



const Endgamebutton = (roomID) => {
    const cancelRef = React.useRef();
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    
    const onYesEnd = async () => {
        onClose();
        endGame(roomID);
        navigate('/dashboard');
    }

    const handleClick = () => {
        onOpen();
    }

    return (
        <Flex>
            <Button bg = 'white'
                    color = 'black'
                    variant = 'solid'
                    size = 'lg'
                    borderRadius = '3xl'
                    _hover = {{bg: 'brand.400', color: 'white'}}
                    mt = '8px'
                    mb= '8px'
                    pos = 'absolute' 
                    right = '20px'
                    onClick = {handleClick}
            >End Game
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose = {onClose}
                size = '3xl'
            >

                <AlertDialogOverlay/>
                    <AlertDialogContent 
                        bg = '#202030'
                    >

                        <AlertDialogHeader alignItems='center'
                                            justifyContent='center'
                                            textAlign='center'>
                            Are you sure you want to end the Game?
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                                Go Back
                            </Button>
                            <Button colorScheme='green' onClick= {onYesEnd}>
                                Confirm End Game
                            </Button>
                        </AlertDialogFooter>

                    </AlertDialogContent>
            </AlertDialog>
        </Flex>
    )
}
export default Endgamebutton;
 

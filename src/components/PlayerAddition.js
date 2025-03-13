import React, {useState} from 'react';
import {Box, 
        Flex, 
        Image, 
        Input,
    } from '@chakra-ui/react';
import CreateAlert from './CreateAlert';
import enter from '../assets/enter-black.png';
import enterHovering from '../assets/enter-black-hover.png';
import { addPlayerForRoom } from './firebase_calls/dbCalls';

//adds player to database
const PlayerAddition = (props) => {
    const [playerName, setPlayerName] = useState(''); //defines player name
    const roomID = props.roomID;
    const onPlayerAdded = props.onPlayerAdded;
    const createAlert = CreateAlert();
    const [isHover, setIsHover] = useState(false);
    
    //setes playerName to input
    const handleInputChange = (event) => {
        setPlayerName(event.target.value);
    };

    //handles function to add player
    const handleAddPlayer = async () => {
        if (playerName.replace(/\s/g, '') === '') {
            return createAlert('error', 'Error', 'name cannot be blank', 1500);
        }
        try {
            await addPlayerForRoom(playerName, roomID);
        }
        catch (error) {
            console.error('Error adding player: ', error);
            return createAlert('error', 'Error', 'name already exists', 1500);
        }
        setPlayerName('');
        if (onPlayerAdded) onPlayerAdded(playerName);
    }

    //handles submission
    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddPlayer();
    }

    return ( 
        <div> 
            <form onSubmit={handleSubmit}>
                <Flex 
                    padding='10px' 
                    w = '100%'
                >
                    <Input
                        placeholder = "Enter Player Name"
                        value = {playerName}
                        onChange = {handleInputChange}
                        size = 'lg'
                        borderRadius = '3xl'
                        ml = '30%'
                        borderColor = 'black'
                        color = 'black'
                        borderWidth = '2px'
                        bg = '#9FF0AB'
                        _hover = {{borderColor: 'white', bg: '#9FF0AB'}}
                    />
                    <Box 
                        ml = '6px'
                    >
                        <Image 
                            src = {isHover ? enterHovering : enter}
                            onMouseEnter = {() => setIsHover(true)}
                            onMouseLeave = {() => setIsHover(false)}
                            onClick = {handleSubmit}
                            w = '30%'
                            h = '100%'
                        />
                    </Box>
                </Flex> 
            </form>
        </div>
           
        

    );
};

export default PlayerAddition;
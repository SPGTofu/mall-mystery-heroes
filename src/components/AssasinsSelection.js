import React, { useState } from 'react';
import { Flex, Select, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { db } from '../utils/firebase';
import { query, getDocs, collection, where } from "firebase/firestore";

const AssassinSelection = (props) => {
    const { roomID, getAssassinPlayerName, arrayOfAlivePlayers } = props;
    const [selectedAssassin, setSelectedAssassin] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = async (event) => {
        const newAssassin = event.target.value;
        setSelectedAssassin(newAssassin);
        setShowAlert(false);

        if (newAssassin === '') {
            setShowAlert(true);
            return;
        }

        const playerCollectionRef = collection(db, 'rooms', roomID, 'players');
        const playerQuery = query(playerCollectionRef, where('name', '==', newAssassin));

        try {
            const querySnapshot = await getDocs(playerQuery);
            if (querySnapshot.empty) {
                console.error("No documents found for the Assassin");
                return;
            }
            getAssassinPlayerName(newAssassin);
        } catch (error) {
            console.error('Error fetching player documents:', error);
        }
    };

    return (
        <form>
            <Flex padding='10px' direction="column" align="center">
                {showAlert && (
                    <Box mb={4} width="100%">
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Please select an Assassin</AlertTitle>
                            <AlertDescription>You need to choose an Assassin to proceed.</AlertDescription>
                        </Alert>
                    </Box>
                )}
                <Flex width="100%" justifyContent="center">
                    <Select 
                        id='assassin'
                        placeholder='Player Name'
                        value={selectedAssassin}
                        onChange={handleChange}
                    >
                        {arrayOfAlivePlayers.map((player, index) => (
                            <option key={index} value={player}>
                                {player}
                            </option>
                        ))}
                    </Select>
                </Flex>
            </Flex>
        </form>
    );
};

export default AssassinSelection;
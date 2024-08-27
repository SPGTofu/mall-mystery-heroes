import React, { useState, useEffect, useContext } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    VStack,
    Flex,
    Text
} from '@chakra-ui/react';
import { onSnapshot } from "firebase/firestore";
import { fetchAlivePlayersQueryByDescendPointsForRoom } from './dbCalls';
import { gameContext } from './Contexts';

const AlivePlayersList = () => {
    const { roomID } = useContext(gameContext);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    // Construct a query that gets all players in the room that are still alive, sorted by score
    const playerAlivePlayersQuery = fetchAlivePlayersQueryByDescendPointsForRoom(roomID);

    // Initialize state to keep track of the current list of players
    const [players, setPlayers] = useState([]); // array of player objects

    // When the component mounts, subscribe to the query and update the state whenever it changes
    useEffect(() => {

        // subscribe to changes in the query results
        const unsubscribe = onSnapshot(playerAlivePlayersQuery, (snapshot) => {

            // Get the updated list of players from the snapshot
            const updatedPlayers = snapshot.docs.map((doc) => ({
                name: doc.data().name,
                score: doc.data().score,
                targets: doc.data().targets,
                assassins: doc.data().assassins
            }));
            // Update the state with the new values
            setPlayers(updatedPlayers);
            setExpandedIndex(-1);
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
        // disabled next line because playerAlivePlayersQuery should not be in dependency array
        // eslint-disable-next-line
    }, []);

    const handleAccordionChange = (value) => {
        setExpandedIndex(value === expandedIndex ? -1 : value);
    }

    if (players.length === 0) {
        return null;
    }
    
    return (
        <Flex 
            background = 'transparent' 
            justifyContent = 'center'
        >
            <VStack 
                width = '100%'
            >
                 <Accordion 
                    width = '100%' 
                    allowToggle
                    index = {expandedIndex}
                >
                    {players.map((player) => (
                        <AccordionItem 
                            key = {player.name}
                        >
                            <Box 
                                textOverflow = 'ellipsis' 
                                marginTop = '2px' 
                                marginBottom = '2px'
                            >
                                <AccordionButton 
                                    fontSize = '25px'
                                    onClick = {() => handleAccordionChange(players.indexOf(player))}
                                >
                                    <Box 
                                        as = 'span' 
                                        flex = '1' 
                                        textAlign='left'
                                        overflow = 'hidden'
                                        textOverflow = 'ellipsis'
                                        whiteSpace = 'nowrap'
                                    >
                                        {player.name}
                                    </Box>
                                    <Box 
                                        as = 'span' 
                                        textAlign='right'
                                    >
                                        {player.score}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                            </Box>
                            <AccordionPanel 
                                pb = '3' 
                                fontSize = '20px'
                            >
                                <Text 
                                    pb = '12px'
                                >
                                    <Text
                                        as = 'b'
                                        color = 'red'
                                    > 
                                        Targets: 
                                    </Text> 
                                    {player.targets.map((target, index) => (
                                        <Text
                                            overflow = 'hidden'
                                            textOverflow = 'ellipsis'
                                            whiteSpace = 'nowrap'
                                            key = {index}
                                        >
                                            {index + 1}. {target}
                                        </Text>
                                    ))}
                                </Text>
                                <Text>
                                    <Text
                                        as = 'b'
                                        color = 'lightblue'
                                    >
                                        Assassins: 
                                    </Text> 
                                    {player.assassins.map((assassin, index) => (
                                        <Text
                                            overflow = 'hidden'
                                            textOverflow = 'ellipsis'
                                            whiteSpace = 'nowrap'
                                            key = {index}
                                        >
                                            {index + 1}. {assassin}
                                        </Text>
                                    ))}
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </VStack>
        </Flex>
    );
};

export default AlivePlayersList;

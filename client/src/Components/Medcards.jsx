import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Medcard from "../Components/MedCard"; // Import the Medcard component

const Medcards = () => {
    const [medcards, setMedcards] = useState([]);

    useEffect(() => {
        const fetchMedcards = async () => {
            try {
                const response = await axios.get('/api/medcards'); // Update with your API endpoint
                setMedcards(response.data);
            } catch (error) {
                console.error('Error fetching medcards:', error);
            }
        };

        fetchMedcards();
    }, []);

    return (
        <div>
            <h1>Medcards</h1>
            <div>
                {medcards.map(medcard => (
                    <Medcard 
                        key={medcard.id} 
                        medcard={medcard} 
                        isFutureMeeting={medcard.futureMeeting > new Date()}
                    />
                ))}
            </div>
        </div>
    );
};

export default Medcards;

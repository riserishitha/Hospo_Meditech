import  { useEffect, useState } from 'react';
import io from 'socket.io-client';

function DeliveryBoy() {
    const [location, setLocation] = useState({ lat: null, lng: null });

    useEffect(() => {
        const socketIo = io('https://hospo-fbdf.onrender.com');

        const sendLocationToServer = (lat, lng) => {
            const data = {
                name: 'Delivery Boy', 
                status: 'On the way',
                location: {
                    lat: lat,
                    lng: lng,
                },
            };
            socketIo.emit('updateLocation', data);
        };

            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lng: longitude });
                        sendLocationToServer(latitude, longitude);
                    },
                    (error) => console.error('Error fetching location', error),
                    { enableHighAccuracy: true,
                        timeout:5000,
                        maximumAge: 0
                     }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        
    }, []);

    return (
        <div>
            <h1>Delivery Boy - Location Tracker</h1>
            <p>Current Location:</p>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
        </div>
    );
}

export default DeliveryBoy;

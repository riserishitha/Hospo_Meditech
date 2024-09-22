import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function DeliveryBoy() {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize Socket.IO client and connect to server
        const socketIo = io('http://localhost:3000'); // Replace with your server address
        setSocket(socketIo);

        // Function to send location data to the server
        const sendLocationToServer = (lat, lng) => {
            const data = {
                name: 'Delivery Boy',  // You can replace this with the actual delivery boy's name
                status: 'On the way',
                location: {
                    lat: lat,
                    lng: lng,
                },
            };
            socketIo.emit('updateLocation', data);
        };

        // Get the current location every few seconds and send to server
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lng: longitude });
                        sendLocationToServer(latitude, longitude);
                    },
                    (error) => console.error('Error fetching location', error),
                    { enableHighAccuracy: true }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        // Update location every 5 seconds
        const locationInterval = setInterval(updateLocation, 5000);

        // Cleanup on unmount
        return () => {
            clearInterval(locationInterval);
            socketIo.disconnect();
        };
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

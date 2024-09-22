import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import io from 'socket.io-client';

// Import marker images
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Set default icon for markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

function TrackDelivery() {
    const [deliveryData, setDeliveryData] = useState(null);
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default map center
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize Socket.IO client and connect to server
        const socketIo = io('http://localhost:3000'); // Replace with your server address
        setSocket(socketIo);

        // Listen for delivery boy's location updates
        socketIo.on('deliveryLocationUpdate', (data) => {
            setDeliveryData(data);
            if (data && data.location) {
                setMapCenter([data.location.lat, data.location.lng]); // Update map center with new location
            }
        });

        // Cleanup the socket connection when component unmounts
        return () => {
            if (socketIo) {
                socketIo.disconnect();
            }
        };
    }, []);

    return (
        <div>
            <h1>Track Delivery Boy</h1>
            {deliveryData ? (
                <div>
                    <p><strong>Name:</strong> {deliveryData.name}</p>
                    <p><strong>Status:</strong> {deliveryData.status}</p>
                    <p><strong>Location:</strong> Lat: {deliveryData.location.lat}, Lng: {deliveryData.location.lng}</p>
                    
                    <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[deliveryData.location.lat, deliveryData.location.lng]}>
                            <Popup>
                                {deliveryData.name} is here!
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default TrackDelivery;

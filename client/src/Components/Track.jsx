import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { icon } from 'leaflet';
import io from 'socket.io-client';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

function TrackDelivery() {
    const [deliveryData, setDeliveryData] = useState(null);
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
    const [melong,setmelong]=useState("")
    const [melat, setmelat]=useState("")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position)=>{
            setmelat(position.coords.latitude);
            setmelong(position.coords.longitude);
        })

        const socketIo = io('https://hospo-fbdf.onrender.com'); 

        socketIo.on('deliveryLocationUpdate', (data) => {
            setDeliveryData(data);
            if (data && data.location) {
                setMapCenter([data.location.lat, data.location.lng]); 
            }
        });
    }, []);

    return (
        <div>
            <h1>Track Delivery Boy</h1>
            {deliveryData ? (
                <div>
                    <p><strong>Name:</strong> {deliveryData.name}</p>
                    <p><strong>Status:</strong> {deliveryData.status}</p>
                    <p><strong>Location:</strong> Lat: {deliveryData.location.lat}, Lng: {deliveryData.location.lng}</p>
                    
                    <MapContainer center={mapCenter} zoom={13} style={{ height: '60vh', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='Hospo'
                        />
                        <Marker position={[melat,melong]}icon={new icon({
                            iconUrl: "https://www.clipartmax.com/png/middle/188-1882796_red-home-icon-house-icon-red.png",
                            iconSize: [40,40], 
                            iconAnchor: [12, 41],
                        })}>
                        <Popup>
                                you are is here!
                            </Popup>
                        </Marker>
                        <Marker position={[deliveryData.location.lat, deliveryData.location.lng]} icon={new icon({
                            iconUrl: "https://www.creativehatti.com/wp-content/uploads/2021/10/Delivery-boy-is-going-on-scooter-for-pizza-delivery-5-small.jpg",
                            iconSize: [60, 71], 
                            iconAnchor: [12, 41],
                        })}>
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

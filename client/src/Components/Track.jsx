import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './Navbar';
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

        const socketIo = io('https://hospo.onrender.com'); 
        socketIo.emit("mylocation",melat,melong)

        socketIo.on('deliveryLocationUpdate', (data) => {
            setDeliveryData(data);
            if (data && data.location) {
                setMapCenter([data.location.lat, data.location.lng]); 
            }
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className='tracking-details-div'>
            <div className='tracking-div'>
                <div className='tracking-div-main'>
                <center><p className='line2-1'>Tracking details</p>
                <hr /><br />
                <p className='line4-1'>Name : Vinay</p>
                <p className='line4-1'>Phone no : +91 63011 81244</p>
                <p className='line4-1'>Estimated time : 40 Min</p>
                <p className='line4-1'>Payment mode : Cash on delivery</p>
                </center>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dus9hgplo/image/upload/v1727173987/xh1hjjfnbrbm3qus4zjy.jpg" alt="" className='delivery-boy-image' />
                </div>

            </div>
            {deliveryData ? (
                <div className='tracking-map'>       
                    <MapContainer center={mapCenter} zoom={28} className=' h-screen'>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='Hospo'
                        />
                        <Marker position={[melat,melong]}icon={new icon({
                            iconUrl: "https://res.cloudinary.com/dus9hgplo/image/upload/v1727150457/jdcxtpky1jw103pshbm5.png",
                            iconSize: [40,40], 
                            iconAnchor: [12, 41],
                        })}>
                        <Popup>
                                you are is here!
                            </Popup>
                        </Marker>
                        <Marker position={[deliveryData.location.lat, deliveryData.location.lng]} icon={new icon({
                            iconUrl: "https://res.cloudinary.com/dus9hgplo/image/upload/v1727150160/pfauaxctuemmit6vwswf.png",
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
        </div>
    );
}

export default TrackDelivery;
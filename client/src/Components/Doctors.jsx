import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Doctors() {
    const [doctors, setDoctors] = useState([]);

    // useEffect(() => {
    //     // Fetch doctors from API
    //     const fetchDoctors = async () => {
    //         const response = await fetch('/api/doctors');
    //         const data = await response.json();
    //         setDoctors(data);
    //     };
    //     fetchDoctors();
    // }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('../doctors.json');
            const data = await response.json();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);
    

    return (
        <div className="bg-DEFFDA min-h-screen p-8">
            <h1 className="text-3xl font-bold text-black mb-6">Doctors List</h1>
            <ul className="space-y-4">
                {doctors.map(doctor => (
                    <li key={doctor.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <span className="text-black font-bold">{doctor.name}</span>
                                <p className="text-gray-600">{doctor.description}</p>
                            </div>
                        </div>
                        <Link to={`/register/${doctor.id}`} className="bg-green-400 text-white hover:font-bold font-semibold">
                            Book Appointment
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Doctors;

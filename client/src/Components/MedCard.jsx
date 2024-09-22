import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const MedCard = ({ patientId, patientInfo, isFutureMeeting }) => {
    return (
        <div className="border border-black rounded-lg p-4 m-2 shadow-md bg-DEFFDA">
            {patientInfo && (
                <>
                    <h2 className="text-xl font-semibold mb-2 text-black">{patientInfo.name}</h2>
                    <p className="text-base text-black">{patientInfo.details}</p>
                    {isFutureMeeting && (
                        <button className="bg-green-500 text-black rounded px-4 py-2 mt-2 hover:bg-opacity-80 transition duration-200">
                            <Link to={`/meeting/${patientId}`}> Meet </Link>
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default MedCard;

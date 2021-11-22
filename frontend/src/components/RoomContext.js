import React, { createContext, useState } from 'react';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
    const [peers, setPeers] = useState([]);
    const [socketName, setSocketName] = useState([]);
    const [twoSocketName, setTwoSocketName] = useState([]);

    return (
        <RoomContext.Provider value={{ peers, setPeers, socketName, twoSocketName, setSocketName, setTwoSocketName }}>
            {children}
        </RoomContext.Provider>
    )
}

export  {RoomProvider,RoomContext};
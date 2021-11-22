import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { RoomContext } from '../RoomContext'

function PresentName() {
    const { socketName, twoSocketName} = useContext(RoomContext);
    const user = useSelector(selectUser);
    console.log('socketName', socketName);
    console.log('twoSocketName', twoSocketName);
    return (
        <div>
            <p>{user.name} - (me)</p>

            {socketName.map((item) => (
                <p>{item}</p>
            ))}

            {twoSocketName.map((two) => (
                <p>{two}</p>
            ))}
        </div>
    )
}

export default PresentName

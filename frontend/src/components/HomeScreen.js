import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../axios'


function HomeScreen() {
    const history  = useHistory();

    const [roomnames, setRoomnames] = useState([]);
    const [input, setInput] = useState("");   
    const [id, setId] = useState("");   

    useEffect(() => {
        axios.get('/')
        .then(response => {
          setRoomnames(response.data)
        })
    }, [])

    const sendName = async (e) => {
        e.preventDefault();
    
        await axios.post('/newroom', {
          "name": input
        });
    
        setInput('');
    }
    

    const go = (_id) =>
    {
        setId(_id)
        history.push("/meeting/" + _id);
    }

    
    console.log(id)
    
    
    return (
        <div>
            <form className="space-x-2">
                <input value={input} onChange={e => setInput(e.target.value)}
                placeholder="Type a Room Name" type="text"  className=" border border-gray-800" />
                <button onClick={sendName} type="submit" className="hidden" >Click</button>
            </form>

            <div>
            {roomnames.map(roomname => (
                <div className=" flex justify-between w-52">
                    <p>{roomname.name}</p>
                    <button 
                    className="border border-gray-900 w-20"
                    onClick={() => {
                        setId(roomname._id)
                        go(roomname._id)
                        
                    }
                        }>Join</button>
                    {/* <button type="button" onclick="alert('Hello World!')">Click Me!</button> */}
                </div>
            ))}
            </div>
        </div>
    )
}

export default HomeScreen

import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { selectUser } from './features/userSlice';
import CreateRoom from "./routes/CreateRoom";
import Login from './routes/Login';
import Profile from './routes/Profile';
import Room from "./routes/Room";

// import {RoomProvider} from './components/RoomContext';
import {RoomProvider} from './components/RoomContext';
function App() {
  const user = useSelector(selectUser);

  return (
    <RoomProvider>
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/" exact component={CreateRoom} />
            <Route path="/room/:roomID" component={Room} />
            <Route path="/profile" component={Profile} />
          </Switch>
        )}
      </BrowserRouter>
      
    </RoomProvider>
  );
}

export default App;

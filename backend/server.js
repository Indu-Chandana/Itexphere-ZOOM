require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const mongoData = require('./model')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb+srv://user:user123@cluster001.ibp2i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    () => console.log('DB connected')
).catch(err => console.log(err))

app.use(express.json());
app.use(cors());

app.post('/newroom', async (req, res) => {
    const dbData = req.body;
    console.log(dbData)
  
    try {
        const newData = new mongoData(dbData);
        await newData.save();
        return res.json(await mongoData.find())
    }
    catch(err){
        console.log(err.message);
    }
})

app.get('/get', (req, res) => {
    mongoData.find((err, data) => {
      if (err) {
          res.status(500).send(err)
      } else {
          res.status(200).send(data)
      }
    })
    
})


const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
        console.log(roomID)
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        

        socket.emit("all users", usersInThisRoom);
        socket.on("send message", body => {
            io.emit("message", body)
        })
    });

    // socket.on("new room", body => {
    //     io.emit("room", body)
    //     console.log(body)
    // });

    

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID, name: payload.name });
        
    });

    socket.on("returning signal", payload => {
        console.log(payload.name)
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id, name: payload.name  });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

// if (process.env.PROD) {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../client/build/index.html'));
//     });
// }

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));



// bookshelf-app/server/server.js



// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const socket_IO = require('socket.io') 
const path = require('path')


// Import routes
const flightRouter = require('./routes/flight-route')
const loginRouter = require('./routes/login-route')
const chatRouter = require('./routes/chat-route')

// Set default port for express app
const PORT = 4001 || process.env.PORT 

// Create express app
const app = express()
const chatapp = express()
const server = http.Server(app) 

const socketio = require('socket.io') //bring in socket.io
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');// add in utils 

const server2 = http.createServer(app)
const io = socketio(server)





// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Implement books route
app.use('/flights', flightRouter)
app.use('/login', loginRouter)
app.use('/chats', loginRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})


io.on("connection", (socket_io) => {
  console.log('User is connected successfully');
  socket_io.emit("connection", null);
  
  socket_io.on("disconnec=", () => {
    console.log('Sorry! User is unfortunately disconnected');
  })
})
// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})


//this is the START of CHATAPP

//Set static folder to be the public folder to access html files
chatapp.use(express.static(path.join(__dirname, 'public2')));

const botName = 'SafeTravels Admin'

//run when a client connects
io.on('connection', socket => {
    //When client connects...
    socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room); //method from users.js
    socket.join(user.room); 

    socket.join('')
   
    //Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to the SafeTravels Chat'));  //to single client

    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`)); //to all other clients but the client connecting
    
        //Send users and room info to sidebar
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });

    

    //Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            
            //Send users and room info to sidebar
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
        });
        }

        

    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg)); //we want to broadcast to everybdoy (including client)
    });
});

const PORT2 = 4002 || process.env.PORT;

server.listen(PORT2, () => console.log(`Server running on port ${PORT2}`)); 
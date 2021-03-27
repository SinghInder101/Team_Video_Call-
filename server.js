const express = require('express');
const app = express();


const {v4: uuidv4} = require('uuid');
const {ExpressPeerServer} = require('peer');
const server = require('http').Server(app);
const peerServer = ExpressPeerServer(server,{
    debug : true
})
app.set('view engine','ejs'); //First npm i ejs
app.use(express.static('public'));


const io = require('socket.io')(server);


app.use('/peerjs',peerServer);


app.get('/', (req,res) =>{

    res.redirect(`/${uuidv4()}`);

});

app.get('/:room',(req,res) => {
    res.render('room',{roomId:req.params.room})
})
io.on('connection',socket =>{
    socket.on('join-room',(roomId)=>{
        socket.join(roomId);
        socket.broadcast.emit('user-connected');
       
    })
});

server.listen(3030);
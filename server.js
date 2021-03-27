const express = require('express');
const app = express();

const {v4: uuidv4} = require('uuid');
const server = require('http').Server(app);
app.use(express.static('public'));


app.set('view engine','ejs'); //First npm i ejs

app.get('/', (req,res) =>{

    res.redirect(`/${uuidv4()}`);

});
app.get('/:room',(req,res) => {
    res.render('room',{roomId:req.params.room})
})


server.listen(3030);
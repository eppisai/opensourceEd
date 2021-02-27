const express = require('express')
const app = express()
const dotenv = require('dotenv')
var wav = require('wav');
var reader = new wav.Reader();
const bodyParser = require('body-parser')
//const fileAPI  = require('FileAPI')
//Load env vars
dotenv.config({path:'.env'})
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
const Event = require('./models/event')


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/user'));
app.use(express.json())

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/user', (req,res) => {
    res.render('index')
})

app.post('/save',async(req,res) => {
    try{
        // console.log(req.body.event.events[0]);
        await Event.create(req.body)
        res.status(200).json({sucess : true});
    }
    catch(error){
        console.log(error);
    }
    
})

app.get('/getevents',async(req,res) => {
    try{
        let events = await Event.find();
        res.send(events);
        res.status(200).json({sucess : true});
    }
    catch(error){
        console.log(error);
    }
    
})

app.get('/:creator', async(req,res) => {
    const video = await Event.find({creator: req.params.creator})
    res.send(video)
})


app.listen(process.env.PORT || 3000, ()=>{
   
  console.log("server is running")
})

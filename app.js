const express = require('express')
const mongoose= require('mongoose')
const session= require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const cors= require('cors')
const User = require('./models/User')
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const store = new MongoDBStore({
    uri: process.env.URI,
    collection: process.env.SESS
})
const authRoutes= require('./routes/auth')
const catRoute = require('./routes/Category')
const carRoute = require('./routes/Cars')
const brRoute= require('./routes/Brand')
app.set('view engine', 'ejs');
app.set('views','views');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
})
);
app.use((req,res,next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => {
        res.status(500).send(err);
    })
});
app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
   next();
})
app.use(authRoutes);
app.use(catRoute);
app.use(carRoute);
app.use(brRoute);
mongoose
  .connect(v.uri)
  .then(result => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    
  });

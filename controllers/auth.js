const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const user = require('../models/User');
const varr = require('../util/config');
const dotenv = require('dotenv')
dotenv.config();
const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
        process.env.APIKEY
      }
    })
  );
  exports.getLogin = (req, res, next) => {
    res.send('login');
  };
  exports.getSignup = (req, res, next) => {
    res.send('SignUp');
  };
  exports.postLogin =  (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
     user.findOne({ email: email })
     .then(user =>{   
        if (!user) {
         res.status(404).send('error');
        }
      })
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {        
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save((err)=>{
                   console.log(err);
                   res.status(200).send('login'); 
               });
              }
            });
            res.status(404).send('error');
           
  };

  exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const message ='Welcome'+ name; 
    const userDoc=user.findOne({ email: email })
      
        if (userDoc) {
          return res.send('email already exist');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new user({
              name: name,  
              email : email,
              password: hashedPassword,
              registrationDate: Date()  
            });
            return user.save();
          })
          .then(result => {
            res.send('signUp')
            return transporter.sendMail({
              to: email,
              from: process.env.EMAIL,
              subject: 'Signup succeeded!',
              text: message
            
            });
          })
          .catch(err => {
            res.status(404).send();
          });  
  };
  exports.postLogout = (req, res, next) => {
    req.session.destroy();
  };
  
  
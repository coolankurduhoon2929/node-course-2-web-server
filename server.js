const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();
//partials
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



//middleware
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method}:${req.url}`;
  console.log(log);
  fs.appendFile('serverlog.log',log+'\n');
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintainence.hbs');
// });
app.use(express.static(__dirname+'/public'));
//helper
hbs.registerHelper('getcurrentyear',()=>{
  // return 'test';
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  // res.send('<h1>Hello express</h1>');
  // res.send({
  //   name:'Vinay',
  //   age:'20'
  // });
  res.render('home.hbs',{
    pageTitle:'About page',
    // currentYear:new Date().getFullYear(),
    welcomeMessage:'Welcome to kaal website'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
    // currentYear:new Date().getFullYear()
  });
  // res.send('About page');
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to send request'
  });
});

//listening on port 3000
app.listen(3000,()=>{
  console.log('server is up on port 3000');
});

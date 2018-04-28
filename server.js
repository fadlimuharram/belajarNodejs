const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var mt = false;
var app = express();


hbs.registerPartials(__dirname +  '/views/partials');
hbs.registerHelper('tahun',()=>{
  return new Date().getFullYear()
});


hbs.registerHelper('hurufBesar',(text)=>{
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now  = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });

  next();
});

if(mt){
  app.use((req,res)=>{
    res.render('maintenance.hbs');
  })
}

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    title:'Ini Halaman Home'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    title:'Ini Halaman About'
  });
});

app.listen(3000,()=>{
  console.log('server is up on port 3000');
});






/*
app.get('/',(req,res)=>{
  res.send({
    nama:"fadli",
    kesukaan:[
      "programming",
      "coding"
    ]
  });
});
*/
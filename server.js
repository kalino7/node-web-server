//express library
const express = require('express');
//templating engine 
const hbs = require('hbs');

const app = express();

//adding partials
hbs.registerPartials(__dirname + '/views/partials');

//hbs makes use of .set method to set the template
//key value pair format
//by default the template has to be placed in a views folder
app.set('view engine', 'hbs');


// app.use((req, res, next)=>{
//    var now = new Date().toString();
//    console.log(`${now}: ${req.method} : ${req.url}`); 
//    next();
// });

app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});

//the app.use function is a middleware function
//this allows use to serve up a webpage
app.use(express.static(__dirname + '/public'));

// to avoid the duplication of year in the partials
//we could register the function using helpers
//and still call them directly as if they were passed in partials
//the registerHelper fxn takes 2 arguments
//first is the name of the function
//the second is a function of what the fxn[first argument] would do 
hbs.registerHelper('year', ()=>{
    //return the current year
    return new Date().getFullYear();
});

//registerHelper with fxn taking arguments
hbs.registerHelper('upper_case', (text)=>{
    return text.toUpperCase();
});

//the slash / used to dictate the root folder.

app.get('/', (req, res)=>{
    //req => request info for headers, body info etc.
    //res => response from the server.

    //automatically content-type: text/html
    // res.send('<h1>Hello, This is my First Web Server with Express library</h1>');
    
    //automatically content-type: application/json
    res.send({
        name: 'kali',
        likes: [
            'Balling',
            'Skating'
        ]
    });
    
} );

//another page route
app.get('/about', (req, res)=>{
    //res.send('About Page');
    //now we have an about.hbs page, all we do is to render it
    //res.render('about.hbs');
    //to make it more dynamic with values
    res.render('about.hbs', {
        title: 'About Page',
        // year: new Date().getFullYear()
        //year no longer needed cause of the register fxn
    });
});

app.get('/home', (req, res)=>{
    res.render('home.hbs', {
        title: 'Home',
        // year: new Date().getFullYear()
        //year no longer needed cause of the register fxn
    });
});

  //you need a port to listen, else it never gets to run
//   app.listen(3000);

  //.listen can actually take a second argument
  let ports = 3000;
app.listen(ports, ()=>{
    console.log(`localhost:${ports} server is Live` );
})
  
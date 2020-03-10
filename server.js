//express library
const express = require('express');
//templating engine 
const hbs = require('hbs');

const app = express();

//working with heroku, to deploy apps
//the port would definitely varry
//so we set it equall to the env.PORT or 3000 is the former isn't available
//in this case it could still run on both local machine and the heroku platform
//localhost would have the 3000, while when deployed the env.PORT comes alive
//also rememeber to edit the package.json file add a script below the test but
//inside the scripts {}

//for the package.json file, since it doesn't allow comments
// the start is a command that runs our node server.js when deployed on heroku
//we could now start our app from terminal using=> npm start
const port = process.env.PORT || 3000;

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

//this displays all the maintenance page irrespective of the page requested for
//especially used during backup or site maintenance to prevent other pages from showing up
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

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

app.get('/projects', (req, res)=>{
    res.render('project.hbs', {
        title: 'Projects', 
    });
});

  //you need a port to listen, else it never gets to run
//   app.listen(3000);

  //.listen can actually take a second argument
//   let ports = 3000;
app.listen(port, ()=>{
    console.log(`localhost:${port} server is Live` );
})
  
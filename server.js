const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} -- ${req.url}`

    fs.appendFile('server.log', log + '\n', (err) => {
       if (err) {
           console.log(err);
       }
    });
    console.log(log);
    next();
});

app.use((req, res, next) => {
   res.render('mainTenence.hbs', {
       pageTitle: 'maintenance page'
   })
});

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'home page',
       message: 'this is our homepage'
   });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about ali ghassabbshi'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fetch data'
    });
});

app.listen(3000);

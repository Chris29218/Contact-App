const { render } = require('ejs');
const express = require('express');
const path = require('path');
const port = 8000;

//setting db
const db = require('./config/mongoose');
const { create } = require('./models/contact');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// helps us to send in key value pairs
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware 1
// app.use(function(req, res, next){
//     console.log('middleware 1 called');
//     next();
// });

//middleware 2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     next();
// });

var contactList = [
    {
        name: "lulu",
        phone: "9999999999"
    },
    {
        name: "Nandu",
        phone: "98989898999"
    },
    {
        name: "Subham",
        phone: "987598989895"
    }
]

app.get('/', function(req, res){
    // console.log('from the get route controller', req.myName);
   
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db!!')
            return;
        }

        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });

    });
});

app.get('/create', function(req, res){
    return res.render('create', {
        title: "My Contacts"
    });
});

app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating contact!');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });

});

app.get('/delete-contact', function(req, res){
    // get the id from the query in the url
    let id = req.query.id;

    // find the contact in the database using id and del them
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in del contacts from db!!');
            return;
        }

        return res.redirect('back');
    });
    
});



app.listen(port, function(err){
    if(err){
        console.log('Error is there!');
    }

    console.log('yup! express server is up and running on port', port);
});
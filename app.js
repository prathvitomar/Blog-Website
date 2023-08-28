const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');
// const username = encodeURIComponent("prathvi_tomar");
// const password = encodeURIComponent("pt030499");
const app = express();
const dbURI = `mongodb+srv://prathvitomar030499:pt030499@blogdb.7xaamlp.mongodb.net/`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));
app.set('view engine','ejs');

// app.listen(3000);

app.use(express.static('public'))
app.use(morgan('dev'))


app.get('/', (req, res)=>{
    res.redirect('/blogs');
})

app.get('/blogs', (req, res)=>{
    Blog.find().sort({ createdAt: -1})
    .then((result)=>{
        res.render('index', { title: 'All Blogs', blogs : result})
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/about', (req,res)=>{
    res.render('about', { title : 'About'});
})

//Redirect to About 
app.get('/blogs/create',(req, res)=>{
    res.render('create', { title : 'Create'});
})

//Use function should be written at the last always.
app.use((req, res)=>{
    res.status(404).render('404', { title : '404'});
})


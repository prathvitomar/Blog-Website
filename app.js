const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('view engine','ejs');

app.listen(3000);

app.use(express.static('public'))
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    const blogs = [
        { title: 'Jujutsu Kaisen', snippet : 'New Gen Shounen Gem'},
        { title: 'Sakamoto Days', snippet : 'Most Entertaining Manga right now'}
    ]
    res.render('index', { title : 'Home', blogs});
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


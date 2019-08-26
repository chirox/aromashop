let express = require("express");
let app = express();
// Set puplic folder
app.use(express.static(__dirname + '/public'));

// Use view engine
let expressHbs = require("express-handlebars")
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Define your routines here

app.use('/',require('./routes/indexRouter'));
app.use('/products',require('./routes/productRouter'));

/*
app.get('/', (req,res) => {
    res.render('index');
});*/


app.get('/sync',(req,res)=>{
    let models =require('./models');
    models.sequelize.sync().then(()=>{
        res.send('Database sync completed!');
    });
});

app.get('/:page', (req,res) => {
    let page = req.params.page; 
    let banners = {
        'home': 'Home',
        'blog': 'Our Blog',
        'cart': 'Cart',
        'category': 'Category',
        'checkout': 'Checkout',
        'confirmation': 'Confirmation',
        'login': 'Login',
        'register': 'Register',
        'single-blog': 'Blog Details',
        'single-product': 'Shop Single',
        'tracking-order': 'Order Tracking'
    };
    res.render(page,{banner: banners[page]});
});

// Set server port & start server
app.set('port', process.env.PORT||5000);
app.listen( app.get('port'), ()=>{
    console.log(`Server runing at port ${app.get('port')}`);
});


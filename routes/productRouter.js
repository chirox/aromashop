let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    let categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data=>{
            res.locals.categories = data;
            let brandController = require('../controllers/brandController');
            return brandController.getAll();
        })
        .then(data=>{
            res.locals.brands = data;
            let colorController = require('../controllers/colorController');
            return colorController.getAll();            
        })
        .then(data=>{
            res.locals.colors = data;
            let productController = require('../controllers/productController');
            return productController.getAll();            
        })
        .then(data=>{
            res.locals.products = data;
            res.locals.banner = 'Shop';
            res.render('category');
        })
        .catch(error=>{
            console.log(error);
            return next(error);
        });
});

router.get('/:id',(req,res)=>{
    var id = req.params.id;
    let productController = require('../controllers/productController');
    productController.getById(id)
        .then(data=>{
            res.locals.product=data;
            res.locals.banner = data.name;
            let specificationController = require('../controllers/specificationController');    
            return specificationController.getByProductId(id);        
        })
        .then(data=>{
            res.locals.specifications=data;
            let commentController = require('../controllers/commentController');    
            return commentController.getByProductId(id); 
            
        })
        .then(data=>{
            res.locals.comments=data;
            let reviewController = require('../controllers/reviewController');    
            return reviewController.getByProductId(id); 
        })
        .then(data=>{
            res.locals.reviews=data;
            res.render('single-product');
        })
        .catch(error=>{
            console.log(error);
            return next(error);
        });    
});

module.exports =router;
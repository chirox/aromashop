let controller = {};
let models = require('../models');
let Product = models.Product;
controller.getTrendingProducts =()=>{
    return new Promise((resolve,reject)=>{
        Product
            .findAll({                
                include: [{model: models.Category}],
                limit: 8,
                order: [
                    ['overallReview','DESC']
                ],
                attributues:['id','name','imagepath','price']
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)));
    });
};
controller.getBestSellerProducts =()=>{
    return new Promise((resolve,reject)=>{
        Product
            .findAll({                
                include: [{model: models.Category}],
                limit: 8,
                order: [
                    ['overallReview','DESC']
                ],
                attributues:['id','name','imagepath','price']
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)));
    });
};
controller.getAll =()=>{
    return new Promise((resolve,reject)=>{
        Product
            .findAll({                
                include: [{model: models.Category}],
                limit: 9,                
                attributues:['id','name','imagepath','price']
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)));
    });
};
controller.getById =(id)=>{
    return new Promise((resolve,reject)=>{     
        let product;   
        Product
            .findByPk(id,{                
                include: [{model: models.Category}],                
                limit: 1,                                
            })
            .then(result=>{
                product = result;
                return models.ProductSpecification.findAll({
                    where: {productId: id},
                    include: [{model: models.Specification}]
                });
            })
            .then(productSpecifications =>{
                product.ProductSpecifications = productSpecifications;
                return models.Comment.findAll({
                    where: {productId: id},
                    include: [
                        {model: models.User},
                        {model: models.Comment, as: 'SubComments', include: [{model: models.User}]}
                    ]
                });
            })
            .then(comments =>{
                product.Comments =comments;
                return models.Review.findAll({
                    where: {productId: id},
                    include: [
                        {model: models.User},                        
                    ]
                });
            })
            .then(reviews =>{
                product.Reviews =reviews;
                let starts = [];
                for(let i=1; i<=5; i++){
                    starts.push(reviews.filter(item=>(item.rating===i)).length);
                }
                product.starts =starts;
                resolve(product);
            })            
            .catch(error=>reject(new Error(error)));
    });
};
module.exports = controller;
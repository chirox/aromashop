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
        Product
            .findByPk(id,{                
                include: [
                    {model: models.Category},
                    {model: models.Comment},
                ],                
                limit: 1,                
                attributues:['id','name','imagepath','price','summary','description','overallReview','reviewCount']
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)));
    });
};
module.exports = controller;
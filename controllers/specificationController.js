let controller = {};
let models = require('../models');
let ProductSpecification = models.ProductSpecification;
controller.getByProductId =(id)=>{
    return new Promise((resolve,reject)=>{
        ProductSpecification
            .findAll({
                attributues:['id','description'],
                include:[                    
                    {model: models.Specification}
                ],
                where: {
                    productId: id,
                },
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)));
    });
};
module.exports = controller;
let controller = {};
let models = require('../models');
let Review = models.Review;
controller.getByProductId =(id)=>{
    return new Promise((resolve,reject)=>{
        Review
            .findAll({
                attributues:['id','message', 'rating', 'createdAt'],
                include:[                                        
                    {
                        model: models.User
                    }
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
let controller = {};
let models = require('../models');
let Comment = models.Comment;
controller.getByProductId =(id)=>{
    return new Promise((resolve,reject)=>{
        Comment
            .findAll({
                order: [
                    ['id','ASC']                    
                ],
                attributues:['id','message', 'createdAt','parentCommentId'],
                include:[                    
                    {
                        model: models.Comment,
                        as: 'Parent'
                    },
                    {
                        model: models.User
                    }
                ],
                where: {
                    productId: id,
                }                
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)));
    });
};
module.exports = controller;
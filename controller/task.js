const response = require('../config/response');
const commonController = require('../helpers/common');
const model = require('../model');


module.exports = {
    getTask: async (payload) => {
        try {
            console.log(payload)
            let obj = await model.task.findAll({where : {user_id : payload.user_id}})
            return { ...obj };
    
        } catch (error) {
            throw error;
        }
    },
    addTask: async (payloadData) => {
        try {
            
			const schema = Joi.object({
				title: Joi.string().required(),
				description: Joi.string().required(),
				status: Joi.string().required(),
				dueDate: Joi.string().required(),
				user_id: Joi.any().required(),
			});
			let payload = await commonController.verifyJoiSchema(payloadData, schema);
            let task = await model.task.create(payload)
            task = task.toJSON()
            return { ...task };
    
        } catch (error) {
            throw error;
        }
    },
    deleteTask: async (payloadData) => {
        try {
            
			const schema = Joi.object({
				id: Joi.number().required(),
				user_id: Joi.any().required(),
			});
			let payload = await commonController.verifyJoiSchema(payloadData, schema);
            const {id} = payload
            const taskExists = await model.task.findOne({
                where: { id: payload.id, user_id: payload.user_id }
            });
            if(!taskExists) throw response.error_msg.taskNotFound
            const result = await model.task.destroy({
                where: { id: id, user_id : payload.user_id }
            });
            return { ...result };
        } catch (error) {
            throw error;
        }
    },
    
    updateTask: async (payloadData) => {
        try {
            const schema = Joi.object({
                id: Joi.number().required(),
				title: Joi.string().optional(),
				description: Joi.string().optional(),
				status: Joi.string().optional(),
				dueDate: Joi.string().optional(),
				user_id: Joi.any().required(),
			});
			let payload = await commonController.verifyJoiSchema(payloadData, schema);
            const taskExists = await model.task.findOne({
                where: { id: payload.id, user_id: payload.user_id }
            });
            if(!taskExists) throw response.error_msg.taskNotFound
            const result = await model.task.update(payload, {
                where: { id: payload.id ,user_id : payload.user_id }
            });
            
            return { ...result };
        } catch (error) {
            throw error;
        }
    },
    

}
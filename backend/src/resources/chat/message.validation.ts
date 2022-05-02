import Joi from 'joi'

const create = Joi.object({
    user: Joi.string().required(),
    message: Joi.string().required()
})

export default { create }
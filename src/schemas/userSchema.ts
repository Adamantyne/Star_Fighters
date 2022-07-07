import Joi from "joi"

const userSchema = Joi.object({
    firstUser: Joi.string().required(),
    secondUser: Joi.string().required()
});

export default userSchema;
import { generateJoiError } from "../helpers";

const Joi = require('@hapi/joi');

export const loginValidation = data => schema.validate(data, { "abortEarly": false });

const schema = Joi.object({
    "email": Joi.string().email().required(),
    "password": Joi.string().required()
}).error(errors => generateJoiError(errors));
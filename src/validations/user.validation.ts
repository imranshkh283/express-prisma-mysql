import Joi from "joi";

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default {
  createUserValidation,
};

import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  MONGO_NAME: Joi.string().required(),
});

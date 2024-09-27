import Joi from "joi";

const authorSchema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  birthDate: Joi.string().isoDate().required(),
});

export { authorSchema };

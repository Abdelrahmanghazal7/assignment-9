import joi from "joi";

export const signUpValidation = {
  body: joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      )
      .required(),
  }),
};

export const signInValidation = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      )
      .required(),
  }),
};

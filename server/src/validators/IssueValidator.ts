import Joi from 'joi';

export const createIssueSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
  }),
});

export const updateIssueSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
});

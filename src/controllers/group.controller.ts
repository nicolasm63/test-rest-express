import type { Request, Response } from "express";
import Joi from 'joi';
import { createGroup } from '../services/group.service';

const create = async (req: Request, res: Response) => {
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    creationDate: Joi.date().required(),
    studentIds: Joi.array().items(Joi.number()).required(),
    isActive: Joi.boolean(),
  });
  const { body } = req;

  const { error, value } = bodySchema.validate(body);

  if (error) {
    res.status(400);
    res.json({ error: 'Validation error', message: error.message });
  } else {
    // @TODO: consider adding generic try/catch block
    const group = await createGroup(value);
    res.json(group);
  }
};

export default { create };

import type { Request, Response } from "express";
import Joi from 'joi';
import { createGroup, updateGroup } from '../services/group.service';

const create = async (req: Request, res: Response) => {
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    creationDate: Joi.date().required(),
    studentIds: Joi.array().items(Joi.number()).required(),
    isActive: Joi.boolean(),
  });
  const { body } = req;

  const { error, value: validatedBody } = bodySchema.validate(body);

  if (error) {
    res.status(400);
    res.json({ error: 'Validation error', message: error.message });
  } else {
    // @TODO: consider adding generic try/catch block
    const group = await createGroup(validatedBody);
    res.json(group);
  }
};

const update = async (req: Request, res: Response) => {
  const paramsSchema = Joi.object({
    groupId: Joi.number().required(),
  });
  const bodySchema = Joi.object({
    studentIds: Joi.array().items(Joi.number()).required(),
  });
  const { params, body } = req;

  const { error: paramsError, value: validatedParams } = paramsSchema.validate(params);
  const { error: bodyError, value: validatedBody } = bodySchema.validate(body);

  if (paramsError) {
    res.status(400);
    res.json({ error: 'Params validation error', message: paramsError.message });
  } else if (bodyError) {
    res.status(400);
    res.json({ error: 'Body validation error', message: bodyError.message });
  } else {
    // @TODO: consider adding generic try/catch block
    const { groupId } = validatedParams;
    const group = await updateGroup(groupId, validatedBody);
    res.json(group);
  }
};

export default { create, update };

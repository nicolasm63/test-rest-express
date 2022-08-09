import type { Request, Response } from "express";
import Joi from 'joi';
import { createGroup, deleteGroup, updateGroup, validateGroupMembers } from '../services/group.service';

const create = async (req: Request, res: Response) => {
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    creationDate: Joi.date().required(),
    studentIds: Joi.array().items(Joi.number()).required(),
    isActive: Joi.boolean(),
  });
  const { body } = req;

  const { error: bodyError, value: validatedBody } = bodySchema.validate(body);

  if (bodyError) {
    res.status(400);
    res.json({ error: 'Body validation error', message: bodyError.message });
    return;
  }

  const { error: groupMembersError } = await validateGroupMembers(validatedBody.studentIds);

  if (groupMembersError) {
    res.status(400);
    res.json({ error: 'Group members validation error', message: groupMembersError.message });
    return;
  }

  // @TODO: consider adding generic try/catch block
  const group = await createGroup(validatedBody);
  res.status(201);
  res.json(group);
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
    return;
  }

  if (bodyError) {
    res.status(400);
    res.json({ error: 'Body validation error', message: bodyError.message });
    return;
  }

  const { error: groupMembersError } = await validateGroupMembers(validatedBody.studentIds);

  if (groupMembersError) {
    res.status(400);
    res.json({ error: 'Group members validation error', message: groupMembersError.message });
    return;
  }

  // @TODO: consider adding generic try/catch block
  const { groupId } = validatedParams;
  const group = await updateGroup(groupId, validatedBody);
  res.json(group);
};

// @TODO: generalize validation
const destroy = async (req: Request, res: Response) => {
  const paramsSchema = Joi.object({
    groupId: Joi.number().required(),
  });
  const { params } = req;

  const { error, value: validatedParams } = paramsSchema.validate(params);

  if (error) {
    res.status(400);
    res.json({ error: 'Params validation error', message: error.message });
    return;
  }

  // @TODO: consider adding generic try/catch block
  const { groupId } = validatedParams;
  await deleteGroup(groupId);

  res.json({ status: 'OK' });
}

export default { create, destroy, update };

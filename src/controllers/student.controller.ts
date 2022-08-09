import type { Request, Response } from "express";
import Joi from 'joi';
import { getAllStudents } from '../services/student.service';
import { GENDERS } from '../models';

const getAll = async (req: Request, res: Response) => {
  const querySchema = Joi.object({
    gender: Joi.string().valid(...GENDERS),
    bornBefore: Joi.date(),
    bornAfter: Joi.date().when('bornBefore', { is: Joi.exist(), then: Joi.date().less(Joi.ref('bornBefore')) }),
    hasLatinCourses: Joi.boolean(),
    hasMathsCourses: Joi.boolean(),
    hasEconomicsCourses: Joi.boolean(),
    search: Joi.string(),
  });
  const { query } = req;

  const { error, value: validatedQuery } = querySchema.validate(query);

  if (error) {
    res.status(400);
    res.json({ error: 'Query validation error', message: error.message });
  } else {
    // @TODO: consider adding generic try/catch block
    const students = await getAllStudents(validatedQuery);
    res.json(students);
  }
};

export default { getAll };

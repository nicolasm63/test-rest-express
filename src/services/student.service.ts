import { Student } from "../models";
import { omitBy, isNil } from 'lodash';
import { Op } from "sequelize";

const getAllStudents = async (
  { gender, bornBefore, bornAfter, hasLatinCourses, hasMathsCourses, hasEconomicsCourses, search },
) => {
  // Filtering
  let whereCondition = omitBy(
    { gender, hasLatinCourses, hasMathsCourses, hasEconomicsCourses },
    isNil,
  );

  if (!isNil(bornBefore)) {
    whereCondition = { ...whereCondition, birthdate: { [Op.lte]: bornBefore } };
  }

  if (!isNil(bornAfter)) {
    whereCondition = {
      ...whereCondition,
      birthdate: { ...whereCondition.birthdate, [Op.gte]: bornAfter },
    };
  }

  if (!isNil(search)) {
    const searchString = `%${search}%`;

    whereCondition = {
      ...whereCondition,
      [Op.or]: [
        { firstName: { [Op.iLike]: searchString } },
        { lastName: { [Op.iLike]: searchString } },
        { email: { [Op.iLike]: searchString } },
      ],
    };
  }

  return Student.findAll({ where: whereCondition, raw: true });
};

export { getAllStudents };

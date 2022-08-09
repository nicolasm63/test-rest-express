import { Group, Student, StudentGroup } from "../models";
import { difference, reduce } from 'lodash';

const getGroup = async (groupId: number) => {
  return Group.findByPk(groupId, {
    include: [{ model: Student }],
  })
}

// @TODO: use transactions to ensure to not edit the db on error
const createGroup = async ({ name, creationDate, isActive, studentIds }) => {
  const group = await Group.create({ name, creationDate, isActive }, { attributes: ['id'], raw: true }) as unknown as { id: number };

  const studentGroupsToCreate = studentIds.map((studentId) => ({ studentId, groupId: group.id }));
  await StudentGroup.bulkCreate(studentGroupsToCreate);

  return getGroup(group.id);
};

// @TODO: use transactions to ensure to not edit the db on error
const updateGroup = async (groupId, { studentIds }) => {
  const existingStudentGroup = await StudentGroup.findAll(
    { attributes: ['studentId'], where: { groupId }, raw: true },
  ) as unknown as Array<{ studentId: number }>;

  const existingStudentIds = existingStudentGroup.map((studentGroup) => studentGroup.studentId);

  const idsToRemove = difference(existingStudentIds, studentIds);
  await StudentGroup.destroy({ where: { groupId, studentId: idsToRemove }});

  const idsToInsert = difference(studentIds, existingStudentIds);
  const studentGroupsToCreate = idsToInsert.map((studentId) => ({ studentId, groupId }));
  await StudentGroup.bulkCreate(studentGroupsToCreate);

  return getGroup(groupId);
};

const deleteGroup = async (groupId) => {
  const group = await Group.findByPk(groupId);

  await group.destroy();
};

const validateGroupMembers = async (studentIds) => {
  const students = await Student.findAll({ where: { id: studentIds }, raw: true }) as unknown as Array<{ id: number }>;

  const missingIds = difference(studentIds, students.map((student) => student.id));

  if (missingIds.length !== 0) {
    return {
      error: {
        message: `Could not find the following student ids in the db: ${missingIds.join(', ')}`,
      },
    };
  }

  if (students.length > 10 || students.length < 3) {
    return {
      error: {
        message: `A group must have between 3 and 10 students, ${students.length} provided`,
      },
    };
  }

  // find the courses with at least one student in the group
  const selectedCourses = reduce(
    students,
    (alreadySelectedCourses, currentStudent) => {
      const hasLatin = alreadySelectedCourses.hasLatin || currentStudent.hasLatinCourses;
      const hasMaths = alreadySelectedCourses.hasMaths || currentStudent.hasMathsCourses;
      const hasEconomics = alreadySelectedCourses.hasEconomics
        || currentStudent.hasEconomicsCourses;

      return { hasLatin, hasMaths, hasEconomics };
    },
    { hasLatin: false, hasMaths: false, hasEconomics: false },
  );

  if (selectedCourses.hasLatin && selectedCourses.hasMaths && selectedCourses.hasEconomics) {
    return {
      error: {
        message: 'There can be at most two different courses in a single group',
      },
    };
  }

  return { error: null };
}

export { createGroup, deleteGroup, updateGroup, validateGroupMembers };

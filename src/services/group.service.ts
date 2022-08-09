import { Group, Student, StudentGroup } from "../models";
import { difference } from 'lodash';

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

export { createGroup, deleteGroup, updateGroup };

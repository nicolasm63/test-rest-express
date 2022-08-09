import { Group, Student, StudentGroup } from "../models";

const getGroup = async (groupId: number) => {
  return Group.findByPk(groupId, {
    include: [{ model: Student }],
  })
}

// @TODO: use transactions to ensure to not edit the db on error
const createGroup = async (
  { name, creationDate, isActive, studentIds },
) => {
  const group = await Group.create({ name, creationDate, isActive }, { attributes: ['id'], raw: true }) as unknown as { id: number };

  const studentGroupsToCreate = studentIds.map((studentId) => ({ studentId, groupId: group.id }));

  await StudentGroup.bulkCreate(studentGroupsToCreate);

  return getGroup(group.id);
};

export { createGroup };

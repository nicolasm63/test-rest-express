import { Group } from './group.model';
import { Student, GENDERS } from './student.model';
import { StudentGroup } from './student-group.model';

Student.belongsToMany(Group, { through: 'student_group', foreignKey: 'student_id' });
Group.belongsToMany(Student, { through: 'student_group', foreignKey: 'group_id' });

export { Group, Student, StudentGroup, GENDERS };
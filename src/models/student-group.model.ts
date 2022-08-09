import { DataTypes } from "sequelize";
import sequelize from "../db/db"; // @TODO: find a cleaner way to do this, or at least rename it

const StudentGroup = sequelize.define('studentGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, { tableName: 'student_group', underscored: true });

export { StudentGroup };

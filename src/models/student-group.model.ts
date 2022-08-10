import { DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";

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

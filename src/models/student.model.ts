import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const GENDERS = ['male', 'female'];

const Student = sequelize.define('student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM(...GENDERS),
    allowNull: false,
  },
  hasLatinCourses: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  hasMathsCourses: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  hasEconomicsCourses: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { tableName: 'student', underscored: true });

export { GENDERS, Student };

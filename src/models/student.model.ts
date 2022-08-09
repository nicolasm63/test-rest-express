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
  has_latin_courses: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  has_maths_courses: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  has_economics_courses: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { underscored: true, timestamps: false });

export { GENDERS, Student };

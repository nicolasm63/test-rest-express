import { DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";

const Group = sequelize.define('group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, { tableName: 'group', underscored: true });

export { Group };

import { DataTypes } from "sequelize";
import sequelize from "../db/db"; // @TODO: find a cleaner way to do this, or at least rename it

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

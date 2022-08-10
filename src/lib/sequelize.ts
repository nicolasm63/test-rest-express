import { Sequelize } from 'sequelize';

// @TODO: have connection data coming from config
// @TODO: consider changing location of this file
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/postgres',
  { define: { freezeTableName: true, timestamps: false } },
);

export default sequelize;

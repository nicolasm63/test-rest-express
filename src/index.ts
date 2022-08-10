import express from 'express';
import sequelize from './lib/sequelize';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/', routes);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(3000, () =>
  console.log("🚀 Server ready at: http://localhost:3000"),
)
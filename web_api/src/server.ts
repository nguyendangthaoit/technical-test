require('dotenv').config();
import App from './app';
import validateEnv from './utils/validateEnv';
import EmployeeController from './controllers/employee.controller';

validateEnv();
const app = new App(
  [,
    new EmployeeController(),
  ],
);
app.listen();

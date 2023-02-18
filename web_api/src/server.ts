require('dotenv').config();
import App from './app';
import validateEnv from './utils/validateEnv';
import EmployeeController from './controllers/employee.controller';
import CafeController from './controllers/cafe.controller';
validateEnv();
const app = new App(
  [,
    new EmployeeController(),
    new CafeController(),
  ],
);
app.listen();

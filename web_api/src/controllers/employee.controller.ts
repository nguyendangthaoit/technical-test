import Controller from "interfaces/controller.interface";
import * as express from 'express';
import * as multer from "multer";
import CafeService from './../services/cafe.service';
import validationMiddleware from "../middlewares/validation.middleware";
import { EmployeeCreateVal, EmployeeUpdateVal } from "../validates/employee.validate";

class EmployeeController implements Controller {

    public router = express.Router();
    public path = '';
    public cafeService = new CafeService();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .get(this.path + '/employees', this.getEmployees)
            .post(this.path + '/employee', validationMiddleware(EmployeeCreateVal), this.createEmployee)
            .put(this.path + '/employee', validationMiddleware(EmployeeUpdateVal), this.updateEmployee)
            .delete(this.path + '/employee' + '/:id', this.delEmployee)
    }


    private getEmployees = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const employees = await this.cafeService.getEmployees(request.query);
            response.send({
                status: 200,
                employees
            });
        } catch (error) {
            next(error);
        }
    }

    private createEmployee = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.cafeService.createEmployee(request.body);
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }
    }

    private updateEmployee = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.cafeService.UpdateEmployee(request.body);
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }
    }
    private delEmployee = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.cafeService.delEmployee(request.params.id);
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }
    }

}
export default EmployeeController;
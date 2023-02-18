import * as mongoose from 'mongoose';
import { EmployeeInterface } from '../interfaces/employee.interface';
import EmployeeModel from '../models/employee.model'
import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/httpException';
class EmployeeService {
    public employee = EmployeeModel;

    public async create(req: EmployeeInterface) {
        // if (await this.account.findOne({ id: req.id })) {
        //     throw new HttpException(500, `Account ${req.account_name} is exist.`);
        // }
        // if (await this.account.findOne({ email: req.email })) {
        //     throw new HttpException(500, `Email ${req.email} is exist.`);
        // }
        let result = await this.employee.create(
            {
                id: req.id,
                name: req.name,
                email_address: req.email_address,
                phone_number: req.phone_number,                
                gender: req.gender,               
            }
        );
        if (!result._id) {
            return false;
        }
        return true;
    }
}
export default EmployeeService;
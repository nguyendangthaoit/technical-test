import { EmployeeInterface } from "../interfaces/employee.interface";
import * as jwt from 'jsonwebtoken';

export default class AuthenHelper {

    createToken(employee: EmployeeInterface) {
        //  const expiresIn = 3 * 60 * 60; // 3 hours
        // const expiresIn = 2 * 60; // 2'
        // const secret = process.env.JWT_SECRET;
        // const dataStoredInToken: DataStoredInToken = {
        //     _id: employee._id,
        // };
        // return {
        //     expiresIn,
        //     token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        // };
    }
}


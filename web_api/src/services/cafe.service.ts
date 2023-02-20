import * as mongoose from 'mongoose';
import { CafeInterface } from '../interfaces/cafe.interface';
import { EmployeeInterface } from '../interfaces/employee.interface';
import CafeModel from '../models/cafe.model'
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import HttpException from '../exceptions/httpException';
class CafeService {
    public cafe = CafeModel;


    public async getCafes(req: any) {
        let query: any = {};
        if (req.location)
            query.location = req.location;
        return await this.cafe.aggregate([
            {
                $match: query
            },
            {
                $project: {
                    "_id": 0,
                    "id": 1,
                    "name": 1,
                    "description": 1,
                    "logo": 1,
                    "location": 1,
                    "employees": {
                        "$size": { "$ifNull": ["$employees", []] }
                    }
                }
            },
            {
                $sort: {
                    'employees': -1
                }
            },
        ]);

    }
    public async getEmployees(req: any) {
        let query: any = {};
        if (req.cafe)
            query.name = req.cafe;
        return await this.cafe.aggregate([
            {
                $match: query
            },
            { $unwind: '$employees' },
            {
                $project: {
                    "_id": 0,
                    "id": "$employees.id",
                    "name": "$employees.name",
                    "email_address": "$employees.email_address",
                    "phone_number": "$employees.phone_number",
                    "gender": "$employees.gender",
                    "cafe": "$name",
                    "cafe_id": "$id",
                    "days_worked": {
                        $trunc: {
                            $divide: [{ $subtract: [new Date(), "$employees.startedAt"] }, 1000 * 60 * 60 * 24]
                        }
                    }
                }
            },
            {
                $sort: {
                    'days_worked': -1
                }
            },
        ]);

    }
    public async createCafe(req: CafeInterface) {
        if (await this.cafe.findOne({ name: req.name })) {
            throw new HttpException(500, `Name ${req.name} is exist.`);
        }
        let result = await this.cafe.create(
            {
                id: uuid.v1(),
                name: req.name,
                description: req.description,
                logo: req.logo,
                location: req.location,
            }
        );
        if (!result._id) {
            return false;
        }
        return true;
    }
    public async createEmployee(req: any) {

        const cafe = await this.cafe.findOne({ id: req.cafe_id });
        if (!cafe) {
            throw new HttpException(500, `Cafe is not exist.`);
        }
        const id = await this.generateId();
        const result = await this.cafe.updateOne(
            {
                id: req.cafe_id
            },
            {
                updatedAt: new Date(),
                employees: [...cafe.employees,
                {
                    id,
                    name: req.name,
                    email_address: req.email_address,
                    phone_number: req.phone_number,
                    gender: req.gender,
                    startedAt: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }]
            }
        );
        return result.nModified >= 1;
    }
    private async generateId(): Promise<string> {
        const id = `UI${Array.from(Array(7), () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase()}`;
        if (await this.checkExistsId(id)) return this.generateId();
        return id;
    }
    private async checkExistsId(id: string) {
        const result: any = await this.cafe.countDocuments({ "employees.id": id });
        return result >= 1;
    }
    public async UpdateCafe(req: CafeInterface) {

        const cafe = await this.cafe.findOne({ id: req.id });
        if (!cafe) {
            throw new HttpException(500, `Cafe is not exist.`);
        }
        const result = await this.cafe.updateOne(
            {
                id: req.id
            },
            {
                name: req.name,
                description: req.description,
                logo: req.logo,
                location: req.location,
                updatedAt: new Date(),
            }
        );
        return result.nModified >= 1;
    }
    public async UpdateEmployee(req: any) {

        const cafe = await this.cafe.findOne({ id: req.cafe_id });
        if (!cafe) {
            throw new HttpException(500, `Cafe is not exist.`);
        }

        const existCafe = await this.cafe.findOne({ id: { $ne: req.cafe_id }, "employees.id": req.id });
        if (existCafe) {
            // remove employee from old cafe;
            const newEmployees = existCafe.employees.filter(x => x.id !== req.id);
            await this.cafe.updateOne(
                {
                    id: existCafe.id
                },
                {
                    updatedAt: new Date(),
                    employees: newEmployees
                }
            );

            // add employee to new cafe
            const result = await this.cafe.updateOne(
                {
                    id: req.cafe_id
                },
                {
                    updatedAt: new Date(),
                    employees: [...cafe.employees,
                    {
                        id: req.id,
                        name: req.name,
                        email_address: req.email_address,
                        phone_number: req.phone_number,
                        gender: req.gender,
                        startedAt: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }]
                }
            );
            return result.nModified >= 1;
        } else {
            // update data
            const index = cafe.employees.findIndex(x => x.id == req.id);
            cafe.employees[index].name = req.name;
            cafe.employees[index].email_address = req.email_address;
            cafe.employees[index].phone_number = req.phone_number;
            cafe.employees[index].gender = req.gender;
            cafe.employees[index].updatedAt = new Date();

            const result = await this.cafe.updateOne(
                {
                    id: req.cafe_id
                },
                {
                    updatedAt: new Date(),
                    employees: [...cafe.employees]
                }
            );
            return result.nModified >= 1;
        }
    }
    public async delCafe(id: string) {
        let result = await this.cafe.deleteOne({ id });
        return result.deletedCount == 1;
    }
    public async delEmployee(id: string) {
        let cafe = await this.cafe.findOne({ "employees.id": id });
        const employees = cafe.employees.filter(x => x.id != id);
        const result = await this.cafe.updateOne(
            {
                "employees.id": id
            },
            {

                employees,
                updatedAt: new Date(),
            }
        );
        return result.nModified >= 1;
    }
}
export default CafeService;
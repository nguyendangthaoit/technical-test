import * as mongoose from 'mongoose';
import { CafeInterface } from '../interfaces/cafe.interface';
import CafeModel from '../models/cafe.model'
import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/httpException';
class CafeService {
    public cafe = CafeModel;

    public async create(req: CafeInterface) {
        // if (await this.account.findOne({ id: req.id })) {
        //     throw new HttpException(500, `Account ${req.account_name} is exist.`);
        // }
        // if (await this.account.findOne({ email: req.email })) {
        //     throw new HttpException(500, `Email ${req.email} is exist.`);
        // }
        let result = await this.cafe.create(
            {
                id: req.id,
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
}
export default CafeService;
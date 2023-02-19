import Controller from "interfaces/controller.interface";
import * as express from 'express';
import { SendEmailHelper } from "../helper/sendEmailHelper";
import * as multer from "multer";
import { Email_Send_Subject } from '../utils/constans'
import CafeService from './../services/cafe.service';
import validationMiddleware from "../middlewares/validation.middleware";
import { CafeCreateVal, CafeUpdateVal } from "../validates/cafe.validate";
import { EmployeeCreateVal, EmployeeUpdateVal } from "../validates/employee.validate";
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            if (file.mimetype.includes('image'))
                next(null, 'src/uploads/images');
            else
                next(null, 'src/uploads/files');
        },
        filename: function (req, file, next) {
            if (file.mimetype.includes('image')) {
                const ext = file.mimetype.split('/')[1];
                next(null, "image" + '-' + Date.now() + '.' + ext);
            } else {
                next(null, Date.now() + '-' + file.originalname);
            }

        },
    })
});

class EmployeeController implements Controller {

    public router = express.Router();
    public path = '';
    public cafeService = new CafeService();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .post(this.path + "/uploadImg", upload.single("img"), this.uploadImg)
            .get(this.path + '/getImg' + '/:img', this.getImg)
            .get(this.path + '/cafes', this.getCafes)
            .get(this.path + '/employees', this.getEmployees)
            .post(this.path + '/cafe', validationMiddleware(CafeCreateVal), this.createCafe)
            .post(this.path + '/employee', validationMiddleware(EmployeeCreateVal), this.createEmployee)
            .put(this.path + '/cafe', validationMiddleware(CafeUpdateVal), this.updateCafe)
            .put(this.path + '/employee', validationMiddleware(EmployeeUpdateVal), this.updateEmployee)
            .delete(this.path + '/cafe' + '/:id', this.delCafe)
            .delete(this.path + '/employee' + '/:id', this.delEmployee)
    }

    private uploadImg = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        if (!request.file) {
            return response.send({
                status: 400,
                message: "There is no updated file",
            });
        }
        return response.send({
            img_path: request.file.filename
        });
    };

    private getImg = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const image = request.params.img;
        return response.sendFile(process.cwd() + '/src/uploads/images/' + image, (error) => {
            if (error)
                response.send(error.message);
        });
    }

    private getCafes = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const cafes = await this.cafeService.getCafes(request.query);
            response.send({
                status: 200,
                cafes
            });
        } catch (error) {
            next(error);
        }
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

    private createCafe = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.cafeService.createCafe(request.body);
            response.send({
                status: result,
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

    private updateCafe = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.cafeService.UpdateCafe(request.body);
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
    private delCafe = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.cafeService.delCafe(request.params.id);
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
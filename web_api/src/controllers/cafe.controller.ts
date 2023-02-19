import Controller from "interfaces/controller.interface";
import * as express from 'express';
import { SendEmailHelper } from "../helper/sendEmailHelper";
import * as multer from "multer";
import { Email_Send_Subject } from '../utils/constans'
import CafeService from './../services/cafe.service';
import validationMiddleware from "../middlewares/validation.middleware";
import { CafeCreateVal } from "../validates/cafe.validate";
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
    public path = '/cafe';
    public cafeService = new CafeService();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .post(this.path + "/uploadImage", upload.single("image"), this.uploadImage)
            .get(this.path + '/getImage' + '/:image', this.getImage)
            .post(this.path + '/save', this.save)
            .post(this.path + '/create',validationMiddleware(CafeCreateVal),  this.create)
    }

    private uploadImage = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        if (!request.file) {
            return response.send({
                status: -1,
                message: "don't have file",
            });
        }
        return response.send({
            logo_path: request.file.filename
        });
    };

    private getImage = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const image = request.params.image;
        return response.sendFile(process.cwd() + '/src/uploads/images/' + image, (error) => {
            if (error)
                response.send(error.message);
        });
    }

    private save = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            if (request.body) {
                let sendString = `
                <div style="width: 70%">
                    <p>&nbsp;</p>
                    <h4>Hi ${request.body.firstName} ${request.body.lastName}</h4>

                    <p> You have created new Employee successfully. </p>
                    <p><span style="font-weight: 600"> Description :</span> <span>${request.body.description}</span></p>
                    <p>&nbsp;</p>
                   
                    <p>Thank you and best regards</p>
                    <p>Thao</p>
                </div>
             `
                var attachments: any[] = [];
                for (const e of request.body.images) {
                    attachments = [...attachments, {
                        filename: e,
                        path: 'src/uploads/images/' + e,
                    }]
                }
                await SendEmailHelper(request.body.email, Email_Send_Subject, '', sendString, attachments);
            }
            response.send({
                status: true,
            });
        } catch (error) {
            next(error);
        }

    }
    private create = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.cafeService.create(request.body);
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }

    }
}
export default EmployeeController;
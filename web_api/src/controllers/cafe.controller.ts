import Controller from "interfaces/controller.interface";
import * as express from 'express';
import * as multer from "multer";
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

class CafeController implements Controller {

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
            .post(this.path + '/cafe', validationMiddleware(CafeCreateVal), this.createCafe)
            .put(this.path + '/cafe', validationMiddleware(CafeUpdateVal), this.updateCafe)
            .delete(this.path + '/cafe' + '/:id', this.delCafe)
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

}
export default CafeController;

import { IsDefined } from 'class-validator';


export class CafeCreateVal {

    @IsDefined({
        message: "Name is required"
    })
    name: string;


    @IsDefined({
        message: "Description is required"
    })
    description: string;


    @IsDefined({
        message: "Location is required"
    })
    location: string;
}

export class CafeUpdateVal extends CafeCreateVal {

    @IsDefined({
        message: "Id is required"
    })
    id: string;
}
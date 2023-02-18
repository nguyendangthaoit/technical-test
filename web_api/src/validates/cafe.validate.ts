import { IsDefined } from 'class-validator';


export class CafeCreateVal {

    @IsDefined({
        message: "Id is required"
    })
    id: string;


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









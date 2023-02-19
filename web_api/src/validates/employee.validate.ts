import { Length, IsDefined, Matches } from 'class-validator';


export class EmployeeCreateVal {

    @IsDefined({
        message: "Id is required"
    })
    @Length(9, 9, {
        message: "Id must have 9 alphanumeric"
    })
    @Matches(/^(UI)/, {
        message: "Id must Starts with UI"
    })
    id: string;


    @IsDefined({
        message: "Name is required"
    })
    name: string;


    @IsDefined({
        message: "Email_address is required"
    })
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: "Email_address must Follows typical email address format"
    })
    email_address: string;


    @IsDefined({
        message: "Phone_number is required"
    })
    @Length(8, 8, {
        message: "Phone_number must have 8 digits"
    })
    @Matches(/^[89]/, {
        message: "Phone_number must Starts with either 8 or 9"
    })
    phone_number: string;


    @IsDefined({
        message: "Gender is required"
    })
    gender: string;
}









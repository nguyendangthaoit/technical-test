import {
    IsString, IsEmail, Length, MinLength, MaxLength, IsNotEmpty, IsDefined,
    ValidationArguments
} from 'class-validator';

export class EmployeeCreateVal {

    // @IsDefined({
    //     message: "Account is required"
    // })
    // account_name: string;

    // @IsDefined({
    //     message: "Email is required"
    // })
    // @IsEmail()
    // email: string;

    // @IsDefined({
    //     message: "Password is required"
    // })
    // password: string;
}

// export class EmployeeUpdateVal {

//     @IsDefined({
//         message: "Account is required"
//     })
//     account_name: string;

//     @IsDefined({
//         message: "Email is required"
//     })
//     @IsEmail()
//     email: string;

// }








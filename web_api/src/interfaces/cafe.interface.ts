import { EmployeeInterface } from "./employee.interface";

export interface CafeInterface {
    id: string;
    name: string;
    description: string;
    logo: string;
    location: string;
    employees : EmployeeInterface[];
    createdAt: Date;
    updatedAt: Date;
}

import * as mongoose from 'mongoose';
import { EmployeeInterface } from '../interfaces/employee.interface';

const EmployeeSchema = new mongoose.Schema({

    id: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true, required: true },
    email_address: { type: String, trim: true, required: true },
    phone_number: { type: String, trim: true, required: true },
    gender: { type: String, enum: ['Male', 'Female'], trim: true, required: true, default: 'Male' },

}, { versionKey: false, timestamps: true });

EmployeeSchema.set('collection', 'Employee');

const employeeSchema = mongoose.model<EmployeeInterface & mongoose.Document>('Employee', EmployeeSchema);

export default employeeSchema;
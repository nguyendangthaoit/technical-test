import * as mongoose from 'mongoose';
import { CafeInterface } from '../interfaces/cafe.interface';

const CafeSchema = new mongoose.Schema({

    id: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true, required: true, unique: true, },
    description: { type: String, trim: true, required: true },
    logo: { type: String, trim: true },
    location: { type: String, trim: true, required: true },
    employees: [
        {
            id: { type: String, trim: true, required: true, unique: true, length: 9 },
            name: { type: String, trim: true, required: true },
            email_address: { type: String, trim: true, required: true },
            phone_number: { type: String, trim: true, required: true, length: 8 },
            gender: { type: String, enum: ['Male', 'Female'], trim: true, required: true, default: 'Male' },
            startedAt: { type: Date, default: new Date(), required: true },
            createdAt: { type: Date, default: new Date() },
            updatedAt: { type: Date, default: new Date() }
        }
    ]

}, { versionKey: false, timestamps: true });

CafeSchema.set('collection', 'Cafe');

const cafeSchema = mongoose.model<CafeInterface & mongoose.Document>('Cafe', CafeSchema);

export default cafeSchema;
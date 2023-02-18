import * as mongoose from 'mongoose';
import { CafeInterface } from '../interfaces/cafe.interface';

const CafeSchema = new mongoose.Schema({

    id: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    logo: { type: String, trim: true },
    location: { type: String, trim: true, required: true },

}, { versionKey: false, timestamps: true });

CafeSchema.set('collection', 'Cafe');

const cafeSchema = mongoose.model<CafeInterface & mongoose.Document>('Cafe', CafeSchema);

export default cafeSchema;
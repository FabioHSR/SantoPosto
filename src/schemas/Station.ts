import { model, Model, Schema, Document } from "mongoose";

export interface IStation extends Document {
    CNPJ: string;
    company_name: string;
    address: string;
    complement: string;
    district: string;
    zip_code: Number;
    FU: string;
    city: string;
    distributor: string;
    authorization_code: string;
    authorization_date: Date;
    simp: Number;
}

const StationSchema: Schema = new Schema({
    CNPJ: {
        type: String,
        require: true,
        readonly: true
    },
    company_name: {
        type: String,
        require: true,
        readonly: true
    },
    address: {
        type: String,
        require: true,
        readonly: true
    },
    complement: {
        type: String,
        require: true,
        readonly: true
    },
    district: {
        type: String,
        require: true,
        readonly: true
    },
    zip_code: {
        type: Number,
        require: true,
        readonly: true
    },
    FU: {
        type: String,
        require: true,
        readonly: true
    },
    city: {
        type: String,
        require: true,
        readonly: true
    },
    distributor: {
        type: String,
        require: true,
        readonly: true
    },
    authorization_code: {
        type: String,
        require: true,
        readonly: true
    },
    authorization_date: {
        type: Date,
        require: true,
        readonly: true
    },
    simp: {
        type: Number,
        require: true,
        readonly: true
    },
}, {
    timestamps: true
})

export const Station: Model<IStation> = model<IStation>('Station', StationSchema)
import { model, Model, Schema, Document } from "mongoose";

export interface IStation extends Document {
    CNPJ: string;
    company_name: string;
    address: string;
    complement: string;
    district: string;
    zip_code: number;
    FU: string;
    city: string;
    distributor: string;
    authorization_code: string;
    authorization_date: Date;
    simp: number;
    rating: number;
    coord: ILatLng;
}
export interface ILatLng extends Document {
    lat: Number;
    lng: Number;
}

const StationSchema: Schema = new Schema({
    CNPJ: {
        type: String,
        require: true,
    },
    company_name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    complement: {
        type: String,
    },
    district: {
        type: String,
    },
    zip_code: {
        type: Number,
        require: true,
    },
    FU: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    distributor: {
        type: String,
        require: true,
    },
    authorization_code: {
        type: String,
    },
    authorization_date: {
        type: Date,
    },
    simp: {
        type: Number,
    },
    rating: {
        type: Number,
        required: true
    },
    coord: {
        lat: Number,
        lng: Number
    }
}, {
    timestamps: true
})

export const Station: Model<IStation> = model<IStation>('Station', StationSchema)
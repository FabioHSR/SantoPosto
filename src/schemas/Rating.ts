import { model, Model, Schema, Document } from "mongoose";

export interface IRating extends Document {
    user_id: string;
    user_name: string;
    station_id: string;
    rate: Number;
    description: string;
}

const RatingSchema = new Schema({
    user_id: {
        type: String,
        require: true,
        readonly: true
    },
    user_name: {
        type: String,
        require: true,
        readonly: true
    },
    station_id: {
        type: String,
        require: true,
        readonly: true
    },
    rate: {
        type: Number,
        require: true,
        readonly: true
    },
    description: {
        type: String,
        readonly: true
    }
}, {
    timestamps: true
})

export const Rating: Model<IRating> = model<IRating>('Rating', RatingSchema)
import { model, Model, Schema, Document } from "mongoose";

export interface IRating extends Document {
    user_id: string;
    station_id: string;
    rate: string;
}

const RatingSchema = new Schema({
    user_id: {
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
        type: String,
        require: true,
        readonly: true
    },
}, {
    timestamps: true
})

export const Rating: Model<IRating> = model<IRating>('Rating', RatingSchema)
import { model, Model, Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    name: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
})

UserSchema.pre<IUser>('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

export const User: Model<IUser> = model<IUser>('User', UserSchema)

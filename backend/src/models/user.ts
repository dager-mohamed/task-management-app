import mongoose from "mongoose";

export interface IUser {
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string
}

const Schema = new mongoose.Schema<IUser>({
    FirstName: {
        type:  String,
        required: true
    },
    LastName: {
        type:  String,
        required: true
    },
    Email: {
        type:  String,
        required: true
    },
    Password: {
        type:  String,
        required: true
    },
})

export default mongoose.model<IUser>('users', Schema)
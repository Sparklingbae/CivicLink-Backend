import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { ILevelDocument } from "./interfaces";

const levelSchema = new Schema<ILevelDocument>(
    {
        name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
        minlength: 3,
        },
        description: {
        type: String,
        trim: true,
        maxlength: 500,
        minlength: 10,
        },
    },
    {
        timestamps: true,
    }
);

const LevelModel = model<ILevelDocument>("Level", levelSchema);
export default LevelModel;
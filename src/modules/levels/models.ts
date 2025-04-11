import mongoose, { Schema, model } from "mongoose";
import { ILevelDocument } from "./interfaces";

const levelSchema = new Schema<ILevelDocument>(
    {
        level: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
        minlength: 3,
        },
    },
    {
        timestamps: true,
    }
);

const LevelModel = model<ILevelDocument>("Level", levelSchema);
export default LevelModel;
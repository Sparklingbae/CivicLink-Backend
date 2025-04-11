import mongoose  from "mongoose";

export interface ILevel {
    _id: string;
    level: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ILevelDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId; // Override _id to match mongoose.Document
    level: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILevelRequest {
    level: string;
}

export interface ILevelResponse {
    level: string;
}
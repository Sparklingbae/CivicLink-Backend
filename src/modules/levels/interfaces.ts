import mongoose  from "mongoose";

export interface ILevel {
    _id: string;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ILevelDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId; // Override _id to match mongoose.Document
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILevelResponse {
    name: string;
    description?: string;
}
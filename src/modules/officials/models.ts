import { OfficialDocument } from "./interfaces";
import mongoose, { Schema, model } from "mongoose";

const officialSchema = new Schema<OfficialDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
            minlength: 3,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
            minlength: 3,
        },
        level: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LevelModel",
            required: true,
        },
        ministry: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        responsibility_area: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        contact_info: {
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                match:
                    /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/i, // Optional field
                validate(value:string) {
                    if (value && !this.contact_info.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                        throw new Error("Invalid email format");
                    }
                },
            },
            phone_number: {
                type: String,
                required: true,
                trim: true,
                match:
                    /^(\+?\d{1,3}[- ]?)?\d{10}$/i, // Optional field
                validate(value:string) {
                    if (value && !this.contact_info.phone_number.match(/^(\+?\d{1,3}[- ]?)?\d{10}$/)) {
                        throw new Error("Invalid phone number format");
                    }
                },
            },
        },
        location: {
            state: {
                type: String,
                required: true,
                trim: true,
                uppercase:true
            },
            localGovernment:{
                type:String
            }
        },
        active_status:{
          type:Boolean
        },
        createdBy:{
          type:mongoose.Schema.Types.ObjectId, 
          ref:"User",
          required:true
        }
    },
    {
        timestamps:true
    }
);

const OfficialModel = model<OfficialDocument>("Official", officialSchema);
export default OfficialModel;
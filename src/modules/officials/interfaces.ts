import { ObjectId } from 'mongodb';
import mongoose  from "mongoose";

export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
}

export interface Location {
    state: string;
    localGovernment: string;
}

export enum TitleName {
    President = 'President',
    VicePresident = 'Vice President',
    Senator = 'Senator',
    Minister = 'Minister',
    Commissioner = 'Commissioner',
    Chairman = 'Chairman',
    Honorable = 'Honorable',
    Chancellor = 'Chancellor'
}

export interface Title {
    name: TitleName; // Predefined titles
    customTitle?: string; // Optional field for additional titles if needed
}

export interface Official {
    _id: ObjectId;
    name: string;
    title: Title;
    level: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area: string;
    contact_info: ContactInfo;
    location: Location;
    active_status: boolean;
    createdBy: ObjectId; // Reference to Users
    createdAt: Date;
}

export interface OfficialDocument extends mongoose.Document, Official {
    _id: mongoose.Types.ObjectId; // Override _id to match mongoose.Document
    name: string;
    title: Title;
    level: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area: string;
    contact_info: ContactInfo;
    location: Location;
    active_status: boolean;
    createdBy: ObjectId; // Reference to Users
    createdAt: Date;
    updatedAt: Date;
}
export interface OfficialRequest { 
    name: string;
    title: Title;
    level: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area: string;
    contact_info: ContactInfo;
    location: Location;
    active_status: boolean;
}
export interface OfficialResponse {
    name: string;
    title: Title;
    level: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area: string;
    contact_info: ContactInfo;
    location: Location;
    active_status: boolean;
}
export interface OfficialUpdateRequest {
    name?: string;
    title?: Title;
    level?: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area?: string;
    contact_info?: ContactInfo;
    location?: Location;
    active_status?: boolean;
}
export interface OfficialUpdateResponse {  
    name?: string;
    title?: Title;
    level?: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area?: string;
    contact_info?: ContactInfo;
    location?: Location;
    active_status?: boolean;
}
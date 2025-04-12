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

// export enum Title {
//     // Federal Executive
//     President = 'President',
//     VicePresident = 'Vice President',
//     SecretaryToTheGovernment = 'Secretary to the Government of the Federation',
//     HeadOfService = 'Head of Civil Service of the Federation',
//     Minister = 'Minister',
//     SpecialAdviser = 'Special Adviser',
//     SeniorSpecialAssistant = 'Senior Special Assistant',
//     SpecialAssistant = 'Special Assistant',
  
//     // Federal Legislature
//     Senator = 'Senator',
//     HouseOfRepMember = 'House of Representatives Member',
//     SpeakerHouseOfReps = 'Speaker of the House of Representatives',
//     SenatePresident = 'Senate President',
//     DeputySenatePresident = 'Deputy Senate President',
  
//     // State Executive
//     Governor = 'Governor',
//     DeputyGovernor = 'Deputy Governor',
//     StateCommissioner = 'Commissioner',
//     SecretaryToStateGovernment = 'Secretary to the State Government',
//     HeadOfServiceState = 'Head of Civil Service (State)',
//     SpecialAdviserState = 'State Special Adviser',
//     SpecialAssistantState = 'State Special Assistant',
  
//     // State Legislature
//     StateAssemblyMember = 'State House of Assembly Member',
//     SpeakerStateAssembly = 'Speaker of the State House of Assembly',
  
//     // Local Government
//     LocalGovernmentChairman = 'Local Government Chairman',
//     LocalGovernmentViceChairman = 'Local Government Vice Chairman',
//     Councillor = 'Councillor',
  
//     // Judiciary
//     ChiefJustice = 'Chief Justice of Nigeria',
//     Justice = 'Justice',
//     Judge = 'Judge',
//     Magistrate = 'Magistrate',
//     AttorneyGeneral = 'Attorney General',
  
//     // Traditional & Ceremonial
//     Emir = 'Emir',
//     Oba = 'Oba',
//     Obi = 'Obi',
//     Igwe = 'Igwe',
//     Sultan = 'Sultan',
//     Chancellor = 'Chancellor',
  
//     // General/Other
//     Chairman = 'Chairman',
//     Honorable = 'Honorable',
//     DirectorGeneral = 'Director General',
//     PermanentSecretary = 'Permanent Secretary',
//     Director = 'Director',
//     Coordinator = 'Coordinator',
// }
  

export interface Official {
    _id: ObjectId;
    name: string;
    title: string; // Use Title enum or string for flexibility
    img_url?: string;
    level: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    jurisdiction?: string;
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
    title: string;
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
    title: string;
    level: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area: string;
    contact_info: ContactInfo;
    location: Location;
    active_status: boolean;
}
export interface OfficialResponse {
    name: string;
    title: string;
    level: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area: string;
    contact_info: ContactInfo;
    location: Location;
    active_status: boolean;
}
export interface OfficialUpdateRequest {
    name?: string;
    title?: string;
    level?: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area?: string;
    contact_info?: ContactInfo;
    location?: Location;
    active_status?: boolean;
}
export interface OfficialUpdateResponse {  
    name?: string;
    title?: string;
    level?: ObjectId; // Reference to Government Level
    ministry?: string; // Optional ministry field
    responsibility_area?: string;
    contact_info?: ContactInfo;
    location?: Location;
    active_status?: boolean;
}
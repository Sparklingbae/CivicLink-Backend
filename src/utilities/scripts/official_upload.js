"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = __importStar(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = "http://localhost:5000/api/officials/register"; // Replace with your actual route
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjhkZDYxMzlkNTcwNDNmYjFiNTE0MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NDQxOTg0MiwiZXhwIjoxNzQ0Njc5MDQyfQ.lPkcU3H1FZ1lhVEPoTD7CqWy1Qra0oyAxDSgJN6EElU";
const LEVEL_IDS = {
    FEDERAL: "67f9baa40583d52fd42d2774",
    STATE: "67f9bca26cfe83f7f19e10ed",
    LOCAL: ".67f9bcbd6cfe83f7f19e10f1",
};
const clean = (val) => (val ? String(val).trim() : "");
function upload() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const filePath = path_1.default.resolve("C:/Users/HP/Desktop/Copy of Federal Govt Data(1).xlsx");
        const workbook = XLSX.read(fs_1.default.readFileSync(filePath), { type: "buffer" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(data);
        for (const row of data) {
            const levelKey = clean(row["Level"]).toUpperCase();
            const levelId = LEVEL_IDS[levelKey];
            if (!levelId) {
                console.warn(`⚠️ Skipping due to missing level ID: ${row["level"]}`);
                continue;
            }
            const payload = {
                name: clean(row["Name"]),
                title: clean(row["Title"]),
                level: levelId,
                ministry: clean(row["Ministry"]),
                responsibility_area: clean(row["Responsibility_area"]),
                contact_info: {
                    email: clean(row["Contact_Info"].split("; ")[0].split(": ")[1]),
                    phone_number: clean(row["Contact_Info"].split("; ")[1].split(": ")[1]),
                },
                location: {
                    state: clean(row["Location"].split(", ")[1]).toLocaleLowerCase(),
                    address: clean(row["Contact_Info"].split("; ")[2].split(": ")[1]),
                },
                active_status: true
                // row["Active_status"].trim() === "true" || row["Active_status"].trim() === true,
            };
            try {
                const res = yield axios_1.default.post(API_URL, payload, {
                    headers: {
                        Authorization: `Bearer ${BEARER_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(`✅ Uploaded: ${payload.name} - Status: ${res.status}`);
            }
            catch (err) {
                console.error(`❌ Failed to upload ${payload.name}: ${((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || err.message}`);
            }
        }
    });
}
upload();

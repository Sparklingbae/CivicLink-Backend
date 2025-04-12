import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

type levelType = {
  [key: string]: string;
}

const API_URL = "http://localhost:5000/api/officials/register"; // Replace with your actual route
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjhkZDYxMzlkNTcwNDNmYjFiNTE0MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NDQxOTg0MiwiZXhwIjoxNzQ0Njc5MDQyfQ.lPkcU3H1FZ1lhVEPoTD7CqWy1Qra0oyAxDSgJN6EElU";
const LEVEL_IDS: levelType = {
  FEDERAL: "67f9baa40583d52fd42d2774",
  STATE: "67f9bca26cfe83f7f19e10ed",
  LOCAL: ".67f9bcbd6cfe83f7f19e10f1",
};

const clean = (val: any) => (val ? String(val).trim() : "");

async function upload() {
  const filePath = path.resolve(
    "C:/Users/HP/Desktop/Copy of Federal Govt Data(1).xlsx"
  );
  const workbook = XLSX.read(fs.readFileSync(filePath), { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

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
      active_status:
        row["Active_status"].trim() === "Active" ? true : false,
    };

    try {
      const res = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`✅ Uploaded: ${payload.name} - Status: ${res.status}`);
    } catch (err: any) {
      console.error(
        `❌ Failed to upload ${payload.name}: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  }
}

upload();

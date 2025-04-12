# 🏛️ Civic Link Backend

Civic Link Backend is a Node.js monolithic API built with TypeScript, Express, and MongoDB. It provides a scalable foundation for civic-related services and features modular separation of concerns via a structured domain-first folder layout.

---
## 📄 API Postman Documentation Link
https://documenter.getpostman.com/view/33749312/2sB2cYdfvk

    the link above opens a postman route documentation for all the backend routes.

---   
## 🌟 Major App Features

1. **User Registration**  
    Users can register with their email and password to create an account.

2. **User Authentication**  
    Secure login functionality with JWT-based authentication.

3. **Role-Based Access Control (RBAC)**  
    Different user roles (e.g., admin, user) with specific permissions.

4. **Get Officials**  
    Retrieve a list of officials from the database, including filtering and pagination options.

5. **Add Officials**  
    Admins can add officials' data manually or via an Excel file upload.

6. **Update Officials**  
    Modify existing officials' information in the database.

7. **Delete Officials**  
    Remove officials' records from the system.

8. **API Documentation**  
    Comprehensive API documentation available via Postman.

9. **Scalable Architecture**  
    Modular and domain-driven folder structure for scalability.

10. **Admin Tools**  
    Scripts to manage data, such as importing officials' data from Excel files.

---
## 📁 Project Structure

```
src/            # App-level configuration (e.g., DB)
├── modules/              # Feature modules (domain-driven)
│   └── user/
│       ├── controller.ts  # Route handlers
│       ├── interface.ts
|       ├── models.ts   # Mongoose schemas
│       ├── router.ts   # routes for user
|       └── services.ts   # Business logic and services
├── config.ts   
├── app.ts                # Express app setup
└── server.ts             # Entry point
```

---

## 🚀 Getting Started

### 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+)
- **npm** or **yarn**
- **MongoDB Atlas** (or local MongoDB instance)

---

### ⚙️ Installation

```bash
git clone https://github.com/your-org/civic-link-backend.git
cd civic-link-backend
npm install
```

---

### 🧪 Setup Environment Variables

Create a `.env` file in the root of your project:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/civiclink?retryWrites=true&w=majority
```

> Make sure your connection string includes the **database name** (e.g., `civiclink`). MongoDB will auto-create it if it doesn't exist.

---

### 🛠️ Scripts

Run the app in development or production mode:

```bash
# Development (auto-reloads on changes)
npm run dev

# Build TypeScript
npm run build

# Run production server
npm start
```

---

### 🧰 Tooling Stack

- **Express** — HTTP server and routing
- **TypeScript** — Type safety and scalability
- **Mongoose** — MongoDB object modeling
- **ts-node-dev** — TypeScript-aware development server
- **dotenv** — Environment variable loader

---

## 🔐 Environment Validation

To ensure type-safe usage of `process.env`, environment variables are typed in `src/types/global.d.ts`. Be sure to define all required variables in your `.env` file.

---

## ✅ Status

Initial backend scaffold complete and ready for feature development. Includes:

- Type-safe setup
- MongoDB connection
- Monolithic modular structure
- Environment management

---

## Scripts

A script for admin to add officials data from an excel file (xls, xlsx).

___

## 🤝 Contributing

1. Fork this repo
2. Create a new feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a pull request

---

## 📝 License

[MIT](LICENSE)
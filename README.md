📄 Invoice Management App

A Full Stack Invoice Management Application built using:

Frontend: React + Vite + Tailwind CSS + Redux Toolkit

Backend: Node.js + Express.js

Database: MongoDB Atlas

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone <https://github.com/ramalop/Invoice>
cd <project-folder>

🚀 Running the Backend
Step 1: Navigate to Backend Folder
cd backend

Step 2: Install Dependencies
npm install

Step 3: Configure Environment Variables

Create a .env file inside the backend folder and add:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key


Replace your_mongodb_atlas_connection_string with your MongoDB Atlas URI.

Step 4: Start Backend Server
npm run dev


Backend will run on:

http://localhost:5000

💻 Running the Frontend
Step 1: Navigate to Frontend Folder
cd frontend

Step 2: Install Dependencies
npm install

Step 3: Start Frontend
npm run dev


Frontend will run on:

http://localhost:5173

✅ Application Features

User Authentication (JWT based)

Create Invoice

View Invoice Details

Add Payments

Archive Invoices

Restore Archived Invoices

Protected Routes

MongoDB Atlas Integration

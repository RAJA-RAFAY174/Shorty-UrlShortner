# MERN URL Shortener

A robust and feature-rich URL shortener application built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features

- **Link Shortening:** Convert long URLs into manageable, short links instantly.
- **Custom Aliases:** Create personalized, memorable aliases for your short links.
- **Click Analytics:** Track the performance of your links with built-in click counts.
- **QR Code Generation:** Automatically generate QR codes for your shortened URLs for easy mobile sharing.
- **User Authentication:** Secure user registration and login system to manage personal links.
- **Modern UI:** Clean, simple, and professional user interface powered by React.

## Technologies Used

### Frontend
- **React (Vite):** Fast and modern frontend framework.
- **React Router DOM:** For seamless client-side routing.
- **Axios:** For making HTTP requests to the backend API.
- **Lucide React:** Beautiful and consistent SVG icons.
- **qrcode.react:** For dynamic QR code generation.

### Backend
- **Node.js & Express:** Robust server environment and web framework.
- **MongoDB & Mongoose:** NoSQL database and object data modeling.
- **JWT & bcryptjs:** Secure authentication and password hashing.
- **shortid:** To generate unique, non-sequential short IDs.
- **node-cron:** For scheduling automated backend tasks.

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Local installation or MongoDB Atlas cluster)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd URL
```

### 2. Backend Configuration
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
# If you have a dev script using nodemon, use npm run dev
npm run dev 
# OR
node index.js
```

### 3. Frontend Configuration
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

*(Optional)* If your backend is running on a different port or domain, you can create a `.env` file in the `frontend` directory to set the API URL:
```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```

### 4. Open the Application
Once both servers are running, open your web browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## License
This project is licensed under the ISC License.

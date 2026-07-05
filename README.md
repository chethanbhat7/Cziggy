# GeniFood

A MERN stack food ordering web application created for restaurants (e.g., Zyka).

## Project Structure

- **`backend/`**: Node.js and Express backend API, with MongoDB for data storage.
- **`frontend /`**: React frontend application built with Vite.

## Setup and Running

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (running instance or cloud URI)
- Cloudinary credentials (for image uploads)
- Stripe credentials (for payments)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `config/config.env` file using the keys outlined below:
   ```env
   PORT=8080
   NODE_ENV=DEVELOPMENT
   DB_URL=<your_mongodb_url>
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRES_TIME=90
   JWT_EXPIRES=90d
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
   CLOUDINARY_API_KEY=<your_cloudinary_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_secret>
   FRONTEND_URL="http://localhost:5173"
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   STRIPE_API_KEY=<your_stripe_api_key>
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd "frontend "
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```

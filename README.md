# AI-Powered CV Generator (MERN Stack)

A full-stack, responsive, and dynamic web application that allows users to build, edit, and download professional resumes. Integrated with AI to automatically generate summaries and improve bullet points.

## Features

- **Authentication**: Secure JWT-based Login and Registration.
- **Dynamic Builder**: Real-time CV editing with add/remove sections.
- **AI Integration**: Uses OpenAI to generate professional summaries and rewrite experience bullet points.
- **Multiple Templates**: Choose between Modern, Two-Column, and Minimalist templates.
- **PDF Export**: Instantly download your created resume as a perfectly scaled PDF.
- **Theme Switcher**: Beautiful Light and Dark modes.

## Tech Stack

- **Frontend**: React.js (Vite), React Router, Context API, Vanilla CSS.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Libraries**: `axios`, `html2pdf.js`, `lucide-react`, `bcryptjs`, `jsonwebtoken`.

## Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or a MongoDB Atlas URI)
- OpenAI API Key

## Setup Instructions

### 1. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup Environment Variables:
   Open `server/.env` and ensure the following are set correctly:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/cvgenerator
   JWT_SECRET=your_jwt_secret_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the backend server:
   ```bash
   npm run start
   # or for development: npm run dev (if nodemon is installed)
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## Built According To Specifications
- No `node-fetch` was used (Frontend and Backend rely entirely on `axios`).
- Pure Vanilla CSS Implementation for maximum UI control and beautiful aesthetics.

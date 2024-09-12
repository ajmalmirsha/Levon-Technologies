# Levon-Technologies

## Project Overview

This project is a full-stack web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The primary focus of the application is to provide a secure user authentication system using JSON Web Tokens (JWT) and manage projects and episodes.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

## Project Setup

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB server running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ajmalmirsha/Levon-Technologies.git
   ```

### Setup server

3. Navigate to the directory & Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```env
   JWT_SECRET=your_jwt_secret
   MONGO_URI=<enter your mongodb uri>
   WEATHER_API_KEY=<enter your api key> (sample - a44740bc96e761eaaae1fbbd58c87dc6)
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. use `http://localhost:3000` to access the server.
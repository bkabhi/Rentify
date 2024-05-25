# Rentify - Where Renting Meets Simplicity

Rentify is a web application designed to help property owners find the right tenants and assist tenants in finding the perfect rental property based on their key requirements.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)

## Features

### Basic Application (Mandatory)

- User Registration and Login
- Seller Flow:
  - Post property details
  - View, update, and delete properties
- Buyer Flow:
  - View all posted rental properties
  - Express interest in properties
  - Apply filters to search properties

### Add-On Features (Advanced)

- Pagination
- Form validation
- Mandate login for viewing seller details
- Like button for properties
- Email notifications for interested buyers and sellers

### Bonus Section

- Deployed on AWS

## Tech Stack

### Frontend

- React
- Material-UI

### Backend

- Node.js
- Express
- MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/rentify.git
   cd rentify/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set environment variables:
   ```sh
   export MONGODB_URI="your_mongodb_uri"
   export JWT_SECRET="your_jwt_secret"
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd rentify/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the frontend:
   ```sh
   npm run build
   ```

## Usage

1. Navigate to the frontend build directory and serve the static files using a web server of your choice.
2. Access the application in your web browser at the configured domain.

## API Endpoints

### User Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Properties

- `GET /api/properties` - Get all properties with pagination and filtering
- `GET /api/properties/seller/:sellerId` - Get properties by seller with pagination and filtering
- `POST /api/properties` - Create a new property
- `PUT /api/properties/:id` - Update a property
- `DELETE /api/properties/:id` - Delete a property
- `POST /api/properties/:id/like` - Like a property

## Deployment

### AWS Deployment

The Rentify application is deployed on AWS. You can access it via the following link:

[Rentify - Deployed Application](http://your-aws-deployed-app-url.com)

### Steps to Deploy on AWS

1. **Frontend Deployment on S3**

   - Build the frontend using `npm run build`.
   - Upload the build files to an S3 bucket configured for static website hosting.
   - Ensure the S3 bucket policy allows public read access.

2. **Backend Deployment on EC2**

   - Launch an EC2 instance and SSH into it.
   - Install Node.js and MongoDB.
   - Clone the repository and navigate to the backend directory.
   - Install dependencies and set environment variables.
   - Start the backend server.
   - Optionally, set up a reverse proxy using Nginx.

3. **Database Setup**

   - Create a MongoDB instance on Amazon RDS or use an existing MongoDB service.
   - Update the backend environment variables to point to the MongoDB instance.

4. **Domain and SSL**
   - Use Amazon Route 53 to manage your domain.
   - Set up SSL using AWS Certificate Manager.

## License

This project is licensed under the MIT License.

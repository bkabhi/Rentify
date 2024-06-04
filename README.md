## README

# Rentify - Where Renting Meets Simplicity

Rentify is a web application designed to help owners find the correct tenants and also help tenants find the correct house based on their key requirements. This project is built using the MERN stack (MongoDB, Express, React, Node.js).

## Online Deployment Links

- **Backend**: [Rentify Backend on Render](https://rentify-backend-bkabhi.onrender.com)
- **Frontend**: [Rentify Frontend on Netlify](https://rentify-frontend-bkabhi.netlify.app)

## Features

### Part I: Basic Application (Mandatory)

- **User Registration**: Users can register as either a seller or a buyer.
  - Fields: First Name, Last Name, Email, Phone Number, Password, isSeller
- **Seller Flow**:
  - Post Property: Sellers can post their properties by providing details such as place, area, number of bedrooms, bathrooms, nearby amenities, etc.
  - View Properties: Sellers can view the properties they have posted.
  - Update/Delete Properties: Sellers can update or delete their properties.
- **Buyer Flow**:
  - View Properties: Buyers can view all the posted rental properties.
  - Interested Button: Buyers can click the "I'm Interested" button on a property to view seller details.
  - Apply Filters: Buyers can apply filters based on property details.

### Part II: Add-On Features (Advanced)

- **Pagination**: Implemented pagination for properties.
- **Form Validation**: Proper form validation is handled on the frontend.
- **Login Requirement**: Buyers must be logged in to view seller details. Unauthorized users are redirected to the login screen.
- **Like Button**: Buyers can like properties, and the like count is tracked live.
- **Email Notifications**:
  - When a buyer clicks the "I'm Interested" button, the seller's contact details are sent to the buyer via email.
  - The seller receives an email with the interested buyer's details.

### Part III: Bonus Points (Optional)

- The application is deployed on cloud platforms:
  - **Backend**: Deployed on Render.
  - **Frontend**: Deployed on Netlify.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Render
- **Frontend**: React, Material-UI, Netlify

## Installation and Setup Instructions

### Backend

1. Clone the repository:

```bash
git clone https://github.com/bkabhi/Rentify.git
cd rentify-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the following environment variables:

```plaintext
MONGO_URI=your_mongodb_connection_string
PORT=your_port
JWT_SECRET=your_jwt_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

4. Run the server:

```bash
npm run dev
```

#### Backend Routes

- **User Routes**

  - **Register User**

    ```http
    POST /api/users/
    ```

    Request body:
    ```json
    {
      "firstName": "Abhijeet",
      "lastName": "Sagar",
      "email": "bloggerbkabhi@gmail.com",
      "phone": "8789502522",
      "password": "Password123!$",
      "isSeller": true
    }
    ```

  - **Login User**

    ```http
    POST /api/users/login
    ```

    Request body:
    ```json
    {
      "email": "bloggerbkabhi@gmail.com",
      "password": "Password123!$"
    }
    ```

  - **Get User Profile**

    ```http
    GET /api/users/profile
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

- **Property Routes**

  - **Get All Properties**

    ```http
    GET /api/properties/
    ```

  - **Create Property**

    ```http
    POST /api/properties/
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

    Request body:
    ```json
    {
      "place": "New delhi",
      "area": "1200",
      "bedrooms": "3",
      "bathrooms": "2",
      "nearbyAmenities": "Shadipur"
    }
    ```

  - **Get Property by ID**

    ```http
    GET /api/properties/:id
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

  - **Update Property**

    ```http
    PUT /api/properties/:id
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

    Request body:
    ```json
    {
      "place": "New delhi",
      "area": "1500",
      "bedrooms": "4",
      "bathrooms": "3",
      "nearbyAmenities": "Shadipur metro station"
    }
    ```

  - **Delete Property**

    ```http
    DELETE /api/properties/:id
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

  - **Express Interest in Property**

    ```http
    POST /api/properties/:id/interest
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

  - **Get Properties by Seller**

    ```http
    GET /api/properties/seller/:sellerId
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

  - **Like Property**

    ```http
    POST /api/properties/like/:id
    ```

    Header:
    ```http
    Authorization: Bearer <token>
    ```

### Frontend

1. Clone the repository:

```bash
git clone https://github.com/bkabhi/Rentify.git
cd rentify-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the following environment variables:

```plaintext
REACT_APP_API_URL=https://rentify-backend-bkabhi.onrender.com
```

4. Run the application:

```bash
npm start
```

## Usage

1. Open the application in your browser.
2. Register as a new user.
3. If you registered as a seller, you can post new properties, view, update, or delete your properties.
4. If you registered as a buyer, you can view all properties, apply filters, like properties, and view seller details by clicking the "I'm Interested" button.

## Contact

If you have any questions, feel free to contact me at bloggerbkabhi@gmail.com.

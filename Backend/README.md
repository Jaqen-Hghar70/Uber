# Uber Backend API Documentation

## `/users/register` Endpoint

### Description
Registers a new user in the system.  
Validates input, hashes the password, saves the user, and returns a JWT token with user data.

---

### Method
`POST`

---

### Endpoint
```
/users/register
```

---

### Request Body

Send a JSON object like:

```json
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "Secret123"
}
```

#### Field Requirements
- `fullName.firstname` (string, required): Minimum 3 characters.
- `fullName.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email, minimum 5 characters.
- `password` (string, required): Minimum 6 characters.

---

### Responses

#### 201 Created
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### 400 Bad Request
Validation failed. Example:
```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullName.firstname",
      "location": "body"
    }
  ]
}
```

#### 500 Internal Server Error
Unexpected server error.

---

### Notes
- Passwords are securely hashed before storage.
- The returned `token` is a JWT for authentication.
- Field names are **case-sensitive** and must match the schema.

---

### Example cURL Request
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "Secret123"
  }'
```

---

## `/users/login` Endpoint

### Description
Authenticates a user and returns a JWT token if the credentials are valid.

---

### Method
`POST`

---

### Endpoint
```
/users/login
```

---

### Request Body

Send a JSON object like:

```json
{
  "email": "john.doe@example.com",
  "password": "Secret123"
}
```

#### Field Requirements
- `email` (string, required): Must be a valid email.
- `password` (string, required): User's password.

---

### Responses

#### 200 OK
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### 400 Bad Request
Validation failed. Example:
```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

#### 404 Not Found
```json
{
  "message": "User not found"
}
```

#### 500 Internal Server Error
Unexpected server error.

---

### Example cURL Request
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "Secret123"
  }'
```

---

## `/users/logout` Endpoint

### Description
Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

---

### Method
`POST`

---

### Endpoint
```
/users/logout
```

---

### Authentication
Requires a valid JWT token in the `Authorization` header or as a `token` cookie.

---

### Request Body
No body required.

---

### Responses

#### 200 OK
```json
{
  "message": "Logged out successfully"
}
```

#### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

#### 500 Internal Server Error
Unexpected server error.

---

### Example cURL Request
```bash
curl -X POST http://localhost:3000/users/logout \
  -H "Authorization: <jwt_token>"
```

---

## `/users/profile` Endpoint

### Description
Returns the profile information of the authenticated user.

---

### Method
`GET`

---

### Endpoint
```
/users/profile
```

---

### Authentication
Requires a valid JWT token in the `Authorization` header or as a `token` cookie.

---

### Request Body
No body required.

---

### Responses

#### 200 OK
```json
{
  "_id": "<user_id>",
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
  // ...other user fields
}
```

#### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

#### 404 Not Found
```json
{
  "message": "User not found"
}
```

#### 500 Internal Server Error
Unexpected server error.

---

### Example cURL Request
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: <jwt_token>"
```

---

# Captain Registration API Documentation

## `/captains/register` Endpoint

### Description
Registers a new captain (driver) in the Uber system. Validates input, hashes the password, saves the captain, and returns a JWT token with captain data.

---

### Method
`POST`

---

### Endpoint
```
/captains/register
```

---

### Request Body
Send a JSON object like:

```json
{
  "fullName": {
    "firstname": "Amit",
    "lastname": "Sharma"
  },
  "email": "amit.sharma@example.com",
  "password": "Captain@123",
  "phone": "9876543210",
  "vehicle": "Maruti Suzuki Swift",
  "vehicleType": "car",
  "capacity": 4,
  "licenseNumber": "MH12AB1234",
  "location": {
    "latitude": 19.0760,
    "longitude": 72.8777
  }
}
```

#### Field Requirements
- `fullName.firstname` (string, required): Minimum 3 characters.
- `fullName.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email, minimum 5 characters.
- `password` (string, required): Minimum 6 characters.
- `phone` (string, required)
- `vehicle` (string, required)
- `vehicleType` (string, required): Must be one of `car`, `motorcycle`, or `auto`.
- `capacity` (number, required): Must be a positive integer.
- `licenseNumber` (string, required)
- `location.latitude` (number, required)
- `location.longitude` (number, required)

---

### Responses

#### 201 Created
```json
{
  "message": "Captain registered successfully",
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullName": {
      "firstname": "Amit",
      "lastname": "Sharma"
    },
    "email": "amit.sharma@example.com",
    "phone": "9876543210",
    "vehicle": "Maruti Suzuki Swift",
    "vehicleType": "car",
    "capacity": 4,
    "licenseNumber": "MH12AB1234",
    "location": {
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "status": "inactive"
  }
}
```

#### 400 Bad Request
Validation failed. Example:
```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullName.firstname",
      "location": "body"
    }
  ]
}
```

#### 409 Conflict
```json
{
  "message": "Captain with this email already exists"
}
```

#### 500 Internal Server Error
Unexpected server error.

---

### Example cURL Request
```bash
curl -X POST http://localhost:7100/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstname": "Amit", "lastname": "Sharma" },
    "email": "amit.sharma@example.com",
    "password": "Captain@123",
    "phone": "9876543210",
    "vehicle": "Maruti Suzuki Swift",
    "vehicleType": "car",
    "capacity": 4,
    "licenseNumber": "MH12AB1234",
    "location": { "latitude": 19.0760, "longitude": 72.8777 }
  }'
```

---

## Recent Changes & Fixes

### 1. Captain Model Import
- Changed all imports from `require('../models/captain.models')` to `require('../models/captain.model')` to match the actual filename.

### 2. Authentication Middleware
- Added and used `authCaptain` middleware from `middleware/auth.middleware.js` in captain routes for protected endpoints.

### 3. Password Hashing and Comparison
- Used `.select('+password')` when querying for captain in login to ensure password is available for bcrypt comparison.
- Used `captainModel.hashPassword(password)` for password hashing in registration.

### 4. Logout Logic
- In both user and captain logout, token is now retrieved from Authorization header or cookie, then blacklisted and cookie cleared.

### 5. JSON Request Validation
- Ensured all request bodies sent to the API are valid JSON (no trailing commas, double quotes for property names).

### 6. .gitignore
- Added `node_modules/` to `.gitignore` to prevent pushing dependencies to Git.

### 7. Error Handling
- Improved error messages and logging for easier debugging.

---

**If you encounter errors, check your server logs for details and ensure your requests match the documented JSON structure.**
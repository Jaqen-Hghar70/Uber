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
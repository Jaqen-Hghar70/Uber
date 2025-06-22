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
# User Management API Documentation

## Base URL
`http://api.example.com`

## Endpoints

### Create a New User
- **Method**: `POST`
- **URL**: `/users`
- **Description**: This endpoint creates a new user.
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "age": 30
  }

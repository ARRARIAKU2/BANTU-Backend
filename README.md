# BANTU Backend

## POSTMAN DOCUMANTATION

POSTMAN API Documentation: in BANTU_API_Documentation.postman_collection.json

## Login credential

email: admin@admin.com
password: admin

## Tech Stack

**Server:** Node.js, Express.js

**Programming Language:** Javascript, Typescript

**ORM:** Mongoose

**Databse:** MongoDB

**Generate Token:** jsonwebtoken

**encryption:** bcrypt

## How To Run In Local

### Installation

make sure change the Database configuration for migration:

in migrate-mongo-config.js

```
# MongoDB URL
url: "mongodb://localhost:27017",

# TODO Change this to your database name:
databaseName: "BANTU",
```

make sure add the PORT:

```
# .env
DATABASE_URL = mongodb://127.0.0.1:27017/BANTU or your URL
PORT = 5000
```

Make sure to install the dependencies:

```
# npm
npm install
```

### Run Migrations and Seed data

Make sure run migration and seed for All tables

```
npx migrate-mongo up
```

### Development Server

Start the development server on [http://localhost:5000](http://localhost:5000)

```
# npm
npm run dev
```

## Table Of Content

- [Database Structure](#database-structure)
- [API Structure](#api-structure)
- [API Auth Request Response](#api-auth-request-response)
- [API Users Request Response](#api-users-request-response)
- [API Service Request Response](#api-services-request-response)
- [API Bookings Request Response](#api-bookings-request-response)

## Database Structure

This project have users, services, bookings Table

### users structure

```
{
    "_id": string,
    "name": string,
    "email": string,
    "password": string,
    "created_at": date,
    "updated_at": date
}
```

### services structure

```
{
    "_id": string,
    "name": string,
    "category": string,
    "location": string,
    "rating": number,
    "created_at": date,
    "updated_at": date
}
```

### bookings structure

```
{
    "_id": string,
    "user_id": string,
    "service_id": string,
    "schedule": string,
    "notes": string,
    "created_at": date,
    "updated_at": date
}
```

## API Structure

Endpoint ready to use

```
GET     /api/users/               #Get All Users
GET     /api/users/:id            #Get User by ID
POST    /api/users/               #Create User
PUT     /api/users/:id            #Update User
DELETE  /api/users/:id            #Delete user

GET     /api/services/            #Get All services
GET     /api/services/:id         #Get Service by ID
POST    /api/services/            #Create Service
PUT     /api/services/:id         #Update Service
DELETE  /api/services/:id         #Delete Service

GET     /api/bookings/            #Get All Bookings
GET     /api/bookings/:id         #Get Booking by ID
GET     /api/bookings/user/:id    #get Booking by User ID
POST    /api/bookings/            #Create Booking
PUT     /api/bookings/:id         #Update Booking
DELETE  /api/bookings/:id         #Delete Booking

GET     /api/current-user         #Get Current User
POST    /api/login                #Login

```

## API Auth Request Response

### POST /api/login

---

- **URL Params**  
  None
- **Data Params**
  ```
  {
    email :   string
    password  :   String
  }
  ```
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0LmNvbSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAzMTQ0NjI2fQ.0ax2zyex6okb8A1eBa6OyNQwklNynEAaDQc73rFd_PY"
}
```

### GET /api/current-user

---

Return Current User.

- **URL Params**  
  None
- **Data Params**

```
{
    authorization :   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0LmNvbSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAzMTQ0NDI0fQ.KzHDioFLPgkCpxx5nsxQgQkuMpS5G_VGT1POi9fyPaM
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "data": {
        "_id": "67540b68ef6032c4839c8331",
        "name": "admin",
        "email": "admin@gmail.com",
        "iat": 1733562457,
        "exp": 1733566057
    }
}
```

## API Users Request Response

### GET /api/users/

---

Return All users.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success",
    "data": [
        {
            "_id": "67540b68ef6032c4839c8331",
            "name": "admin",
            "email": "admin@gmail.com",
            "password": "$2b$10$gQNClDkadN615eENxQbTyOl9Mc17BvK5l9ORfCa9ODRikjBcdZ3bi",
            "created_at": "2024-12-07T08:46:32.853Z",
            "updated_at": "2024-12-07T08:46:32.853Z"
        }
    ]
}
```

### GET /api/users/:id

---

Return user with the specified id.

- **URL Params**

```
{
  "id": string
}
```

- **Data Params**  
  None

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success",
    "data": {
        "_id": "67540b68ef6032c4839c8331",
        "name": "admin",
        "email": "admin@gmail.com",
        "password": "$2b$10$gQNClDkadN615eENxQbTyOl9Mc17BvK5l9ORfCa9ODRikjBcdZ3bi",
        "created_at": "2024-12-07T08:46:32.853Z",
        "updated_at": "2024-12-07T08:46:32.853Z"
    }
}
```

### POST /api/users/

---

Add Data.

- **URL Params**  
  None
- **Data Params**

```
{
    "_id": string,
    "name": string,
    "email": string,
    "password": string,
    "created_at": date,
    "updated_at": date
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "user": "Success Update Data!",
    "data": {
        "_id": "67540b68ef6032c4839c8331",
        "name": "admin",
        "email": "admin@gmail.com",
        "password": "$2b$10$gQNClDkadN615eENxQbTyOl9Mc17BvK5l9ORfCa9ODRikjBcdZ3bi",
        "created_at": "2024-12-07T08:46:32.853Z",
        "updated_at": "2024-12-07T08:46:32.853Z"
    }
}
```

### PUT /api/users/:id

---

Update User.

- **URL Params**

```
{
  "id": string
}
```

- **Data Params**

```
{
    "id": integer,
    "name": string,
    "email": string,
    "password": string,
    "created_at": date,
    "updated_at": date
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "user": "Success Update Data!",
    "data": {
        "_id": "67540b68ef6032c4839c8331",
        "name": "admin",
        "email": "admin@gmail.com",
        "password": "$2b$10$gQNClDkadN615eENxQbTyOl9Mc17BvK5l9ORfCa9ODRikjBcdZ3bi",
        "created_at": "2024-12-07T08:46:32.853Z",
        "updated_at": "2024-12-07T08:46:32.853Z"
    }
}
```

### DELETE /api/users/:id

---

Delete User.

- **URL Params**  
  None
- **Data Params**

```
{
  "id": Integer
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success Delete Data!",
    "data": 1
}
```

## API Services Request Response

### GET /api/services/

---

Return All services.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success",
    "data": [
        {
            "_id": "67540b68ef6032c4839c8333",
            "name": "Pembersihan Rumah",
            "category": "Home Cleaning",
            "location": "Jakarta",
            "rating": 5,
            "created_at": "2024-12-07T08:46:32.866Z",
            "updated_at": "2024-12-07T08:46:32.866Z"
        },
        {
            "_id": "67540b68ef6032c4839c8334",
            "name": "Frontend",
            "category": "IT",
            "location": "Bogor",
            "rating": 4,
            "created_at": "2024-12-07T08:46:32.866Z",
            "updated_at": "2024-12-07T08:46:32.866Z"
        },
        {
            "_id": "67540b68ef6032c4839c8335",
            "name": "Dokter",
            "category": "Medical",
            "location": "Depok",
            "rating": 3,
            "created_at": "2024-12-07T08:46:32.866Z",
            "updated_at": "2024-12-07T08:46:32.866Z"
        }
    ]
}
```

### GET /api/services/:id

---

Return Service with the specified id.

- **URL Params**

```
{
  "id": string
}
```

- **Data Params**  
  None

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success",
    "data": {
        "_id": "67540b68ef6032c4839c8333",
        "name": "Pembersihan Rumah",
        "category": "Home Cleaning",
        "location": "Jakarta",
        "rating": 5,
        "created_at": "2024-12-07T08:46:32.866Z",
        "updated_at": "2024-12-07T08:46:32.866Z"
    }
}
```

### POST /api/services/

---

Add Service.

- **URL Params**  
  None
- **Data Params**

```
{
    "name": string,
    "category": string,
    "location": string,
    "rating": number,
    "created_at": date,
    "updated_at": date
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success Create Service.",
    "data": {
        "name": "Pelatihan Backend",
        "category": "IT",
        "location": "Jakarta",
        "rating": 5,
        "created_at": "2024-12-07T10:03:02.110Z",
        "updated_at": "2024-12-07T10:03:02.110Z",
        "_id": "67541d56ae99d12576203770",
        "__v": 0
    }
}
```

### PUT /api/services/:id

---

Update Service.

- **URL Params**

```
{
  "id": string
}
```

- **Data Params**

```
{
    "name": string,
    "category": string,
    "location": string,
    "rating": number,
    "created_at": date,
    "updated_at": date
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success Update Service.",
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

### DELETE /api/services/:id

---

Delete Service.

- **URL Params**  
  None
- **Data Params**

```
{
  "id": Integer
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Service deleted",
    "data": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```

## API Bookings Request Response

### GET /api/bookings/

---

Return All bookings.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success",
    "data": [
        {
            "_id": "67540ecb5354a223cb9c9be0",
            "user_id": "67540b68ef6032c4839c8331",
            "service_id": "67540b68ef6032c4839c8334",
            "schedule": "2024-12-07T07:16:29.854Z",
            "notes": "test",
            "created_at": "2024-12-07T09:00:59.914Z",
            "updated_at": "2024-12-07T09:00:59.914Z",
            "__v": 0
        }
    ]
}
```

### GET /api/bookings/:id

---

Return Booking with the specified id.

- **URL Params**

```
{
  "id": string
}
```

- **Data Params**  
  None

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success",
    "data": {
        "_id": "67540ecb5354a223cb9c9be0",
        "user_id": "67540b68ef6032c4839c8331",
        "service_id": "67540b68ef6032c4839c8334",
        "schedule": "2024-12-07T07:16:29.854Z",
        "notes": "test",
        "created_at": "2024-12-07T09:00:59.914Z",
        "updated_at": "2024-12-07T09:00:59.914Z",
        "__v": 0
    }
}
```

### GET /api/bookings/user/:id

---

Return Booking with the user specified id.

- **URL Params**

```
{
  "id": string
}
```

- **Data Params**  
  None

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success",
    "data": [
        {
            "_id": "67540ecb5354a223cb9c9be0",
            "user_id": "67540b68ef6032c4839c8331",
            "service_id": "67540b68ef6032c4839c8334",
            "schedule": "2024-12-07T07:16:29.854Z",
            "notes": "test",
            "created_at": "2024-12-07T09:00:59.914Z",
            "updated_at": "2024-12-07T09:00:59.914Z",
            "__v": 0
        }
    ]
}
```

### POST /api/bookings/

---

Add Booking.

- **URL Params**  
  None
- **Data Params**

```
{
    "user_id": string,
    "service_id": string,
    "schedule": string,
    "notes": string,
    "created_at": date,
    "updated_at": date
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success Create Booking",
    "data": {
        "user_id": "67540b68ef6032c4839c8331",
        "service_id": "67540b68ef6032c4839c8334",
        "schedule": "2024-12-07T07:16:29.854Z",
        "notes": "test",
        "created_at": "2024-12-07T10:09:21.783Z",
        "updated_at": "2024-12-07T10:09:21.783Z",
        "_id": "67541ed1f73bc7ffcf8a72de",
        "__v": 0
    }
}
```

### PUT /api/bookings/:id

---

Update Booking.

- **URL Params**

```
{
  "id": string
}
```

- **Data Params**

```
{
    "user_id": string,
    "service_id": string,
    "schedule": string,
    "notes": string,
    "created_at": date,
    "updated_at": date
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success Update Booking",
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

### DELETE /api/bookings/:id

---

Delete Booking.

- **URL Params**  
  None
- **Data Params**

```
{
  "id": Integer
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    "message": "Success Delete Booking",
    "data": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```

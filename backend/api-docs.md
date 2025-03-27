# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google`
- `POST /admin`

Routes below need authentication:

- `GET /dcotors`
- `GET /appointments`
- `GET /appointmentsAdmin`
- `GET /ai/reccomendations`
- `GET /doctors/:doctorId`
- `POST /appointments/:doctorId`
- `GET /appointments/:appointmentId`
- `PUT /appointments/:appointmentId`
- `DELETE /appointments/:appointmentId`
- `PATCH /appointments/:appointmentId`

&nbsp;

## 1. POST /register

Description:
- Register a new user into the system

Request:

- body:

```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": "integer"
}
```

_Response (201 - Created)_

```json
{
        "id": "integer",
        "name": "string",
        "email": "string",
}
```

_Response (400 - BadRequest)_

```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Email format is not correct"
}
OR
{
    "message": "Email already registered"
}

```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 2. POST /login

Description:
- Login into the system

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "access_token"
}
```

_Response (400 - BadRequest)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email / password"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 3. POST /google

Description:
- Get all posts from the database

_Response (200 - OK)_

```json
[
    {
    "page": "integer",
        "data": [
            {
                "id": "integer",
                "title": "string",
                "content": "string",
                "imgUrl": "string",
                "authorId": "integer",
                "categoryId": "integer",
                "createdAt": "string",
                "updatedAt": "string"
            }
            ],
        "totalData": "integer",
        "totalPage": "integer",
        "dataPerPage": "integer"
    }
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 4. GET /pub/posts/:id

Description:
- Get posts by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "page": "integer",
        "data": [
            {
                "id": "integer",
                "title": "string",
                "content": "string",
                "imgUrl": "string",
                "authorId": "integer",
                "categoryId": "integer",
                "createdAt": "string",
                "updatedAt": "string"
            }
            ],
        "totalData": "integer",
        "totalPage": "integer",
        "dataPerPage": "integer"
    }
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 5. GET /posts

Description:
- Get all posts

Request:

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "title": "string",
        "content": "string",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer",
        "createdAt": "string",
        "updatedAt": "string",
        "User": {
            "id":"integer",
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
&nbsp;

## 6. GET /categories

Description:
- Get all categories

Request:

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

_Response (200 - OK)_

```json
{
    "message": "string",
    "data": [
        {
            "id": "integer",
            "name": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 7. POST /posts

Description:
- Post new data posts

Request:

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

- body:

```json
{
        "title": "string",
        "content": "string",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
}
```

_Response (201 - Created)_

```json
{
    "message": "success add data",
    "data": {
        "id": 6,
        "title": "Exploring Deep Sea Mysteries",
        "content": "The deep sea remains one of the least explored areas on Earth, home to unique ecosystems and potentially undiscovered species.",
        "imgUrl": "https://example.com/images/deep-sea.jpg",
        "authorId": 1,
        "categoryId": 2,
        "updatedAt": "2025-03-15T04:02:51.234Z",
        "createdAt": "2025-03-15T04:02:51.234Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Content is required"
}
OR
{
  "message": "Author is required"
}
OR
{
  "message": "Category is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 8. POST /categories

Description:
- Post new data categories 

Request:

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

- body:

```json
{
    "name": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "success add category",
    "data": {
        "id": 7,
        "name": "baru",
        "updatedAt": "2025-03-15T04:08:37.488Z",
        "createdAt": "2025-03-15T04:08:37.488Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 9. GET /posts/:id

Description:
- Get posts by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

_Response (200 - OK)_

```json
{
    "message": "success get data",
    "data": {
        "id": 3,
        "title": "Exploring Deep Sea Mysteries",
        "content": "The deep sea remains one of the least explored areas on Earth, home to unique ecosystems and potentially undiscovered species.",
        "imgUrl": "https://example.com/images/deep-sea.jpg",
        "authorId": 1,
        "categoryId": 2,
        "createdAt": "2025-03-12T14:46:46.764Z",
        "updatedAt": "2025-03-12T14:46:46.764Z"
    }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Post not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 10. PUT /posts/:id

Description:
- Update posts by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

- body:

```json
{
        "title": "string",
        "content": "string",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "success update data",
    "data": {
        "id": 2,
        "title": "Introduction to Artificial Intelligence DIUBAHHH",
        "content": "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction.",
        "imgUrl": "https://example.com/images/ai-intro.jpg",
        "authorId": 2,
        "categoryId": 2,
        "createdAt": "2025-03-12T14:46:46.764Z",
        "updatedAt": "2025-03-15T04:14:20.620Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Content is required"
}
OR
{
  "message": "Author is required"
}
OR
{
  "message": "Category is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Post not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 8. PUT /categories/:id

Description:
- Update data categories by id

Request:

-params: 
```json
{
    "id": "integer (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

- body:

```json
{
    "name": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "success update data",
    "data": {
        "id": 7,
        "name": "updated",
        "updatedAt": "2025-03-15T04:08:37.488Z",
        "createdAt": "2025-03-15T04:08:37.488Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 12. DELETE /posts/:id

Description:
- Delete posts by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

_Response (200 - OK)_

```json
{
    "message": "\"Exploring Deep Sea Mysteries\" success to delete",
    "data": {
        "id": 3,
        "title": "Exploring Deep Sea Mysteries",
        "content": "The deep sea remains one of the least explored areas on Earth, home to unique ecosystems and potentially undiscovered species.",
        "imgUrl": "https://example.com/images/deep-sea.jpg",
        "authorId": 1,
        "categoryId": 2,
        "createdAt": "2025-03-12T14:46:46.764Z",
        "updatedAt": "2025-03-12T14:46:46.764Z"
    }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Post not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 13. PATCH /posts/:id/image-url

Description:
- Update posts image url by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer access_token"
}
```

- body: 

```json
{
    "imageUrl": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Image \"Introduction to Artificial Intelligence\" update successfull"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "File is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token",
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Post not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

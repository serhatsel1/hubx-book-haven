Book API Documentation
This API allows you to manage a collection of books. You can perform CRUD operations (Create, Read, Update, Delete) on book entries.

Base URL: http://localhost:8000/api/books

API Endpoints

1. Get All Books

Endpoint: /books
Method: GET
Description: Retrieves a list of all books with pagination.
Query Parameters:
page (optional): Page number for pagination (default: 1)
limit (optional): Number of books per page (default: 10)
Responses:
200 OK: Returns a JSON object containing the list of books, total number of books, total pages, and current page.
500 Internal Server Error: If an unexpected error occurs.
Example Request:

GET /books?page=2&limit=5 2. Create a New Book

Endpoint: /books
Method: POST
Description: Creates a new book and adds it to the database.
Request Body: A JSON object containing the book data:
title (string, required): The title of the book.
author (object, required): The author of the book.
name (string, required): The author's name.
country (string, required): The author's country.
birthDate (string, required, date format): The author's birth date.
price (number, required): The price of the book.
isbn (string, required): The ISBN of the book.
language (string, required): The language of the book.
numberOfPages (number, required): The number of pages in the book.
publisher (string, required): The publisher of the book.
Responses:
201 Created: Returns the created book data.
400 Bad Request: If the book data is invalid or a book with the same title or ISBN already exists.
500 Internal Server Error: If an unexpected error occurs.
Example Request:

JSON
POST /books
{
"title": "The Lord of the Rings",
"author": {
"name": "J.R.R. Tolkien",
"country": "United Kingdom",
"birthDate": "1892-01-03"
},
"price": 25.00,
"isbn": "9780618260264",
"language": "English",
"numberOfPages": 1216,
"publisher": "Allen & Unwin"
}
Kodu dikkatli kullanın.

3. Update a Book

Endpoint: /books/:id
Method: PUT
Description: Updates an existing book by ID.
Request Parameters:
id (string, required): The ID of the book to update.
Request Body: A JSON object containing the updated book data (all fields are optional).
Responses:
200 OK: Returns the updated book data.
400 Bad Request: If the book data is invalid.
404 Not Found: If the book with the given ID is not found.
500 Internal Server Error: If an unexpected error occurs.
Example Request:

JSON
PUT /books/6437f32a68078a479685a2f6
{
"title": "The Hobbit",
"price": 15.00
}
Kodu dikkatli kullanın.

4. Delete a Book

Endpoint: /books/:id
Method: DELETE
Description: Deletes a book by ID.
Request Parameters:
id (string, required): The ID of the book to delete.
Responses:
200 OK: If the book was deleted successfully.
404 Not Found: If the book with the given ID is not found.
500 Internal Server Error: If an unexpected error occurs.
Example Request:

DELETE /books/6437f32a68078a479685a2f6
Error Handling
The API uses a centralized error handling mechanism. If an error occurs, the API will return a JSON response with the following structure:

JSON
{
"message": "Error message",
"status": "HTTP status code"
}
Kodu dikkatli kullanın.

Example Error Response:

JSON
{
"message": "Book not found",
"status": 404
}
Kodu dikkatli kullanın.

This documentation provides a comprehensive overview of the Book API, including its endpoints, request/response formats, and error handling. It should be sufficient for developers to understand and interact with the API.

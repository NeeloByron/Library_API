# Library API

## Project Overview
- A RESTful APi built with Node.js Express and TypeScript to manage authors and books. The project covers CRUD operations, author book relationships, input validation, request logging and centralized error handling.

## About the Project
 
A librarian keeping two lists: one for authors and one for books. This APi lets a program send instructions to add, read, change or remove enteries in those lists.

An APi is a way for programs to communicate. REST is an approach to organizing that communication around resources such as /authors and /books.

## Project Requirements
- Create, view, update and delete authors
- Create, view, update and delete books
- Link every book to an exisiting author
- List all books written by one author
- Validate information sent through POST and PUT requests
- Log each request's HTTP method and URL
- Handle invalid data, missing records and duplicate books consistently
- Test the endpoints using Postman

## Technologies
- Node.js - Runs the application outside the browser
- TypeScript - Adds type checking to JavaScript
- Express - Handles routes, requests and responses
- Express-validator - Checks and validates incoming data
- Nodeman - Restarts the development server when files change
- Postman - Sends API requests for manual testing 

## Initialize project with TypeScript + Express
1. npm init -y

2.  npm i express typescript ts-node @types/express @types/node body-parser

3. npm i -D nodemon

4. npx tsc --init

5. npm i express-validator

## How to run locally

```bash
# clone the repository 
git clone https://github.com/NeeloByron/Library_API.git 
```

```bash
# Navigate to the project directory 
cd Library_API
```

```bash
# Install Dependencies 
npm install 
```
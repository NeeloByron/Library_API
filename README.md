# Library API

## Project Overview
- Build a RESTFul APi for managing a library system with two resources: Authors & Books (each book belongs to an author) The API will support CRUD (Create,Read,Update,Delete) operations, validation and error handling.

## Think of API as a library:
- An author is a person who writes books.
- A book belongs to an author.
- authorId tells us which author wrote the book.


## Setup

## Initialize project with TypeScript + Express
1. npm init -y

2.  npm i express typescript ts-node @types/express @types/node body-parser

3. npm i -D nodemon

4. npx tsc --init

5. npm i express-validator
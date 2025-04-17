# Expense Tracker API

An **Expense Tracker API** built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**, following **Clean Architecture** principles. This project provides a backend service for managing categories and movements (expenses/income) with a modular, scalable, and maintainable architecture.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Architecture Overview](#architecture-overview)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)

---

## Features

- **Category Management**: Create, update, delete, and retrieve categories.
- **Movement Management**: Create, update, delete, and retrieve movements (expenses/income).
- **Clean Architecture**: Separation of concerns with modular layers.
- **Validation**: DTO-based validation for incoming requests.
- **Error Handling**: Centralized error handling with custom error classes.
- **MongoDB Integration**: Data persistence using Mongoose.
- **Environment Configuration**: Secure and flexible configuration using `dotenv`.

---

## Project Structure

The project is organized into the following structure:

```plaintext
src/
├── app.ts                     # Application entry point
├── application/               # Application layer (mappers, repositories)
│   ├── mappers/               # Data mapping logic
│   ├── repositories/          # Repository implementations
│   ├── use-cases/             # Business use cases
├── config/                    # Configuration files
├── domain/                    # Core domain logic
│   ├── dtos/                  # Data Transfer Objects (DTOs)
│   ├── entities/              # Domain entities
│   ├── errors/                # Custom error classes, validators and messages
│   ├── repositories/          # Abstract repository interfaces
├── presentation/              # Presentation layer
│   ├── databases/             # Database configuration and models
│   │   ├── mongodb/           # MongoDB configuration and setup
│   │   │   ├── config.ts      # MongoDB connection logic
│   ├── servers/               # Express server and routes
├── shared/                    # Shared utilities and types
│   ├── types.ts               # Shared types
```

---

## Installation

### Prerequisites

- **Node.js** (v22.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (local or cloud instance)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/expense-tracker.node-js.git
   cd expense-tracker.node-js
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:

   ```plaintext
   PORT=<your-port>
   MONGODB_URL=<your-mongodb-url>
   MONGODB_DATABASE=<your-database-name>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

The application uses the following environment variables:

| Variable           | Description                   | Example Value                                             |
| ------------------ | ----------------------------- | --------------------------------------------------------- |
| `PORT`             | Port for the server to run on | `8888`                                                    |
| `MONGODB_URL`      | MongoDB connection string     | `mongodb+srv://<username>:<password>@cluster.mongodb.net` |
| `MONGODB_DATABASE` | Name of the MongoDB database  | `money-tracker`                                           |

---

## API Endpoints

### Categories

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/api/v1/categories`     | Get all categories      |
| GET    | `/api/v1/categories/:id` | Get a category by ID    |
| POST   | `/api/v1/categories`     | Create a new category   |
| PUT    | `/api/v1/categories/:id` | Update a category by ID |
| DELETE | `/api/v1/categories/:id` | Delete a category by ID |

### Movements

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/v1/movements`     | Get all movements       |
| GET    | `/api/v1/movements/:id` | Get a movement by ID    |
| POST   | `/api/v1/movements`     | Create a new movement   |
| PUT    | `/api/v1/movements/:id` | Update a movement by ID |
| DELETE | `/api/v1/movements/:id` | Delete a movement by ID |

---

## Architecture Overview

The project follows **Clean Architecture** principles, ensuring separation of concerns and maintainability. Below is a high-level diagram of the architecture:

```plaintext
+-------------------+
|   Presentation    |  (Express server, routes, controllers, Databases)
+-------------------+
          |
          v
+-------------------+
|   Application     |  (mappers, repositories, use cases)
+-------------------+
          |
          v
+-------------------+
|      Domain       |  (Entities, DTOs, business logic)
+-------------------+
```

---

## Scripts

| Script             | Description                                   |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Run the application in development mode       |
| `npm run build`    | Build the application for production          |
| `npm run start`    | Build and start the application in production |
| `npm run eslint`   | Run ESLint to check for linting issues        |
| `npm run prettier` | Run Prettier to check for formatting issues   |

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **TypeScript**: Strongly typed JavaScript for better maintainability.
- **Express**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: ODM for MongoDB.
- **dotenv**: Environment variable management.
- **ESLint**: Linting tool for code quality.
- **Prettier**: Code formatter for consistent styling.

---

# Todo Application

## Overview
This is a full-stack **Todo Application** built using **ASP.NET Core** for the backend and **React.js** for the frontend. Users can create, update, categorize, and prioritize their tasks efficiently. The application provides a seamless experience with a RESTful API and a dynamic UI.

## Features
### Backend (ASP.NET Core API)
- CRUD operations for todos (Create, Read, Update, Delete)
- Categorization by **Work** and **Personal**
- Prioritization by **High, Medium, and Low**
- Sorting of tasks based on priority and creation date
- Enum values serialized as strings for better readability
- In-memory database for development
- CORS enabled for cross-origin requests

### Frontend (React.js)
- Display todos grouped by **priority** (High in red, Medium in yellow, Low in green)
- Sorting by **creation date** within each priority category
- Search functionality for todos
- Buttons to **filter tasks** based on category (Work/Personal)
- Ability to **edit and update** todos

## Technologies Used
### Backend
- **ASP.NET**
- **Entity Framework Core** (In-Memory Database)

### Frontend
- **React.js** 
- **Axios** 

## Installation Guide
### Prerequisites
Ensure you have the following installed:
- **.NET SDK**
- **Node.js**
- **Git**

### Backend Setup (ASP.NET Core API)
1. Clone the repository:
   ```sh
   git clone https://github.com/sid1003/Coding_assignment.git
   ```
2. Navigate to the API directory:
   ```sh
   cd todo-api
   ```
3. Run the application:
   ```sh
   dotnet run
   ```

### Frontend Setup (React.js)
1. Navigate to the frontend directory:
   ```sh
   cd ../todo-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
4. Open `http://localhost:3000` in your browser

## API Endpoints
### Todos
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| GET    | `/api/todos`    | Get all todos |
| GET    | `/api/todos/{id}` | Get a specific todo |
| POST   | `/api/todos`    | Create a new todo |
| PUT    | `/api/todos/{id}` | Update a todo |
| DELETE | `/api/todos/{id}` | Delete a todo |

## License
This project is licensed under the MIT License.


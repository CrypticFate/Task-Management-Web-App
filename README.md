# Task Management Web Application

A full-stack web application for managing tasks with user authentication.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React
- **Authentication**: JWT (JSON Web Tokens)

## Features

- User registration and login
- JWT authentication
- Create, read, update, and delete tasks
- Task attributes: title, description, due date, priority, category
- Mark tasks as complete/incomplete
- Responsive design

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Navigate to the backend directory:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a .env file with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:

```
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start the frontend development server:

```
npm start
```

4. Open your browser and navigate to http://localhost:3000

## API Endpoints

### Authentication

- POST /api/users - Register a new user
- POST /api/users/login - Login a user
- GET /api/users/me - Get current user details

### Tasks

- GET /api/tasks - Get all tasks for the authenticated user
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

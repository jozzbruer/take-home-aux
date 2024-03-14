# Challenge README

Welcome to the challenge! This project consists of a React Vite application for the front end and a FastAPI backend for the back end.

## Installation

### Frontend (React Vite Application)

1. Clone this repository:
   ```bash
   git clone git@github.com:jozzbruer/take-home-aux.git
   ```
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn
   ```

### Backend (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies using pip:
   ```bash
   pip install fastapi
   ```

## Running the Application

### Frontend (React Vite Application)

1. From the `frontend` directory, start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend (FastAPI)

1. From the `backend` directory, start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

## Backend Endpoints

### Other Endpoints

- **GET /posts**: Get all posts
- **PUT /posts/{post_url}/update_hugs**: Like or Unlike a post
- **POST posts/{post_url}/add_comment**: Add Comments(Not finish)

Feel free to explore and interact with these endpoints as needed!

## Main Challenge

[🚀] Implement infitescroll

[🚀] Implement interaction

## Bonus Challenge

[🚀] Implement display comments

[ ] Implement Commenting Feature:

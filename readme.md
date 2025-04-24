# Medcial Web Application

A full-stack application providing medical web services with a FastAPI backend and a React.js frontend.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Running with Docker](#running-with-docker)
- [Project Structure](#project-structure)

## Overview
This repository contains two main services:

- **backend**: A FastAPI service that provides RESTful endpoints.
- **frontend**: A React.js application that consumes the backend API and serves the user interface.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IdONTKnowCHEK/medical_web
   cd medcial_web
   ```

2. Backend setup:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Frontend setup:
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

The backend service loads environment variables from `backend/.env`. Copy and customize:

```bash
cp backend/.env.example backend/.env
```  
### Installing Ollama Model

If you haven't installed the required model yet, please execute the following command:

```bash
# Install the llama3.1:8b-instruct-fp16 model
ollama pull llama3.1:8b-instruct-fp16
```

## Running Locally

You can run both services concurrently using tmux or separate terminals:

1. Start backend service:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
   ```

2. Start frontend development server:
   ```bash
   npm install serve --save-dev
   npm run build
   npm run serve
   ```

Access the application at http://localhost:8080 (frontend) and http://localhost:11304/docs (API docs).

## Running with Docker

Ensure Docker and Docker Compose are installed.

```bash
docker-compose up --build
```

- Frontend will be exposed on port **1025**
- Backend is internal on port **5000**

## Project Structure

```
medcial_web/
├── backend/           # FastAPI application
│   ├── app/           
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/          # React.js application
│   ├── app/
│   ├── nginx/
│   └── Dockerfile
├── docker-compose.yml # Orchestration for both services
└── readme.md          # Project documentation
```

# Medcial Web Application

A full-stack application providing medical web services with a FastAPI backend and a React.js frontend.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Running with Docker](#running-with-docker)
- [Project Structure](#project-structure)

## Overview
This repository contains two main services:

- **backend**: A FastAPI service that provides RESTful endpoints.
- **frontend**: A React.js application that consumes the backend API and serves the user interface.

## Prerequisites
- Git
- Python 3.10 or higher
- Node.js 22+ and npm/yarn 
- Docker & Docker Compose (for containerized setup)

## Clone repo

1. Clone the repository:
   ```bash
   git clone https://github.com/IdONTKnowCHEK/medical_web
   cd medical_web
   ```


## Environment Variables

The backend service loads environment variables from `backend/.env`. Copy and customize:

```bash
# cd ~/medical_web/backend
cp .env.example .env
```  
### Installing Ollama Model

If you haven't installed the required model yet, please execute the following command:

```bash
# Install the llama3.1:8b-instruct-fp16 model
ollama pull llama3.1:8b-instruct-fp16
```

## Running Locally

You can run both services concurrently using tmux or separate terminals:

### Install env

1. Backend setup:
   ```bash
   cd backend
   python -m venv venv
   
   # Linux
   source venv/bin/activate
   # Windows
   venv/Scriptsactivate

   pip install -r requirements.txt
   ```

2. Frontend setup:
   ```bash
   cd ../frontend/app
   npm install
   ```

### Start Services

1. Start backend service:
   ```bash
   # cd ~/medical_web/backend
   uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
   ```

2. Start frontend development server:
   ```bash
   # cd ~/medical_web/frontend/app
   npm run build
   npm run serve
   ```

Access the application at http://localhost:1025 (frontend) and http://localhost:5000/docs (API docs).

## Running with Docker

Ensure Docker and Docker Compose are installed.

```bash
# cd ~/medical_web
docker-compose up --build
```

- Frontend will be exposed on port **1025**
- Backend is internal on port **5000**

## Project Structure

```
medcial_web/
├── backend/           # FastAPI application
│   ├── app/      
│   ├── .env
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/          # React.js application
│   ├── app/
│   ├── nginx/
│   └── Dockerfile
├── docker-compose.yml # Orchestration for both services
└── readme.md          # Project documentation
```

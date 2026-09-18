# Distributed Chat Application

A real-time chat application built with **React, Node.js, Express, Socket.IO, MongoDB, and Kafka**. The project explores distributed backend architecture through service separation, real-time communication, and event-driven messaging.

## Architecture

```text
                    ┌──────────────────┐
                    │   React Client   │
                    │  Vite + TypeScript│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   API Gateway    │
                    │   Express :8080  │
                    └────────┬─────────┘
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
        ┌─────────────────┐     ┌─────────────────┐
        │ Authentication  │     │   Chat Service  │
        │ Service :4000   │     │     :4001       │
        └────────┬────────┘     └────────┬────────┘
                 │                       │
                 ▼                       ▼
             ┌────────┐             ┌─────────┐
             │ MongoDB│             │  Kafka  │
             └────────┘             └─────────┘
```

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Zustand
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express
* Socket.IO
* MongoDB
* Mongoose
* KafkaJS
* JWT
* Passport
* Google OAuth
* Docker & Docker Compose

## Backend Architecture

The backend is separated into multiple services behind an API Gateway.

### API Gateway

The API Gateway acts as the main entry point for the frontend.

Responsibilities include:

* Routing requests to backend services
* Authentication request forwarding
* Chat request forwarding
* WebSocket upgrade forwarding
* Handling authentication cookies
* Forwarding authenticated requests

Runs on:

```text
http://localhost:8080
```

### Authentication Service

The authentication service manages user authentication and authorization.

Features include:

* User registration
* Password hashing with bcrypt
* JWT authentication
* HTTP-only authentication cookies
* Logout
* Google OAuth
* User management
* MongoDB persistence

Runs on:

```text
http://localhost:4000
```

### Chat Service

The chat service handles real-time communication and chat functionality.

Features include:

* Socket.IO real-time communication
* Socket authentication
* Chat message handling
* MongoDB persistence
* Kafka event publishing
* User connection/disconnection events

Runs on:

```text
http://localhost:4001
```

## Real-Time Communication

Socket.IO provides bidirectional communication between the frontend and chat service.

```text
Client
   │
   │ Socket.IO
   ▼
API Gateway
   │
   │ WebSocket Upgrade
   ▼
Chat Service
   │
   ├── Authentication
   ├── Connection Management
   └── Message Handling
```

## Event-Driven Architecture

Kafka is used for asynchronous event communication.

The chat service publishes events such as:

```text
USER_ONLINE
USER_OFFLINE
```

This provides a foundation for processing events independently from the real-time WebSocket layer.

## Docker Infrastructure

The application uses Docker Compose to run the main backend infrastructure.

```text
API Gateway          : 8080
Authentication       : 4000
Chat Service         : 4001
MongoDB              : 27017
Kafka                : 9092
Kafka Controller     : 9093
```

MongoDB uses persistent Docker storage, while Kafka runs using KRaft mode.

## Running the Project

### Clone the repository

```bash
git clone https://github.com/Ch4nnXDev/Distributed-Chat-Application.git

cd Distributed-Chat-Application
```

### Start the backend infrastructure

```bash
docker compose up --build
```

### Start the frontend

```bash
cd frontend

npm install

npm run dev
```

## Project Structure

```text
Distributed-Chat-Application/
│
├── backend/
│   ├── api-gateway/
│   │   └── server.js
│   │
│   ├── services/
│   │   ├── authenticationService/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── server.js
│   │   │
│   │   └── chatService/
│   │       ├── controllers/
│   │       ├── handlers/
│   │       ├── kafka/
│   │       ├── middleware/
│   │       ├── routes/
│   │       └── server.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Key Concepts Demonstrated

* Microservice-style architecture
* API Gateway pattern
* Real-time WebSocket communication
* JWT authentication
* HTTP-only cookie authentication
* Google OAuth
* Event-driven architecture
* Kafka messaging
* MongoDB persistence
* Docker containerization
* WebSocket proxying
* Service separation

## Future Improvements

The project can be extended with:

* Redis-based distributed presence
* Kafka consumers and event processing
* Horizontal chat-service scaling
* Service discovery
* Load balancing
* Fault isolation
* Message delivery guarantees
* Distributed tracing
* Centralized logging
* Monitoring and observability

## Purpose

This project was built to explore **real-time systems, backend architecture, microservices, and distributed-system concepts** while developing a scalable foundation for a production-style chat application.

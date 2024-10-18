# Multiplayer Tic-Tac-Toe Web App

This project is a web application providing a multiplayer (1v1) game of Tic-Tac-Toe.

## Documentation

The project follows a **microservices architecture**. It consists of 6 components:

1. **Backend Application**: Built with Express.js, this handles authentication, sessions, game rooms, and the game flow.
2. **Frontend Application**: Created using React, this connects to the backend via REST and WebSocket.
3. **Bot Application**: Written in Go, this implements a mini-max algorithm to play against users. The connection between the backend and the bot happens through a message queue.
4. **Relational Database**: Used to store user data.
5. **Redis**: Acts as a session store for the backend.
6. **Message queue**: Provides connection between the bot and the backend.

## Deployment

Deployment is managed using **Docker** and **Docker Compose**. There are two profiles: `dev` and `production`. The only difference is that the `dev` profile provides a "hot-reload" feature for frontend development.

To deploy the application, run the `docker-compose` command in the project's root directory, setting the appropriate profile.


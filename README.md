
# Multiplayer Tic-Tac-Toe web app

This project is a web application providing a multiplayer (1v1) game of tic-tac-toe.



## Documentation


The project follows a microservices architecture. It consists of 6 components: A backend application made with express.js managing authentication, sessions, game rooms and the game flow. A frontend application made with react, connecting to the backend with REST and websocket. A bot application written in go using a mini-max algorithm. Connection between the backend and the bot happens trough a message queue. User data is stored in a relational database. Redis acts as as a session store for the backend. 
## Deployment

Deployment of the project is done using docker and docker-compose. There are 2 profiles: dev and production. They differ only in the frontend server to provide a "hot-reload" functionality to developers. To deploy the application run the docker-compose command in the projects root while setting the profile.

    docker compose --profile production up

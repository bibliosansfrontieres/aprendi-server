# Aprendi-Server

Aprendi is a tool built by Libraries Without Borders to help communities curate local resources in a dynamic, reliable, and relevant fashion.

The live site can be found at [https://www.aprendi.org/](https://www.aprendi.org/).

This repo contains the backend code, the client app can be found [here](https://github.com/librarieswithoutborders/aprendi/)

## Requirements

For development, you will need [Node.js](http://nodejs.org/) installed in your environment and an environment file from the project administrator.

---

## Install

    $ git clone https://github.com/librarieswithoutborders/aprendi-server.git
    $ cd aprendi-server
    $ npm install
    
You will also need to request an environment file from the project administrators

### Development: Start/Watch

    $ npm run dev
    
### Production Deployment

  See [Deployment Page](https://github.com/librarieswithoutborders/aprendi-server/wiki/Deployment) in Wiki

---

## Languages & tools

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/)

---

## Project Structure

- **controllers/** : database operations for each content type
- **models/** : model definitions for each content type
- **utils/** : helper functions for database operations
- **index.html** : fallback html page
- **server.js** : database/server startup and endpoint definitions
- **package.json**

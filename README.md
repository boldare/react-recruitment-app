# Retromeet App
## Introduction
Retromeet is an application meant for using during Scrum retrospective meetings, but it can also be used for other purposes whenever a board with columns and cards is needed.
Basic functionality includes:
- setting your username
- creating a new retro with custom columns
- adding/editing/deleting cards inside columns
- cards voting with votes limit
- going through different stages of the meeting

The app uses [OCRA](https://github.com/Ajdija/opinionated-create-react-app-framework), which derives from [Create React App](https://github.com/facebook/create-react-app), but there are some custom solutions included as well. They will be described further below.

The project is divided into client and server parts.
## Setup
#### Starting Docker
- Install [Docker](https://docs.docker.com/install/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)
- make local copies of template configuration files:
  - `.docker/.env.dist` -> `.docker/.env`
  - `config/server.json.dist` -> `config/server.json`
  - `.env.dist` -> `.env`
- enter `.docker` directory and run: `docker-compose up --build -d`

Alternatively, if you don’t want to use docker you can run both client and server manually:
 - install and run [MongoDB](https://docs.mongodb.com/manual/installation/)
 - `yarn install`
 - `yarn start:client`
 - `yarn dev:server`

## Client
`src/client`
#### Material UI
On the client side we use material-ui components and their solution for [CSS in JS](https://material-ui-next.com/customization/css-in-js/).
#### Redux Form
The forms in the app (e.g. create, join retro) are implemented using [redux-form](https://redux-form.com) and [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) components.
#### WebSocket Provider
`src/website/services/websocket`

We are using a custom WebSocket Provider that uses socket.io.
#### Locale Provider
`src/website/i18n`

We are using custom Locale Provider based on react-intl. It’s basically a wrapper around IntlProvider.
## Server
`src/server`

On the server side we use [mongoose](http://mongoosejs.com/) object modeling.

## Structure
Application structure is action based (like a client redux implementation). Directory contains actions catalogue with a set of actions based on the application state and model catalogue with a mongoose models. In order to add new “action” it’s necessary to add new directory: `src/server/actions/<action_name>` with two files: `<action_name>.actions.js` and `<action_name>.handlers.js`. 

The `<action_name>.actions.js` file defines which actions are being implemented in the socket and defines their name. The `<action_name>.handlers.js` implements handlers for those actions which take given parameters and state to interact with mongodb through mongoose models. Results can be emitted or broadcasted (through `src/server/action-performer.js`).

Created actions are being automatically handled while connecting to socket.

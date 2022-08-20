# Front end

This project is responsible for the front end part of the application. It's a [React](https://reactjs.org/) SPA.

Created using [Create React App](https://create-react-app.dev/)

### This project is responsible for

- Creating the message data object to send to an Apache Kafka cluster
- Making requests to the back end
- Keeping track of messages sent during current session

### Key dependencies

- [Typescript](https://www.typescriptlang.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [FakerJS](https://fakerjs.dev/)

### Key scripts

- `npm run start-demo` starts the front end project in demo mode. This mode _does not expect_ the front end project to be connected to the back end.
- `npm run start` starts the front end project normally. This mode _expects_ the front end project to be connected to the back end

#### Configuration

- Environment variables
  - `REACT_APP_BACK_END_URL` sets the back end project url

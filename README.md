# Flight App Backend
# Getting Started

This mobile application is built with a MySQL database and allows users to create flights by selecting the origin and destination from a local database, specifying the date, and indicating the number of passengers.

The app also supports user account creation, enabling individuals to log in and maintain a personalized list of flights associated with their account. This ensures that each user has access to their own unique flight history and bookings.

## Authors

- [@Diana-Camz](https://www.github.com/octokatherine)


## Installation

You can clone this repository 
```bash
  git@github.com:Diana-Camz/flightApp_backend.git
```
Run the backend server with
```bash
  npm run dev
```
And run the frontend application with
```bash
  npx expo start
```

## Configure environment variables
Clone .env.template file to .env and add your environment variables

## Technologies used
- **React Native Expo**: For creating the mobile application.
- **React Navigation**: For navigation between screens.
- **AsyncStorage**: Provides persistent local storage for saving user login data and preferences.
- **dotenv**: For managing environment variables.
- **Express.js**: Manages HTTP requests and routes.
- **MySQL**: Stores user and flight data.
- **JWT**: Secure user authentication with JSON Web Tokens.
- **bcryptjs**: Encrypts and compares passwords.

## Screenshots
Login using bcryptjs and JWT for user authentication. Additionally, it has backend validation to check if your email or password is incorrect:
<img src='./client/src/screenshots/login1.jpg' width="280" height="600">

User creation includes validation to check if the email is already registered and if the password contains fewer than 6 characters.
<img src='./client/src/screenshots/createAccount.png' width="1120" height="600">

Home screen that shows whether you have any flights created, along with a button that allows you to log out:
<img src='./client/src/screenshots/Home.png' width="560" height="600">

You can create a new flight by selecting the origin, destination, date, and number of passengers. At the end, an Alert will notify you whether the flight was successfully created or not:
<img src='./client/src/screenshots/createFlightProcess1.png' width="1120" height="600">
<img src='./client/src/screenshots/createFlightProcess2.png' width="840" height="600">

Any flight information can be edited, and at the end, an alert will notify you whether the flight was successfully updated or not:
<img src='./client/src/screenshots/updateFlight.png' width="840" height="600">

Additionally, any flight can be permanently deleted from the database. Before this action, an alert will appear to confirm the deletion:
<img src='./client/src/screenshots/deleteFlight.png' width="840" height="600">
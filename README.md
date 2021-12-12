# Intive Patronage

An app that lets you view and manipulate users in database

# Technologies

- React.js

- Typescript

- Plain CSS (without preprocessors)

- [Ant design](https://ant.design/) as a design system

- A little bit of node js to simulate a REST API

# Launch

`yarn` - install all the dependencies

`node server.js` - run server

`yarn start` - run frontend

# Backend

Files are served via [json-server](https://github.com/typicode/json-server) library that's using `db.json` file as a data source and generates a REST API to serve the data.

It's using a custom middleware(source code for which you can find in `server.js` file). It works only for `/Users` and `/Users/{user_id}` paths and maps the array of `hobbies` ids to actual hobbies(objects).

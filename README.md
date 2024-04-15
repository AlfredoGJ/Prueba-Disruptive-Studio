# Distuptive Studio challenge app

## How to run

### Prerequisites

- Download the repository
- Have mongodb server installed
- add the corresponding `.env` files with the appropiate variables to the `backend` and the `frontend` folders. An example is provided in each of those folders for reference.
- run `npm i` inside the `backend` folder
- run `npm i` inside the `frontend` folder

### Running the backend

The easiest way to run the backend is with nodemon. install it `npm install -g nodemon`, then `cd backend` and run `nodemon index.ts`

### Running the frontend

if you wish you can just start a dev server with `npm start` inside the `frontend` folder.

or create a production optimized build by running `npm run build`

and then serve it using `serve`

`npm instal -g serve`

`serve -s build`

### Extra information

the db is already seed with an admin user and 3 content types.

the credentials for the admin are
`email: admin@myapp.com` and `username: Admin`

For each user the necesary credentials are `email` and `username`.

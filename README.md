# NodeJS project template

## Description

This template uses:

- Typescript
- TypeORM
- NodeJS
- Express
- Postgres
- ESLint
- Swagger

## Configuration

Make sure you have node and docker installed by typing `node -v` and `docker -v` in terminal.

1. Use the repository as template (by forking it or using this one directly)
2. Install dependencies `yarn`
3. Run `docker run -d --name postgres -e POSTGRES_PASSWORD=mypass -e -p 5432:5432 postgres:latest`
4. Create a database in your container
5. Configure `.env` file copying the .env.example and setting the variables
6. Configure `ormconfig.json` by copying the ormconfig.example.json and setting the variables
7. If you want to integrate basic users authentication features, change the default branch for the feature branch, delete main branch and rename the feat branch to main

## Scripts

- `yarn dev:server`: starts the server in the port you specified in .env (default 3333)

- `yarn typeorm`: enables typeorm cli

- `yarn lint`: check linting rules based in the .eslintrc.json file

- `yarn build`: transpile the src directory

## Notes

Don't forget to check if the template features fits your use case!

Check for the .github/workflows files, because they will need to be updated once you start your deploy 

## Features

### feat/authentication

This branch includes:

- Standard user table and entity including
  - name
  - email
  - cpf
  - phone
  - password
- User creating
- Login
  - generates a jwt token with 1d expiration time
- Email service implementation
  - Dev mailing: uses ethereal, preview link in console
  - Prod mailing: uses ses, in order to use it you need to register an email and a domain in aws and set it in mail config. Besides that, you need to configure .env variables with AWS secret keys.

# Project Setup

## Node.js

Go to the server folder in the terminal and let nodemon start the index.js file

```
nodemon index.js
```

## Vite.js

Go to the client folder in the terminal and run it

```
npm run dev
```

## Auth0 React SDK Sample Application

### Configure credentials

The project can be configured to your domain and clientId through Auth0.

json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "audience": "{YOUR AUTH0 API_IDENTIFIER}",
  "appOrigin": "{OPTIONAL: THE BASE URL OF YOUR APPLICATION (default: http://localhost:3000)}",
  "apiOrigin": "{OPTIONAL: THE BASE URL OF YOUR API (default: http://localhost:3001)}"
}


# Troubleshoting

## Nodemon

If your policy to running script is restricted when trying to use Nodemon.
```

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

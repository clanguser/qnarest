# Q&A REST API Documentation
This documentation provides an overview of the Q&A REST API, which allows users to create, read, update, and delete questions. The API is built using NodeJS, Express and MongoDB. The API uses JSON Web Tokens (JWT) for authentication. Users can sign up, obtain a token through the login endpoint, and include the token in the Authorization header of subsequent requests.

## Base URL
The base URL for all API endpoints is http://localhost:3000.

## Installation
1. Clone the repo
2. Install the packages
```shell
  npm init -y
  npm install express mongoose nodemon jsonwebtoken bcrypt
```

3. Run the server
```shell
  npx nodemon server.js
```
4. Use route.rest to test the API endpoints

# API ENDPOINTS

## Signup
Endpoint: POST /signup

![image](https://github.com/clanguser/qnarest/assets/91418836/804900f8-76c8-4702-9638-d60820a04a07)



## Login
Endpoint: POST /login

![image](https://github.com/clanguser/qnarest/assets/91418836/d53dc42f-cf6b-4f4c-b7cb-bdb38913180b)


## Create a Question
Endpoint: POST /questions

![image](https://github.com/clanguser/qnarest/assets/91418836/0fc5168f-fff9-4337-b6fb-869e166d30fa)


## Get All Questions (Paginated)
Endpoint: GET /questions

![image](https://github.com/clanguser/qnarest/assets/91418836/1f294be2-616e-4734-ada5-130e0346568b)


## Get a Specific Question
Endpoint: GET /questions/{id}

![image](https://github.com/clanguser/qnarest/assets/91418836/572140af-f368-42f0-b005-1850ba6455dd)


## Update a Question
Endpoint: PUT /questions/{id}

![image](https://github.com/clanguser/qnarest/assets/91418836/ec436d5a-33cd-40bf-a407-df4afb6085ad)


## Delete a Question
Endpoint: DELETE /questions/{id}

![image](https://github.com/clanguser/qnarest/assets/91418836/01bedb27-639b-4dcc-b3e2-1d75f95be6ed)



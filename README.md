# Lawler News API

**Hosted link:** [Lawler News API](https://lawler-news.onrender.com/api)

## About

This Api was created for the back-end project for [Northcoders](https://www.northcoders.com/). It provides database access for users. Allowing them to retrieve information such as articles, comments and users as well as allowing them to update the database by adding or deleting comments or updating the votes count. Below are a list of technologies used for this project: 



- Express
- Node.js
- node-pg
- pg-format
- dotenv
- husky
- jest

Whilst developing this app I used real-world development practices such as AGILE methodology. Multiple git branches were used, pushed and pulled to organize new features. The code alsoe adheres to the MVC design pattern, using models to interact with the database and controllers handling requests and responses. This project was written with Test Driven Development (TDD) using Jest.

## Instructions

If you want to test and develop my project please follow the instructions below.

### 1. First clone the repo in your terminal

```
git clone https://github.com/Lawler45/lawler-news-front-end.git
```

### 2. Ensure that you install the required dependencies

```
npm i
```

### 3. Create .env files in root directory

```sql
npm run dev
```
## Version requirements

Node v20.3.1

psql v14.9
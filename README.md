# eCommerce-shop-api

## Getting started

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on you local machine.

* [**Node JS**](https://nodejs.org/en/)
* [**Express**](https://expressjs.com/)
* [**MySQL**](https://www.mysql.com/downloads/)

### Installation

* Clone this repository

* Navigate to the project directory

* Run `npm install` or `yarn` to instal the projects dependencies
* create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
cp .env.sample .env
```
* Create a MySQL database and run the `sql` file in the database directory to migrate the database

```sh
mysql -u <dbuser> -D <databasename> -p < ./src/database/database.sql
```

* Run `npm run dev` to start the app in development

* Run `npm test` to test the app in development
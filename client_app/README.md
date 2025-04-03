# Inventory Manager 42 (IM42)

## Description

This project is an Inventory Management System designed to allow inventory managers to track and manage their inventory of items. The system provides both authenticated and unauthenticated access to inventory data, ensuring users can create, view, edit, and delete items within their inventory. Unauthenticated users can browse and view all publicly available items, while authenticated inventory managers have additional capabilities to manage their own inventory.

## Installation Instructions

1. Clone this repository
```bash
git clone https://github.com/Chaos66-dev/sdi29-zprefix.git
```

2. Navigate to this directory
```bash
cd sdi29-zprefix
```

3. Ensure Docker is running
- If you need to install Docker, please do so for your machine. Installation instructions can be found here: https://www.docker.com/get-started/
- Running the command `docker -v` should give an output similar to `Docker version 27.3.1, build ce12230`.

4. Create your .env file
- This project is configured to use dotenv and expects a file titled '.env'. This file should live in the root director of this project and specify the following env variables:
```
POSTGRES_HOST=pg_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=*insert-your-own-password-here*
POSTGRES_PORT=5432
POSTGRES_DB=inv_mgmt
NODE_ENV=development
```
- Feel free to change any of the specified default values above, however be sure to ensure they are passed correctly to the following files:
```
./server/knexfile.js
./server/src/server.js
./docker-compose.yaml
./server/Dockerfile
```

5. Run the following command to spin up your containers from the project's root directory.
```bash
docker-compose up --build
```

6. Navigate to the following urls to see the client and server containers:
Client: `http://localhost:5173`
Server: `http://localhost:4000`

7. When finished run the following command to stand down the containers and remove the unused containers, images, and volumes:
```bash
docker-compose down --rmi all
docker volume prune
```

##  Usage

#### Home Page
  - When navigating to the home route at `http://localhost:5173` you will be not logged in and see the four pre-seeded items for each pre-seeded user's inventory (More about the pre-seeded users below). This view allows a user, logged in or not, to view all of the items in every user's inventory. Clicking on the item card will direct them to a detailed view of the item. If logged in, users will be able to click the 'edit' or 'delete' buttons on the item card to perform actions on these items.

#### My Items Page
  - When the 'My Items' button is clicked, the displayed results will be filterd to only display the items which are in the current user's inventory (if the user is not logged in, there will be no items displayed). From this page, logged in users may also create a new item by clicking the 'Create Item' button, filling in the fields, and clicking the 'Create' button.

#### Login Page
  - On this page, one can login to one of the pre-seeded accounts, create, edit, or delete users. Once one successfully logs in, they are navigated to the 'My Items' Page. If you would like to log out, please click the "Log Out" button.

#### Pre-Seeded Users
  - Feel free to login as one of the pre-seeded users or create your own! The credentials for the users are below:
  Username: `Chaos` Password: `zprefixrocks`
  Username: `jkelley` Password: `lovethebeard`
  Username: `mwegenke` Password: `fearthisbear`
  Username: `jhaddock` Password: `coolhatman`



## Author
My name is Erik Voss and my github's are listed below:
  - https://github.com/Chaos66-dev
  - https://github.com/shimi66

Thanks for the course! I have thoroughly enjoyed my time and learned quite a bit!
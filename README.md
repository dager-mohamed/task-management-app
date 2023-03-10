
# To do List Application - Key Features
 - **User registration and login functionality for task management.**
 - **Option to add, edit and delete tasks.**
 - **Option to mark tasks as complete.**
 - **Choosing the priority of the task.**

![App Screenshot](https://i.imgur.com/8hABxSW.png)

![App Screenshot](https://i.imgur.com/km4evry.png)

# Setup the application

Go to the `backend` folder and install packages
```bash
npm install 
```
then go to `frontend` folder and install packages
```bash
npm install
```
and then go to `.env` file in `backend` folder and fill in all fields
```
PORT=YOUR_BACKEND_PORT
MONGO_URL=YOUR_MONGO_DB_URL
JWT_SECRET=YOUR_JWT_PASSWORD
```
and then go to `.env` file in `frontend` folder and fill in all fields
```
VITE_BACKEND_URL=YOUR_BACKEND_URL
```

NOTE: to run the `backend` folder or `frontend` folder just type:
```bash
npm run dev
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


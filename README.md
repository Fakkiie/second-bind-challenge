Prerequisites
Ensure you have the following installed:

Node.js (v14+ recommended)
Git
SQLite

Clone this repository to your local machine:
git clone https://github.com/Fakkiie/second-bind-challenge.git
cd second-bind-challenge

Install Backend Dependencies

Navigate to the inventory-management-system folder and install the necessary backend dependencies:
cd inventory-management-system
npm install

Set Up SQLite Database
The project uses an SQLite database. No manual setup is required as the database will be created automatically when you run the server.
Start the backend server on port 5001:
node server.js
This will start the backend server at http://localhost:5001.

Install Frontend Dependencies

Open a new terminal window/tab, navigate to the inventory-management-frontend folder, and install the frontend dependencies:
cd inventory-management-frontend
npm install
npm start
This will start the React app at http://localhost:3000.

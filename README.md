Smart Library Borrowing System – MERN Stack

A full-stack web application to manage book borrowing, return process, overdue fine calculation and student dashboards.

🚀 Features
🔐 Authentication

Student / Staff Login

Secure password hashing using bcrypt

JWT based authentication

📖 Book Management

20 Predefined books seeded automatically

View all available books

Availability decreases after borrowing

🔁 Borrowing Rules

Only one active borrow per student

Maximum 7 days borrowing

Borrow Cost = pricePerDay × days

Overdue Fine = duePerDay × overdueDays

📤 Return Book

Manual return date input

Overdue fine calculated automatically

Status updated from Active → Returned

📊 Dashboard

Active Borrow Count

Borrow History Count

Total Due Amount

🛠 Tech Stack

Layer	Technology
Frontend	React.js
Backend	Node.js, Express.js
Database	MongoDB
Authentication	JWT
Styling	Bootstrap


⚙ Installation Steps
Backend Setup
cd backend
yarn install
nodemon server.js


Create .env inside backend folder:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=library_secret

Frontend Setup
cd frontend
yarn install
yarn start

🔗 API Endpoints
Feature	Method	Endpoint
Register	POST	/api/auth/register
Login	POST	/api/auth/signin
View Books	GET	/api/books
Borrow Book	POST	/api/borrow
Active Borrow	GET	/api/borrow/active/:userId
Return Book	POST	/api/borrow/:id/submit
Borrow History	GET	/api/borrow/history/:userId
Dashboard	GET	/api/borrow/dashboard/:userId


👤 Sample Credentials
Admission ID	Password
Kunal	123456


🧠 Business Logic

Prevents duplicate borrowing

Restricts borrowing duration

Calculates overdue automatically

Books seeded on server start

Authentication protected routes

👨‍💻 Author

Kunal Das
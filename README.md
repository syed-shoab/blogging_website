# Blogging Website

This is a full-stack blogging website built using Node.js, Express, and MongoDB for the backend, and HTML, CSS, and JavaScript for the frontend.

## Features

- User registration and login
- Create and view blog posts
- Add comments to posts
- Search posts
- Responsive and user-friendly design

## Folder Structure

blog_app/ ├── client/ # Frontend files │ ├── index.html │ ├── style.css │ └── main.js │ ├── server/ # Backend files │ ├── index.js │ ├── .env # MongoDB connection string goes here │ ├── models/ │ │ ├── comment.js │ │ ├── post.js │ │ └── user.js │ ├── routes/ │ │ ├── auth.js │ │ ├── comments.js │ │ └── posts.js │ ├── package.json │ └── package-lock.json


## How to Run Locally

1. **Clone the repository:**
git clone https://github.com/syed-shoab/blogging_website.git cd blogging_website

2. **Install backend dependencies:**
cd server npm install

3. **Set up environment variables:**
Create a `.env` file inside the `server` folder and add:
MONGO_URI=your_mongodb_connection_string


4. **Start the backend server:**
node index.js  (or) nodemon index.js


5. **Open `client/index.html` in your browser to view the app.**

## Deployment Options

- **Frontend:** GitHub Pages, Netlify, or 000webhost
- **Backend:** Render, Heroku, or any free Node.js-compatible host

## Author

**Syed Shoab**  
📧 syedshoab1100@gmail.com



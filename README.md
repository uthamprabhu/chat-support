# Chat Application

A real-time chat application using modern technologies, fully deployed on **Netlify** (frontend) and **Heroku** (backend).

## Deployed Links

- **Frontend**: <a href="https://splendid-monstera-31993e.netlify.app" target="_blank" rel="noopener noreferrer">Netlify Deployed Site</a>
- **Backend**: <a href="https://react-chat-app-d13acb806081.herokuapp.com" target="_blank" rel="noopener noreferrer">Heroku Deployed API</a>


---

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **Socket.IO Client**: For real-time communication with the server.
- **CSS**: For styling the components.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for building the API and handling routing.
- **Socket.IO**: For WebSocket-based real-time communication.
- **CORS**: For enabling cross-origin requests.

### Deployment
- **Netlify**: For hosting the frontend.
- **Heroku**: For hosting the backend API.

---

## How to Run the Application Locally

### Prerequisites
- Node.js and npm installed
- Git installed

### Steps

#### 1. Clone the Repository
bash
git clone <repository-url>
cd <repository-folder>
#### 2. Start the Backend

1. Navigate to the backend folder (if applicable):
bash
cd backend
2. Install dependencies:
bash
npm install
3. Start the server:
bash
npm start
The backend will run at `http://localhost:8080` by default.

#### 3. Start the Frontend

1. Navigate to the frontend folder (if applicable):
bash
cd frontend
2. Install dependencies:
bash
npm install
3. Start the React development server:
bash
npm start
The frontend will run at `http://localhost:3000` by default.

4. Ensure the frontend points to the correct backend URL:
   - Update the backend URL in your source code (e.g., `frontend/src/config.js` or directly in the API calls) to `http://localhost:8080` for local development, or the deployed Heroku backend URL.

---

## Features

- Real-time messaging
- Dynamic room creation
- Notifications for new users joining or leaving

---

## Deployment Steps

### Deploying the Frontend on Netlify
1. Build the React app:
bash
   npm run build
   
2. Drag and drop the `build` folder onto the Netlify dashboard or use the Netlify CLI.

3. Ensure the backend URL in the React app points to the deployed Heroku backend.

### Deploying the Backend on Heroku
1. Log in to Heroku:
bash
   heroku login
   
2. Create a Heroku app:
bash
   heroku create
   
3. Deploy the app:
bash
   git push heroku main
   
4. Ensure the backend has proper CORS configuration to allow requests from the Netlify frontend.

---

## Troubleshooting

- **CORS Issues**: Ensure the backend CORS configuration includes your frontend URL.  
- **Socket.IO Errors**: Verify the `socket.io` client and server versions are compatible.  
- **Build Errors**: Make sure you run `npm install` in both frontend and backend directories.  

---

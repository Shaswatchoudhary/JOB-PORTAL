# Job Portal (MERN Stack)

A Job Portal web application built using the MERN stack to connect job seekers with employers. The platform allows users to register, post jobs, search for jobs, and apply online.

![Job Portal Banner](https://via.placeholder.com/1200x400.png?text=Job+Portal+MERN+Stack)

## Features

### User Roles:
1. **Job Seeker**:
   - Sign up and log in.
   - Create and update a profile with skills, experience, and resume upload.
   - Search and filter jobs by keyword, location, and category.
   - Apply to jobs and view application status.

2. **Employer**:
   - Sign up and log in.
   - Post jobs with details (title, description, location, salary, and requirements).
   - Manage job postings (edit/delete).
   - View applications and contact candidates.

### General Features:
- Authentication and Authorization (JWT-based).
- Secure password storage (bcrypt hashing).
- Responsive design for mobile and desktop.
- Real-time notifications for applications (optional).
- Admin panel for managing users and posts (optional).

## Tech Stack

### Frontend:
- React.js with Hooks and Context API/Redux for state management.
- React Router for navigation.
- Styled Components/Material-UI for UI design.

### Backend:
- Node.js with Express.js for the server.
- MongoDB with Mongoose for the database.
- JWT for authentication and authorization.
- Multer for file uploads (e.g., resumes).

### Others:
- Cloudinary/AWS S3 for storing resumes and images.
- Axios for API calls.
- Dotenv for environment variables.

## Installation and Setup

### Prerequisites:
- Node.js installed on your system.
- MongoDB instance (local or cloud-based like MongoDB Atlas).
- A GitHub account (for code hosting).

### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/job-portal.git
   cd job-portal
   ```

2. **Install Dependencies:**
   - For backend:
     ```bash
     cd backend
     npm install
     ```
   - For frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Variables:**
   Create a `.env` file in the `backend` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url (optional)
   ```

4. **Run the Application:**
   - Start the backend:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Folder Structure

```
job-portal/
├── backend/
│   ├── config/         # Database and environment configurations
│   ├── controllers/    # Logic for handling requests
│   ├── middleware/     # Authentication and other middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Pages for routes
│   │   ├── context/    # State management
│   │   ├── utils/      # Helper functions
│   │   └── App.js      # Main React component
│   └── package.json    # Frontend dependencies
└── README.md           # Project documentation
```

## API Endpoints

### Authentication:
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user.

### Job Seeker:
- `GET /api/jobs`: List all jobs.
- `POST /api/jobs/apply/:id`: Apply to a job.

### Employer:
- `POST /api/jobs`: Create a job post.
- `PUT /api/jobs/:id`: Edit a job post.
- `DELETE /api/jobs/:id`: Delete a job post.

## Future Improvements
- Add real-time chat between employers and job seekers.
- Integrate payment gateways for premium job postings.
- Add an admin dashboard for managing platform activity.

## Screenshots

### Home Page:
![Home Page](https://via.placeholder.com/800x400.png?text=Home+Page)

### Job Listing:
![Job Listing](https://via.placeholder.com/800x400.png?text=Job+Listing)

### Application Page:
![Application Page](https://via.placeholder.com/800x400.png?text=Application+Page)

## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### Let's build a connected future!

---

## Social Links

- **GitHub Repository:** [Job Portal]((https://github.com/Shaswatchoudhary/JOB-PORTAL))
- **LinkedIn:** [Your LinkedIn Profile](https://www.linkedin.com/in/shaswat-choudhary-6a36b824b/)
- **Portfolio:** [Your Portfolio](https://shaswatportfolio.netlify.app/)

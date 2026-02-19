# Career Guide Platform

A premium, full-stack career guidance platform built with React, Node.js, Express, and MySQL. Helps students, graduates, and professionals discover suitable careers through personalized assessments, roadmaps, and expert guidance.

## 🎯 Features

- **User Authentication** - JWT-based secure authentication
- **Career Assessment Engine** - Psychometric, aptitude, and personality tests
- **AI-Powered Recommendations** - Personalized career matching algorithm
- **Career Library** - 50+ careers with detailed information
- **Step-by-Step Roadmaps** - Clear paths from education to career success
- **Skill Gap Analysis** - Compare your skills vs required skills
- **Course Integration** - Curated learning resources from Coursera, Udemy, SWAYAM
- **Counselling Booking** - Schedule sessions with career experts
- **Subscription Plans** - Tiered access to premium features
- **Admin Panel** - Manage careers, questions, and analytics

## 🏗️ Tech Stack

### Backend

- Node.js & Express.js
- MySQL Database
- JWT Authentication
- bcrypt for password hashing

### Frontend

- React 18
- React Router v6
- Axios for API calls
- Framer Motion for animations
- Chart.js for data visualization

## 📁 Project Structure

```
career-guide/
├── server/                 # Backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── database/          # SQL schema and seeds
│   └── server.js          # Entry point
│
├── client/                # Frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── utils/        # Utilities
│   │   └── styles/       # CSS files
│   └── index.html
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
cd d:/career-guide
```

2. **Set up the database**

Create a MySQL database:

```sql
CREATE DATABASE career_guide;
```

Run the schema:

```bash
mysql -u root -p career_guide < server/database/schema.sql
```

Run the seed data:

```bash
mysql -u root -p career_guide < server/database/seed.sql
```

3. **Configure Backend**

Create `.env` file in `server/` directory:

```bash
cd server
copy .env.example .env
```

Edit `.env` with your database credentials:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=career_guide
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:5173
```

4. **Install Backend Dependencies**

```bash
cd server
npm install
```

5. **Install Frontend Dependencies**

```bash
cd ../client
npm install
```

### Running the Application

1. **Start the Backend Server**

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**

```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:5173`

3. **Access the Application**

Open your browser and navigate to `http://localhost:5173`

## 📊 Database Schema

### Core Tables

- `users` - User accounts and profiles
- `careers` - Career information
- `skills` - Master skills table
- `career_skills` - Skills required per career
- `assessment_questions` - Test questions
- `assessment_answers` - User responses
- `career_matches` - Recommendation results
- `courses` - Learning resources
- `counselling_sessions` - Booking data
- `subscriptions` - Payment and plans
- `user_progress` - Saved careers and tracking

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Careers

- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get career by ID
- `GET /api/careers/field/:field` - Get careers by field

### Assessment

- `GET /api/assessment/questions` - Get assessment questions
- `POST /api/assessment/submit` - Submit answers
- `GET /api/assessment/results` - Get results

### Recommendations

- `GET /api/recommendations` - Get career recommendations
- `GET /api/recommendations/skill-gap/:careerId` - Get skill gap analysis

### Courses

- `GET /api/courses/career/:careerId` - Get courses for career
- `GET /api/courses/skill/:skillId` - Get courses for skill

### Counselling

- `POST /api/counselling/book` - Book session
- `GET /api/counselling/sessions` - Get user sessions

### Subscriptions

- `GET /api/subscriptions/plans` - Get all plans
- `POST /api/subscriptions/subscribe` - Subscribe to plan

## 🎨 Design Philosophy

This platform follows a **human-centered design approach**:

- **Authentic, not AI-generated** - Intentional asymmetry and natural spacing
- **Conversational copy** - No buzzwords, just real talk
- **Premium aesthetics** - Sophisticated color palette, thoughtful typography
- **Purposeful interactions** - Micro-animations that enhance UX
- **Accessible** - WCAG compliant, semantic HTML

## 🔐 Default Admin Account

```
Email: admin@careerguide.com
Password: admin123
```

**⚠️ Change this in production!**

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

This is a learning project. Feel free to fork and modify as needed!

## 📧 Support

For questions or issues, please create an issue in the repository.

---

Built with ❤️ to help people find careers they love.

-- Seed data for Career Guide Platform (Fixed version)
-- This includes realistic sample data for testing

-- Insert Skills
INSERT INTO
    skills (name, category, description)
VALUES (
        'Python Programming',
        'technical',
        'Programming language widely used in data science, web development, and automation'
    ),
    (
        'JavaScript',
        'technical',
        'Essential language for web development'
    ),
    (
        'Data Analysis',
        'analytical',
        'Ability to interpret and analyze complex data'
    ),
    (
        'Communication',
        'interpersonal',
        'Effective verbal and written communication skills'
    ),
    (
        'Problem Solving',
        'analytical',
        'Critical thinking and solution-oriented approach'
    ),
    (
        'Leadership',
        'interpersonal',
        'Ability to guide and motivate teams'
    ),
    (
        'Creativity',
        'creative',
        'Innovative thinking and artistic expression'
    ),
    (
        'Project Management',
        'organizational',
        'Planning and executing projects efficiently'
    ),
    (
        'SQL',
        'technical',
        'Database query language'
    ),
    (
        'Machine Learning',
        'technical',
        'AI and predictive modeling'
    ),
    (
        'UI/UX Design',
        'creative',
        'User interface and experience design'
    ),
    (
        'Public Speaking',
        'interpersonal',
        'Presenting ideas to audiences'
    ),
    (
        'Research',
        'analytical',
        'Systematic investigation and study'
    ),
    (
        'Critical Thinking',
        'analytical',
        'Objective analysis and evaluation'
    ),
    (
        'Teamwork',
        'interpersonal',
        'Collaborative work with others'
    ),
    (
        'Time Management',
        'organizational',
        'Efficient use of time and prioritization'
    ),
    (
        'Writing',
        'creative',
        'Content creation and documentation'
    ),
    (
        'Mathematics',
        'analytical',
        'Numerical and logical reasoning'
    ),
    (
        'Biology',
        'science',
        'Understanding of living organisms'
    ),
    (
        'Chemistry',
        'science',
        'Understanding of matter and reactions'
    );

-- Insert Careers
INSERT INTO
    careers (
        title,
        field,
        description,
        detailed_description,
        avg_salary_min,
        avg_salary_max,
        education_required,
        job_outlook,
        future_scope,
        roadmap
    )
VALUES (
        'Software Developer',
        'IT',
        'Design, develop, and maintain software applications',
        'Software developers create applications that run on computers, mobile devices, and other platforms. They work with programming languages, frameworks, and tools to build solutions that solve real-world problems.',
        400000,
        1500000,
        'Bachelor''s in Computer Science or related field',
        'Excellent',
        'High demand with emerging technologies like AI, cloud computing, and IoT',
        '{"steps": [{"phase": "Education", "duration": "4 years", "details": "Complete B.Tech/B.E. in Computer Science or related field"}, {"phase": "Skills Development", "duration": "6-12 months", "details": "Learn programming languages (Python, Java, JavaScript), data structures, algorithms"}, {"phase": "Internships", "duration": "3-6 months", "details": "Gain practical experience through internships at tech companies"}, {"phase": "Entry Level", "duration": "1-2 years", "details": "Junior Developer role, work on real projects, learn from seniors"}, {"phase": "Mid Level", "duration": "3-5 years", "details": "Senior Developer, lead small projects, mentor juniors"}, {"phase": "Advanced", "duration": "5+ years", "details": "Tech Lead, Architect, or Engineering Manager roles"}]}'
    ),
    (
        'Data Scientist',
        'IT',
        'Analyze complex data to help organizations make better decisions',
        'Data scientists use statistical methods, machine learning, and programming to extract insights from data. They work on predictive modeling, data visualization, and building data-driven solutions.',
        600000,
        2000000,
        'Bachelor''s/Master''s in Data Science, Statistics, or Computer Science',
        'Excellent',
        'Rapidly growing field with applications across all industries',
        '{"steps": [{"phase": "Education", "duration": "4-6 years", "details": "B.Tech + M.Tech or specialized Data Science degree"}, {"phase": "Skills", "duration": "6-12 months", "details": "Python, R, SQL, Machine Learning, Statistics, Data Visualization"}, {"phase": "Projects", "duration": "3-6 months", "details": "Build portfolio with Kaggle competitions, personal projects"}, {"phase": "Entry Role", "duration": "1-2 years", "details": "Data Analyst or Junior Data Scientist"}, {"phase": "Growth", "duration": "3-5 years", "details": "Senior Data Scientist, lead ML projects"}, {"phase": "Expert", "duration": "5+ years", "details": "Lead Data Scientist, ML Architect, or Chief Data Officer"}]}'
    ),
    (
        'Digital Marketing Specialist',
        'Business',
        'Plan and execute online marketing campaigns',
        'Digital marketers use SEO, social media, content marketing, and analytics to promote brands and products online. They create strategies to reach target audiences and drive business growth.',
        300000,
        1000000,
        'Bachelor''s in Marketing, Business, or related field',
        'Very Good',
        'Growing with increasing digital transformation',
        '{"steps": [{"phase": "Education", "duration": "3-4 years", "details": "BBA, B.Com, or Marketing degree"}, {"phase": "Certifications", "duration": "3-6 months", "details": "Google Analytics, Facebook Blueprint, HubSpot certifications"}, {"phase": "Internship", "duration": "3-6 months", "details": "Work with marketing agencies or in-house teams"}, {"phase": "Junior Role", "duration": "1-2 years", "details": "Digital Marketing Executive, manage campaigns"}, {"phase": "Mid Level", "duration": "2-4 years", "details": "Digital Marketing Manager, strategy development"}, {"phase": "Senior", "duration": "5+ years", "details": "Head of Digital Marketing or CMO"}]}'
    ),
    (
        'Graphic Designer',
        'Arts',
        'Create visual content for brands and media',
        'Graphic designers use creativity and software tools to design logos, websites, advertisements, and other visual materials. They combine art and technology to communicate ideas.',
        250000,
        800000,
        'Bachelor''s in Design, Fine Arts, or related field',
        'Good',
        'Steady demand with growth in digital media',
        '{"steps": [{"phase": "Education", "duration": "3-4 years", "details": "B.Des, BFA, or Graphic Design degree"}, {"phase": "Software Skills", "duration": "6-12 months", "details": "Master Adobe Creative Suite, Figma, Sketch"}, {"phase": "Portfolio", "duration": "6 months", "details": "Build strong portfolio with diverse projects"}, {"phase": "Freelance/Internship", "duration": "6-12 months", "details": "Gain experience through freelancing or internships"}, {"phase": "Designer Role", "duration": "2-3 years", "details": "Junior to Mid-level Designer"}, {"phase": "Senior", "duration": "5+ years", "details": "Art Director, Creative Director"}]}'
    ),
    (
        'Doctor (MBBS)',
        'Healthcare',
        'Diagnose and treat patients, promote health',
        'Doctors are medical professionals who diagnose illnesses, prescribe treatments, and care for patients. They specialize in various fields like surgery, pediatrics, cardiology, etc.',
        800000,
        3000000,
        'MBBS + MD/MS for specialization',
        'Excellent',
        'Always in demand, respected profession',
        '{"steps": [{"phase": "NEET Preparation", "duration": "1-2 years", "details": "Prepare for and clear NEET exam"}, {"phase": "MBBS", "duration": "5.5 years", "details": "Complete MBBS degree including internship"}, {"phase": "Internship", "duration": "1 year", "details": "Compulsory rotating internship"}, {"phase": "Practice/PG", "duration": "Variable", "details": "Start practice or pursue MD/MS specialization"}, {"phase": "Specialization", "duration": "3 years", "details": "Complete MD/MS in chosen specialty"}, {"phase": "Practice", "duration": "Lifelong", "details": "Establish practice or work in hospitals"}]}'
    ),
    (
        'Civil Engineer',
        'Engineering',
        'Design and oversee construction projects',
        'Civil engineers plan, design, and supervise infrastructure projects like buildings, roads, bridges, and water supply systems. They ensure projects are safe, sustainable, and cost-effective.',
        350000,
        1200000,
        'B.Tech/B.E. in Civil Engineering',
        'Good',
        'Steady demand with infrastructure development',
        '{"steps": [{"phase": "Education", "duration": "4 years", "details": "B.Tech in Civil Engineering"}, {"phase": "Internships", "duration": "6 months", "details": "Work on construction sites, learn practical aspects"}, {"phase": "Software Skills", "duration": "3-6 months", "details": "Learn AutoCAD, Revit, SAP2000, STAAD Pro"}, {"phase": "Junior Engineer", "duration": "2-3 years", "details": "Site engineer or design engineer role"}, {"phase": "Project Engineer", "duration": "3-5 years", "details": "Manage projects, coordinate teams"}, {"phase": "Senior", "duration": "7+ years", "details": "Project Manager, Consultant"}]}'
    ),
    (
        'Content Writer',
        'Arts',
        'Create written content for various platforms',
        'Content writers produce articles, blog posts, website copy, and other written materials. They research topics, write engaging content, and optimize for SEO.',
        200000,
        700000,
        'Bachelor''s in English, Journalism, or any field',
        'Good',
        'Growing with digital content demand',
        '{"steps": [{"phase": "Education", "duration": "3 years", "details": "Any bachelor''s degree, preferably in English/Journalism"}, {"phase": "Writing Practice", "duration": "6-12 months", "details": "Start a blog, practice different writing styles"}, {"phase": "Portfolio", "duration": "3-6 months", "details": "Build portfolio with sample articles"}, {"phase": "Freelance", "duration": "6-12 months", "details": "Take freelance projects, build experience"}, {"phase": "Full-time", "duration": "1-2 years", "details": "Content Writer role in company"}, {"phase": "Senior", "duration": "3+ years", "details": "Senior Writer, Content Strategist, Editor"}]}'
    ),
    (
        'Chartered Accountant',
        'Business',
        'Manage financial records and provide accounting services',
        'CAs handle accounting, auditing, taxation, and financial advisory. They help businesses manage finances, ensure compliance, and make strategic decisions.',
        600000,
        2500000,
        'CA qualification from ICAI',
        'Excellent',
        'Always in demand for financial expertise',
        '{"steps": [{"phase": "Foundation", "duration": "4 months", "details": "Register and clear CA Foundation exam"}, {"phase": "Intermediate", "duration": "8 months", "details": "Complete and clear CA Intermediate"}, {"phase": "Articleship", "duration": "3 years", "details": "Practical training under practicing CA"}, {"phase": "Final", "duration": "6 months", "details": "Clear CA Final exams"}, {"phase": "Membership", "duration": "1 month", "details": "Become ICAI member"}, {"phase": "Practice/Job", "duration": "Lifelong", "details": "Start practice or work in corporate"}]}'
    ),
    (
        'UI/UX Designer',
        'IT',
        'Design user interfaces and experiences for digital products',
        'UI/UX designers create intuitive and visually appealing interfaces for websites and apps. They focus on user research, wireframing, prototyping, and testing.',
        400000,
        1500000,
        'Bachelor''s in Design or related field',
        'Excellent',
        'High demand as digital products grow',
        '{"steps": [{"phase": "Education", "duration": "3-4 years", "details": "B.Des, BFA, or related degree"}, {"phase": "Tools", "duration": "6 months", "details": "Learn Figma, Adobe XD, Sketch, prototyping tools"}, {"phase": "UX Principles", "duration": "3-6 months", "details": "Study user research, information architecture, usability"}, {"phase": "Portfolio", "duration": "6 months", "details": "Create case studies showcasing design process"}, {"phase": "Junior Designer", "duration": "1-2 years", "details": "Work on real projects, learn from seniors"}, {"phase": "Senior", "duration": "3+ years", "details": "Lead Designer, Product Designer"}]}'
    ),
    (
        'Lawyer',
        'Law',
        'Provide legal advice and represent clients',
        'Lawyers advise clients on legal matters, represent them in court, draft legal documents, and ensure compliance with laws. They specialize in areas like corporate, criminal, or civil law.',
        400000,
        2000000,
        'LLB or integrated BA LLB/BBA LLB',
        'Good',
        'Steady demand, diverse specializations',
        '{"steps": [{"phase": "Education", "duration": "3-5 years", "details": "Complete LLB or integrated law degree"}, {"phase": "Enrollment", "duration": "6 months", "details": "Enroll with State Bar Council"}, {"phase": "Internship", "duration": "1 year", "details": "Intern with law firms or senior advocates"}, {"phase": "Junior Associate", "duration": "2-3 years", "details": "Work as junior in law firm"}, {"phase": "Independent Practice", "duration": "3-5 years", "details": "Build own practice or become senior associate"}, {"phase": "Senior", "duration": "7+ years", "details": "Senior Advocate, Partner in firm"}]}'
    );

-- Insert Assessment Questions
INSERT INTO
    assessment_questions (
        question_text,
        question_type,
        category,
        options,
        scoring_weights
    )
VALUES
    -- Interest Questions
    (
        'How much do you enjoy working with computers and technology?',
        'interest',
        'technology',
        '["Not at all", "Somewhat", "Moderately", "Very much", "Extremely"]',
        '{"Not at all": 0, "Somewhat": 2, "Moderately": 5, "Very much": 8, "Extremely": 10}'
    ),
    (
        'Do you like helping people and making a difference in their lives?',
        'interest',
        'helping',
        '["Not at all", "Somewhat", "Moderately", "Very much", "Extremely"]',
        '{"Not at all": 0, "Somewhat": 2, "Moderately": 5, "Very much": 8, "Extremely": 10}'
    ),
    (
        'How interested are you in creative activities like art, design, or writing?',
        'interest',
        'creative',
        '["Not at all", "Somewhat", "Moderately", "Very much", "Extremely"]',
        '{"Not at all": 0, "Somewhat": 2, "Moderately": 5, "Very much": 8, "Extremely": 10}'
    ),
    (
        'Do you enjoy analyzing data and finding patterns?',
        'interest',
        'analytical',
        '["Not at all", "Somewhat", "Moderately", "Very much", "Extremely"]',
        '{"Not at all": 0, "Somewhat": 2, "Moderately": 5, "Very much": 8, "Extremely": 10}'
    ),
    (
        'How much do you like leading teams and managing projects?',
        'interest',
        'leadership',
        '["Not at all", "Somewhat", "Moderately", "Very much", "Extremely"]',
        '{"Not at all": 0, "Somewhat": 2, "Moderately": 5, "Very much": 8, "Extremely": 10}'
    ),

-- Personality Questions
(
    'In group settings, do you prefer to lead or follow?',
    'personality',
    'leadership',
    '["Always follow", "Usually follow", "Depends", "Usually lead", "Always lead"]',
    '{"Always follow": 2, "Usually follow": 4, "Depends": 5, "Usually lead": 8, "Always lead": 10}'
),
(
    'How do you handle stressful situations?',
    'personality',
    'stress_management',
    '["Get overwhelmed", "Struggle but manage", "Handle reasonably well", "Thrive under pressure", "Excel in stress"]',
    '{"Get overwhelmed": 2, "Struggle but manage": 4, "Handle reasonably well": 6, "Thrive under pressure": 8, "Excel in stress": 10}'
),
(
    'Are you more detail-oriented or big-picture focused?',
    'personality',
    'detail_oriented',
    '["Very big picture", "Somewhat big picture", "Balanced", "Somewhat detail", "Very detail"]',
    '{"Very big picture": 3, "Somewhat big picture": 5, "Balanced": 7, "Somewhat detail": 8, "Very detail": 10}'
),
(
    'Do you prefer working alone or in teams?',
    'personality',
    'teamwork',
    '["Always alone", "Usually alone", "No preference", "Usually teams", "Always teams"]',
    '{"Always alone": 3, "Usually alone": 5, "No preference": 6, "Usually teams": 8, "Always teams": 10}'
),
(
    'How comfortable are you with public speaking?',
    'personality',
    'communication',
    '["Very uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very comfortable"]',
    '{"Very uncomfortable": 2, "Uncomfortable": 4, "Neutral": 5, "Comfortable": 8, "Very comfortable": 10}'
),

-- Aptitude Questions
(
    'How would you rate your mathematical abilities?',
    'aptitude',
    'analytical',
    '["Poor", "Below average", "Average", "Good", "Excellent"]',
    '{"Poor": 2, "Below average": 4, "Average": 6, "Good": 8, "Excellent": 10}'
),
(
    'How quickly can you learn new technical skills?',
    'aptitude',
    'technical',
    '["Very slowly", "Slowly", "Moderately", "Quickly", "Very quickly"]',
    '{"Very slowly": 2, "Slowly": 4, "Moderately": 6, "Quickly": 8, "Very quickly": 10}'
),
(
    'Rate your problem-solving abilities',
    'aptitude',
    'problem_solving',
    '["Poor", "Below average", "Average", "Good", "Excellent"]',
    '{"Poor": 2, "Below average": 4, "Average": 6, "Good": 8, "Excellent": 10}'
),
(
    'How good are you at expressing ideas in writing?',
    'aptitude',
    'communication',
    '["Poor", "Below average", "Average", "Good", "Excellent"]',
    '{"Poor": 2, "Below average": 4, "Average": 6, "Good": 8, "Excellent": 10}'
),
(
    'Rate your ability to think creatively and innovatively',
    'aptitude',
    'creative',
    '["Poor", "Below average", "Average", "Good", "Excellent"]',
    '{"Poor": 2, "Below average": 4, "Average": 6, "Good": 8, "Excellent": 10}'
);

-- Insert Sample Courses
INSERT INTO
    courses (
        title,
        platform,
        url,
        description,
        duration,
        price,
        currency,
        is_free,
        rating,
        career_id,
        difficulty_level
    )
VALUES (
        'Complete Python Bootcamp',
        'Udemy',
        'https://udemy.com/python-bootcamp',
        'Learn Python from basics to advanced with hands-on projects',
        '40 hours',
        499,
        'INR',
        FALSE,
        4.6,
        1,
        'beginner'
    ),
    (
        'Data Science Specialization',
        'Coursera',
        'https://coursera.org/data-science',
        'Comprehensive data science course covering statistics, ML, and visualization',
        '6 months',
        3999,
        'INR',
        FALSE,
        4.7,
        2,
        'intermediate'
    ),
    (
        'Digital Marketing Masterclass',
        'Udemy',
        'https://udemy.com/digital-marketing',
        'Complete guide to SEO, social media, and online advertising',
        '25 hours',
        799,
        'INR',
        FALSE,
        4.5,
        3,
        'beginner'
    ),
    (
        'Graphic Design Fundamentals',
        'SWAYAM',
        'https://swayam.gov.in/design',
        'Learn design principles and Adobe Creative Suite',
        '12 weeks',
        0,
        'INR',
        TRUE,
        4.3,
        4,
        'beginner'
    ),
    (
        'Introduction to Programming',
        'SWAYAM',
        'https://swayam.gov.in/programming',
        'Basics of programming with Python',
        '8 weeks',
        0,
        'INR',
        TRUE,
        4.4,
        1,
        'beginner'
    ),
    (
        'UI/UX Design Bootcamp',
        'Udemy',
        'https://udemy.com/uiux-design',
        'Master Figma, user research, and design thinking',
        '30 hours',
        899,
        'INR',
        FALSE,
        4.8,
        9,
        'intermediate'
    ),
    (
        'Machine Learning A-Z',
        'Udemy',
        'https://udemy.com/machine-learning',
        'Hands-on ML with Python and R',
        '44 hours',
        599,
        'INR',
        FALSE,
        4.5,
        2,
        'advanced'
    ),
    (
        'Content Writing Masterclass',
        'Coursera',
        'https://coursera.org/content-writing',
        'Professional writing for web and marketing',
        '4 weeks',
        1999,
        'INR',
        FALSE,
        4.4,
        7,
        'beginner'
    );

-- Create an admin user (password: admin123)
INSERT INTO
    users (
        email,
        password,
        full_name,
        is_admin,
        profile_completed
    )
VALUES (
        'admin@careerguide.com',
        '$2a$10$rZ5YvGKvXqKx8qQqX8qQqeX8qQqX8qQqX8qQqX8qQqX8qQqX8qQqX',
        'Admin User',
        TRUE,
        TRUE
    );
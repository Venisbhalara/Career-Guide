export const CAREERS = [
  {
    id: 1,
    title: "Full Stack Developer",
    field: "Technology",
    icon: "💻",
    salary: "₹8L - ₹24LPA",
    growth: "High (22%)",
    description:
      "Design and build complete web applications for top Indian startups and MNCs.",
    longDescription:
      "A Full Stack Developer is a jack-of-all-trades in the tech world, capable of working on both the front-end (what users see) and back-end (logic and database) of an application. In the Indian market, this role is highly coveted by startups like Zomato, Swiggy, and Razorpay due to the agility it offers.",
    companies: ["Zomato", "Swiggy", "Razorpay", "Cred", "Microsoft"],
    demand_level: "High",
    stats: {
      openings: 12450,
      avg_salary: "14.5L",
      top_location: "Bangalore",
      remote_friendly: "95%",
    },
    skills: [
      { name: "React/Next.js", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "SQL/NoSQL", level: 80 },
      { name: "System Design", level: 75 },
      { name: "Cloud (AWS)", level: 70 },
    ],
    // NEW: Career Trajectory
    trajectory: [
      {
        role: "Junior Developer",
        exp: "0-2 Yrs",
        salary: "₹5L-12LPA",
        focus: "Bug fixes, minor features, learning codebase",
      },
      {
        role: "Senior Developer",
        exp: "2-5 Yrs",
        salary: "₹15L-35LPA",
        focus: "Feature ownership, code reviews, design patterns",
      },
      {
        role: "Tech Lead",
        exp: "5-8 Yrs",
        salary: "₹35L-60LPA",
        focus: "Team leadership, architecture decisions, mentoring",
      },
      {
        role: "Staff/Principal Engineer",
        exp: "8-12 Yrs",
        salary: "₹60L-1.2Cr",
        focus: "Cross-team technical startegy, solving critical scale issues",
      },
      {
        role: "CTO / VP Engineering",
        exp: "12+ Yrs",
        salary: "₹1Cr+",
        focus:
          "Company tech vision, organizational structure, business alignment",
      },
    ],
    // NEW: Tool Stack
    tools: [
      {
        category: "Frontend",
        items: ["React", "Next.js", "TailwindCSS", "Redux", "TypeScript"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "NestJS", "Django", "Go"],
      },
      {
        category: "Database",
        items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      },
      {
        category: "DevOps",
        items: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform"],
      },
    ],
    // NEW: Certifications
    certifications: [
      {
        name: "AWS Certified Developer",
        provider: "Amazon Web Services",
        value: "High",
      },
      {
        name: "Meta Frontend Developer",
        provider: "Coursera",
        value: "Medium",
      },
      {
        name: "MongoDB Certified Developer",
        provider: "MongoDB University",
        value: "Medium",
      },
    ],
    // NEW: Day in the Life
    dayInLife: [
      {
        time: "10:00 AM",
        activity: "Stand-up Meeting",
        desc: "Sync with team, discuss blockers for the day.",
      },
      {
        time: "10:30 AM",
        activity: "Code Review",
        desc: "Review PRs from peers, check for bugs and quality.",
      },
      {
        time: "11:30 AM",
        activity: "Deep Work (Feature)",
        desc: "Building the new Payment Gateway integration API.",
      },
      {
        time: "01:30 PM",
        activity: "Lunch Break",
        desc: "Team lunch and casual chit-chat (or FIFA).",
      },
      {
        time: "02:30 PM",
        activity: "System Design Discussion",
        desc: "Whiteboarding session for upcoming microservices capability.",
      },
      {
        time: "04:00 PM",
        activity: "Bug Fixing",
        desc: "Squashing high-priority bugs reported by QA.",
      },
      {
        time: "06:00 PM",
        activity: "Learning / Research",
        desc: "Reading up on Next.js 14 server actions.",
      },
    ],
    // NEW: Market Trends (Simulated)
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [8, 10, 14, 13.5, 14.5], // in Lakhs
      demand: [60, 85, 95, 80, 88], // Index out of 100
    },
    roadmap: [
      {
        step: 1,
        title: "Master the Fundamentals",
        duration: "1-2 Months",
        description:
          "Learn HTML5, CSS3, and JavaScript (ES6+). These are the building blocks of the web.",
        resources: ["MDN Web Docs", "FreeCodeCamp - Responsive Design"],
      },
      {
        step: 2,
        title: "Frontend Frameworks",
        duration: "2-3 Months",
        description:
          "Deep dive into React.js. Learn Hooks, Context API, and state management (Redux/Zustand).",
        resources: ["React Official Docs", "Namaste React (YouTube)"],
      },
      {
        step: 3,
        title: "Backend Development",
        duration: "2 Months",
        description:
          "Learn Node.js and Express. Understand REST APIs, authentication (JWT), and middleware.",
        resources: ["Node.js Crash Course", "Express Docs"],
      },
      {
        step: 4,
        title: "Databases",
        duration: "1 Month",
        description:
          "Master MongoDB (NoSQL) and PostgreSQL (SQL). Learn ORMs like Mongoose or Prisma.",
        resources: ["MongoDB University", "SQLBolt"],
      },
      {
        step: 5,
        title: "System Design & DevOps",
        duration: "Ongoing",
        description:
          "Learn basic deployment (Vercel, AWS EC2), Docker, and CI/CD pipelines.",
        resources: ["Hussein Nasser (YouTube)", "AWS Fundamentals"],
      },
    ],
  },
  {
    id: 2,
    title: "Data Scientist",
    field: "Data Science",
    icon: "📊",
    salary: "₹10L - ₹35LPA",
    growth: "Very High",
    description:
      "Analyze complex datasets to help businesses make data-driven decisions.",
    longDescription:
      "Data Scientists are the modern-day wizards who turn raw data into actionable insights. Using statistics, machine learning, and programming, they solve complex business problems. In India, e-commerce giants and fintech unicorns are aggressively hiring for this role.",
    companies: ["Fractal", "MuSigma", "Flipkart", "Amazon", "Jio"],
    demand_level: "Very High",
    stats: {
      openings: 8300,
      avg_salary: "18L",
      top_location: "Bangalore",
      remote_friendly: "80%",
    },
    skills: [
      { name: "Python", level: 95 },
      { name: "Machine Learning", level: 90 },
      { name: "SQL", level: 85 },
      { name: "Statistics", level: 85 },
      { name: "Data Viz", level: 80 },
    ],
    trajectory: [
      {
        role: "Data Analyst",
        exp: "0-2 Yrs",
        salary: "₹6L-10L",
        focus: "Cleaning data, basic visualization, reporting",
      },
      {
        role: "Data Scientist",
        exp: "2-5 Yrs",
        salary: "₹12L-25L",
        focus: "Building models, predictive analytics, specialized algorithms",
      },
      {
        role: "Senior Data Scientist",
        exp: "5-8 Yrs",
        salary: "₹25L-45L",
        focus: "Model deployment, optimization, mentoring juniors",
      },
      {
        role: "Lead Data Scientist",
        exp: "8-12 Yrs",
        salary: "₹45L-80L",
        focus: "Research leadership, setting data strategy",
      },
      {
        role: "Chief Data Officer",
        exp: "12+ Yrs",
        salary: "₹80L+",
        focus: "Enterprise data governance, AI strategy",
      },
    ],
    tools: [
      { category: "Languages", items: ["Python", "R", "SQL", "Scala"] },
      {
        category: "ML Libs",
        items: ["Scikit-learn", "TensorFlow", "PyTorch", "XGBoost"],
      },
      { category: "Big Data", items: ["Spark", "Hadoop", "Airflow", "Kafka"] },
      {
        category: "Viz",
        items: ["Tableau", "PowerBI", "Matplotlib", "Seaborn"],
      },
    ],
    certifications: [
      { name: "Google Data Analytics", provider: "Google", value: "High" },
      {
        name: "Azure Data Scientist Assoc",
        provider: "Microsoft",
        value: "High",
      },
      { name: "TensorFlow Developer", provider: "Google", value: "Medium" },
    ],
    dayInLife: [
      {
        time: "10:00 AM",
        activity: "Stand-up",
        desc: "Update on model training progress and data blockers.",
      },
      {
        time: "10:30 AM",
        activity: "Data Cleaning",
        desc: "Wrangling messy CSVs from the marketing team for analysis.",
      },
      {
        time: "12:00 PM",
        activity: "Model Experiments",
        desc: "Running multiple training jobs with hyperparameter tuning.",
      },
      { time: "01:30 PM", activity: "Lunch", desc: "Break." },
      {
        time: "02:30 PM",
        activity: "Stakeholder Meeting",
        desc: "Explaining model predictions to the Sales VP (in plain English).",
      },
      {
        time: "04:30 PM",
        activity: "Productionizing",
        desc: "Wrapping the model in a Flask API for the backend team.",
      },
      {
        time: "06:00 PM",
        activity: "Paper Reading",
        desc: "Reading the latest arXiv paper on Transformers.",
      },
    ],
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [10, 12, 16, 17, 18],
      demand: [70, 90, 98, 92, 95],
    },
    roadmap: [
      {
        step: 1,
        title: "Python & Statistics",
        duration: "2 Months",
        description:
          "Master Python programming and core statistical concepts (Probability, Distributions).",
        resources: ["Kaggle Python Course", "Khan Academy Statistics"],
      },
      {
        step: 2,
        title: "Data Analysis Libraries",
        duration: "1.5 Months",
        description:
          "Learn Pandas, NumPy, and Matplotlib for data manipulation and visualization.",
        resources: ["Pandas Docs", "Krish Naik (YouTube)"],
      },
      {
        step: 3,
        title: "Machine Learning Basics",
        duration: "3 Months",
        description:
          "Understand Supervised (Regression, Classification) and Unsupervised Learning algorithms.",
        resources: ["Andrew Ng's ML Course", "Scikit-Learn Docs"],
      },
      {
        step: 4,
        title: "Deep Learning & NLP",
        duration: "3 Months",
        description:
          "Dive into Neural Networks, TensorFlow/PyTorch, and Natural Language Processing.",
        resources: ["Fast.ai", "DeepLearning.ai"],
      },
      {
        step: 5,
        title: "Deployment & MLOps",
        duration: "Ongoing",
        description:
          "Learn to deploy models using Flask/FastAPI and understand MLOps pipelines.",
        resources: ["AWS Sagemaker", "MLFlow"],
      },
    ],
  },
  {
    id: 3,
    title: "Product Manager",
    field: "Management",
    icon: "🚀",
    salary: "₹15L - ₹45LPA",
    growth: "Stable",
    description:
      "Lead product vision and strategy, bridging the gap between tech and business.",
    longDescription:
      "Product Managers (PMs) are the CEOs of their products. They define the 'why' and 'what' of a product, working closely with engineering and design teams. It's a high-impact role requiring a blend of business acumen, tech understanding, and user empathy.",
    companies: ["Cred", "Paytm", "Uber India", "Ola", "Razorpay"],
    demand_level: "High",
    stats: {
      openings: 4500,
      avg_salary: "22L",
      top_location: "Bangalore",
      remote_friendly: "70%",
    },
    skills: [
      { name: "Product Strategy", level: 90 },
      { name: "User Research", level: 85 },
      { name: "Agile/Scrum", level: 80 },
      { name: "Data Analytics", level: 75 },
      { name: "Communication", level: 95 },
    ],
    // DEFAULT PLACEHOLDERS FOR OTHERS TO AVOID CRASHES IF DATA MISSING
    trajectory: [
      {
        role: "Associate PM",
        exp: "0-2 Yrs",
        salary: "₹8L-15L",
        focus: "Execution, data gathering, minor features",
      },
      {
        role: "Product Manager",
        exp: "2-5 Yrs",
        salary: "₹18L-30L",
        focus: "Feature roadmap, metrics, stakeholder management",
      },
      {
        role: "Senior PM",
        exp: "5-8 Yrs",
        salary: "₹30L-55L",
        focus: "Product strategy, managing junior PMs, P&L ownership",
      },
      {
        role: "Director of Product",
        exp: "8-12 Yrs",
        salary: "₹60L-1.2Cr",
        focus: "Org-wide product vision, hiring, M&A strategy",
      },
    ],
    tools: [
      { category: "Management", items: ["Jira", "Linear", "Notion", "Asana"] },
      { category: "Design", items: ["Figma", "Balsamiq", "Miro"] },
      {
        category: "Analytics",
        items: ["Mixpanel", "Amplitude", "Google Analytics", "Looker"],
      },
    ],
    certifications: [
      { name: "Certified Scrum PO", provider: "Scrum Alliance", value: "High" },
      { name: "Product Analytics", provider: "Pendo", value: "Medium" },
    ],
    dayInLife: [
      {
        time: "09:30 AM",
        activity: "Metrics Check",
        desc: "Review daily active users (DAU) and retention charts.",
      },
      {
        time: "10:00 AM",
        activity: "Stand-up",
        desc: "Unblock engineering team.",
      },
      {
        time: "11:00 AM",
        activity: "User Interviews",
        desc: "Call 3 customers to understand why they churned.",
      },
      {
        time: "02:00 PM",
        activity: "Roadmap Grooming",
        desc: "Prioritizing tasks for the next sprint.",
      },
      {
        time: "04:00 PM",
        activity: "Design Review",
        desc: "Critiquing new UI mocks with the design team.",
      },
    ],
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [15, 18, 25, 23, 24],
      demand: [60, 80, 85, 75, 80],
    },
    roadmap: [
      {
        step: 1,
        title: "Understand the Role",
        duration: "2 Weeks",
        description: "Learn what a PM does. Read 'Inspired' by Marty Cagan.",
        resources: ["Inspired (Book)", "Lenny's Newsletter"],
      },
      {
        step: 2,
        title: "Agile & Scrum",
        duration: "1 Month",
        description:
          "Master Agile methodologies, user stories, and backlog management.",
        resources: ["Atlassian Agile Guide", "Scrum Guide"],
      },
      {
        step: 3,
        title: "User Research & Design",
        duration: "1.5 Months",
        description:
          "Learn to conduct user interviews and wireframing (Figma basics).",
        resources: ["Nielsen Norman Group", "Figma 101"],
      },
      {
        step: 4,
        title: "Data & Metrics",
        duration: "2 Months",
        description:
          "Understand Product Metrics (AARRR), SQL for analytics, and A/B testing.",
        resources: ["Mixpanel Guide", "SQL for PMs"],
      },
      {
        step: 5,
        title: "Build a Portfolio",
        duration: "Ongoing",
        description:
          "Work on a side project or case study. Document your process.",
        resources: ["Product School", "PM Exercises"],
      },
    ],
  },
  {
    id: 4,
    title: "Digital Marketer",
    field: "Marketing",
    icon: "📢",
    salary: "₹5L - ₹18LPA",
    growth: "Rising",
    description:
      "Drive brand awareness and lead generation through digital channels.",
    longDescription:
      "Digital Marketers are the voice of a brand online. They utilize SEO, social media, email, and content to reach potential customers. With the digitization of Indian businesses, this role is exploding in demand.",
    companies: ["Nykaa", "Myntra", "Ogilvy", "Zomato", "Flipkart"],
    demand_level: "Moderate",
    stats: {
      openings: 15000,
      avg_salary: "8L",
      top_location: "Mumbai/Delhi",
      remote_friendly: "90%",
    },
    skills: [
      { name: "SEO/SEM", level: 90 },
      { name: "Content Strategy", level: 85 },
      { name: "Google Analytics", level: 80 },
      { name: "Social Media", level: 95 },
      { name: "Copywriting", level: 85 },
    ],
    trajectory: [
      {
        role: "Marketing Intern/Exec",
        exp: "0-1 Yrs",
        salary: "₹3L-5L",
        focus: "Posting content, basic analysis",
      },
      {
        role: "Digital Marketing Specialist",
        exp: "1-3 Yrs",
        salary: "₹5L-8L",
        focus: "Running campaigns, SEO optimization",
      },
      {
        role: "Marketing Manager",
        exp: "3-6 Yrs",
        salary: "₹8L-15L",
        focus: "Strategy, budget mgmt, team lead",
      },
      {
        role: "CMO",
        exp: "10+ Yrs",
        salary: "₹30L+",
        focus: "Brand vision, company growth",
      },
    ],
    tools: [
      {
        category: "Ad Platforms",
        items: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads"],
      },
      {
        category: "SEO",
        items: ["Ahrefs", "SEMrush", "Google Search Console"],
      },
      { category: "Content", items: ["Canva", "WordPress", "HubSpot"] },
    ],
    certifications: [
      { name: "Google Ads Certification", provider: "Google", value: "High" },
      { name: "HubSpot Inbound", provider: "HubSpot", value: "Medium" },
    ],
    dayInLife: [
      {
        time: "10:00 AM",
        activity: "Campaign Check",
        desc: "Review ad spend and ROAS across platforms.",
      },
      {
        time: "12:00 PM",
        activity: "Content Cal",
        desc: "Planning social posts for next week.",
      },
      {
        time: "03:00 PM",
        activity: "SEO Audit",
        desc: "Checking site health and keyword rankings.",
      },
    ],
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [5, 6, 7, 7.5, 8],
      demand: [70, 75, 80, 85, 90],
    },
    roadmap: [
      {
        step: 1,
        title: "Marketing Fundamentals",
        duration: "1 Month",
        description: "Understand the 4Ps of marketing and consumer psychology.",
        resources: ["HubSpot Academy", "Kotler on Marketing"],
      },
      {
        step: 2,
        title: "SEO & Content",
        duration: "2 Months",
        description:
          "Learn On-page & Off-page SEO, Keyword research, and Content marketing.",
        resources: ["Moz Beginner Guide", "Ahrefs Blog"],
      },
      {
        step: 3,
        title: "Social Media & Ads",
        duration: "2 Months",
        description:
          "Master Facebook/Instagram Ads, LinkedIn marketing, and community building.",
        resources: ["Meta Blueprint", "GaryVee"],
      },
      {
        step: 4,
        title: "Analytics & ROI",
        duration: "1.5 Months",
        description:
          "Learn Google Analytics 4, tracking conversions, and calculating ROI.",
        resources: ["Google Analytics Academy", "MeasureSchool"],
      },
    ],
  },
  {
    id: 5,
    title: "Chartered Accountant",
    field: "Finance",
    icon: "📉",
    salary: "₹7L - ₹25LPA",
    growth: "Steady",
    description:
      "Expert in auditing, taxation, and financial advisory for corporations.",
    longDescription:
      "Chartered Accountants (CAs) are the backbone of financial trust in India. They handle everything from auditing and taxation to financial advising. It is one of the most respected and challenging professions in the country.",
    companies: ["Deloitte", "KPMG", "ICICI Bank", "HDFC", "EY"],
    demand_level: "High",
    stats: {
      openings: 5000,
      avg_salary: "12L",
      top_location: "Mumbai",
      remote_friendly: "20%",
    },
    skills: [
      { name: "Accounting", level: 95 },
      { name: "Taxation (GST)", level: 90 },
      { name: "Auditing", level: 90 },
      { name: "Financial Law", level: 85 },
      { name: "Excel", level: 85 },
    ],
    trajectory: [
      {
        role: "Article Assistant",
        exp: "0-3 Yrs",
        salary: "₹5k-15k/mo",
        focus: "Learning, auditing under supervision",
      },
      {
        role: "Fresher CA",
        exp: "0 Yrs",
        salary: "₹7L-11L",
        focus: "Audit execution, tax filing",
      },
      {
        role: "Senior Consultant",
        exp: "3-6 Yrs",
        salary: "₹15L-25L",
        focus: "Client management, advisory",
      },
      {
        role: "Partner",
        exp: "10+ Yrs",
        salary: "₹50L+",
        focus: "Bringing business, signing audits",
      },
    ],
    tools: [
      { category: "Tax", items: ["Tally Prime", "ClearTax", "Genius"] },
      { category: "Audit", items: ["Excel (Advanced)", "SAP"] },
    ],
    certifications: [
      { name: "ACCA", provider: "Global", value: "High" },
      { name: "CFA", provider: "CFA Institute", value: "High (Finance)" },
    ],
    dayInLife: [
      {
        time: "09:30 AM",
        activity: "Client Visit",
        desc: "Traveling to client office for statutory audit.",
      },
      {
        time: "01:00 PM",
        activity: "Vouching",
        desc: "Verifying bills and invoices against ledger entries.",
      },
      {
        time: "05:00 PM",
        activity: "Review",
        desc: "Discussing audit findings with the Partner.",
      },
    ],
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [8, 9, 10, 11, 12],
      demand: [80, 80, 80, 80, 80],
    },
    roadmap: [
      {
        step: 1,
        title: "CA Foundation",
        duration: "6-9 Months",
        description:
          "Clear the entry-level exam covering accounting, law, and economics.",
        resources: ["ICAI Study Material", "Unacademy"],
      },
      {
        step: 2,
        title: "CA Intermediate",
        duration: "9 Months",
        description:
          "Pass 8 subjects grouped in two groups. Covers advanced accounting and tax.",
        resources: ["ICAI BOS", "Swapnil Patni Classes"],
      },
      {
        step: 3,
        title: "Articleship",
        duration: "3 Years",
        description:
          "Mandatory practical training under a practicing CA. Real-world experience.",
        resources: ["Big 4 Firms", "Mid-size CA Firms"],
      },
      {
        step: 4,
        title: "CA Final",
        duration: "6-12 Months",
        description:
          "The final hurdle. Advanced financial reporting, strategic management, and ethics.",
        resources: ["ICAI Final Material", "Self-study"],
      },
    ],
  },
  {
    id: 6,
    title: "UI/UX Designer",
    field: "Design",
    icon: "🎨",
    salary: "₹6L - ₹20LPA",
    growth: "High",
    description:
      "Create intuitive and visually appealing user interfaces for apps and webs.",
    longDescription:
      "UI/UX Designers define how a product feels and looks. They ensure that the user's journey is smooth, intuitive, and enjoyable. With the user-centric approach of modern apps, this role is critical.",
    companies: ["Google", "Microsoft", "Adobe", "Swiggy", "Cred"],
    demand_level: "High",
    stats: {
      openings: 6000,
      avg_salary: "10L",
      top_location: "Bangalore",
      remote_friendly: "90%",
    },
    skills: [
      { name: "Figma", level: 95 },
      { name: "User Research", level: 85 },
      { name: "Prototyping", level: 90 },
      { name: "Visual Design", level: 85 },
      { name: "Interaction Design", level: 80 },
    ],
    trajectory: [
      {
        role: "Junior Designer",
        exp: "0-2 Yrs",
        salary: "₹4L-8L",
        focus: "UI cleanup, converting wireframes to high-fidelity",
      },
      {
        role: "Product Designer",
        exp: "2-5 Yrs",
        salary: "₹10L-20L",
        focus: "End-to-end features, UX research",
      },
      {
        role: "Senor Product Designer",
        exp: "5-8 Yrs",
        salary: "₹25L-40L",
        focus: "Design systems, mentoring",
      },
      {
        role: "VP of Design",
        exp: "10+ Yrs",
        salary: "₹50L+",
        focus: "Design vision, brand identity",
      },
    ],
    tools: [
      { category: "Design", items: ["Figma", "Adobe XD", "Sketch"] },
      { category: "Prototyping", items: ["Protopie", "Framer", "Principle"] },
      { category: "Research", items: ["Maze", "Hotjar", "Typeform"] },
    ],
    certifications: [
      { name: "Google UX Design", provider: "Coursera", value: "High" },
      {
        name: "Interaction Design Foundation",
        provider: "IxDF",
        value: "High",
      },
    ],
    dayInLife: [
      {
        time: "10:00 AM",
        activity: "Critique",
        desc: "Design critique session with the team.",
      },
      {
        time: "11:30 AM",
        activity: "Deep Work",
        desc: "Designing flows for the new mobile checkout.",
      },
      {
        time: "03:00 PM",
        activity: "Handoff",
        desc: "Walking developers through the Figma file specs.",
      },
    ],
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [7, 8, 12, 11, 12],
      demand: [60, 85, 90, 85, 88],
    },
    roadmap: [
      {
        step: 1,
        title: "Design Principles",
        duration: "1 Month",
        description:
          "Learn Typography, Color Theory, Layouts, and Composition.",
        resources: ["Google Material Design", "Refactoring UI"],
      },
      {
        step: 2,
        title: "Learn Figma",
        duration: "1 Month",
        description: "Master the industry-standard tool for interface design.",
        resources: ["Figma Official Channel", "Udemy"],
      },
      {
        step: 3,
        title: "UX Research",
        duration: "2 Months",
        description:
          "Understand user personas, user journeys, and usability testing.",
        resources: ["Nielsen Norman", "UX Planet"],
      },
      {
        step: 4,
        title: "Build a Portfolio",
        duration: "Ongoing",
        description:
          "Redesign existing apps or creating new concepts. Showcase on Behance.",
        resources: ["Behance", "Dribbble"],
      },
    ],
  },
  {
    id: 7,
    title: "Civil Engineer",
    field: "Engineering",
    icon: "🏗️",
    salary: "₹4L - ₹12LPA",
    growth: "Stable",
    description:
      "Plan, design, and oversee construction and infrastructure projects.",
    longDescription:
      "Civil Engineers build the world around us. From skyscrapers and bridges to roads and dams, they design and manage construction projects. In India, infrastructure growth keeps this profession relevant.",
    companies: ["L&T", "Tata Projects", "DLF", "GMR", "Afcons"],
    demand_level: "Moderate",
    stats: {
      openings: 3000,
      avg_salary: "6L",
      top_location: "Pan India",
      remote_friendly: "0%",
    },
    skills: [
      { name: "AutoCAD", level: 90 },
      { name: "Structural Analysis", level: 85 },
      { name: "Project Management", level: 80 },
      { name: "STAAD Pro", level: 75 },
      { name: "Site Supervision", level: 90 },
    ],
    trajectory: [
      {
        role: "Site Engineer",
        exp: "0-2 Yrs",
        salary: "₹3L-5L",
        focus: "Supervision, measurements, execution",
      },
      {
        role: "Senior Engineer",
        exp: "2-5 Yrs",
        salary: "₹6L-10L",
        focus: "Planning, billing, quality checking",
      },
      {
        role: "Project Manager",
        exp: "5-10 Yrs",
        salary: "₹12L-20L",
        focus: "Resource mgmt, timelines, client handling",
      },
      {
        role: "Project Director",
        exp: "15+ Yrs",
        salary: "₹30L+",
        focus: "Multiple large-scale projects",
      },
    ],
    tools: [
      { category: "Design", items: ["AutoCAD", "Revit", "3ds Max"] },
      { category: "Analysis", items: ["STAAD Pro", "ETABS", "SAP2000"] },
      { category: "Mgmt", items: ["MS Project", "Primavera"] },
    ],
    certifications: [
      { name: "PMP", provider: "PMI", value: "High" },
      {
        name: "Certified Revit Professional",
        provider: "Autodesk",
        value: "Medium",
      },
    ],
    dayInLife: [
      {
        time: "08:30 AM",
        activity: "Site Inspection",
        desc: "Checking reinforcement steel before concreting.",
      },
      {
        time: "11:00 AM",
        activity: "Drawings",
        desc: "Reviewing architectural drawings for potential clashes.",
      },
      {
        time: "04:00 PM",
        activity: "DPR",
        desc: "Preparing Daily Progress Report for the HO.",
      },
    ],
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [4, 4.5, 5, 5.5, 6],
      demand: [50, 40, 55, 60, 60],
    },
    roadmap: [
      {
        step: 1,
        title: "B.Tech in Civil",
        duration: "4 Years",
        description:
          "Complete your undergraduate degree. Focus on Strength of Materials and Geology.",
        resources: ["IIT", "NIT"],
      },
      {
        step: 2,
        title: "Software Skills",
        duration: "6 Months",
        description:
          "Learn AutoCAD, Revit, and STAAD Pro for design and analysis.",
        resources: ["Autodesk Certified", "Udemy"],
      },
      {
        step: 3,
        title: "Internships",
        duration: "During Degree",
        description:
          "Get on-site experience. Understand blueprint reading and site safety.",
        resources: ["Internshala", "Local Firms"],
      },
      {
        step: 4,
        title: "Specialization (M.Tech)",
        duration: "2 Years (Optional)",
        description:
          "Specialize in Structural Engineering, Geotech, or Transportation.",
        resources: ["GATE Exam", "NPTEL"],
      },
    ],
  },
  {
    id: 8,
    title: "Medical Professional",
    field: "Healthcare",
    icon: "🩺",
    salary: "₹10L - ₹50LPA",
    growth: "Evergreen",
    description:
      "Diagnose and treat patients, contributing to public health and wellness.",
    longDescription:
      "Doctors and medical professionals are dedicated to saving lives. The path is long and arduous but deeply rewarding. It requires a lifelong commitment to learning and serving.",
    companies: ["Apollo", "Fortis", "AIIMS", "Max Healthcare", "Medanta"],
    demand_level: "Very High",
    stats: {
      openings: 20000,
      avg_salary: "15L",
      top_location: "Pan India",
      remote_friendly: "5%",
    },
    skills: [
      { name: "Diagnosis", level: 95 },
      { name: "Patient Care", level: 95 },
      { name: "Surgery/Medicine", level: 90 },
      { name: "Empathy", level: 95 },
      { name: "Research", level: 80 },
    ],
    trajectory: [
      {
        role: "Intern Doctor",
        exp: "5.5 Yrs",
        salary: "₹20k-40k/mo",
        focus: "Rotations in all departments",
      },
      {
        role: "Junior Resident",
        exp: "0-3 Yrs PG",
        salary: "₹50k-90k/mo",
        focus: "Ward duty, emergency care",
      },
      {
        role: "Senior Resident",
        exp: "3-6 Yrs",
        salary: "₹1L-1.5L/mo",
        focus: "Specialist care, teaching juniors",
      },
      {
        role: "Consultant",
        exp: "8+ Yrs",
        salary: "₹20L-50L/yr",
        focus: "Independent practice, surgeries",
      },
    ],
    tools: [
      {
        category: "Clinical",
        items: ["Stethoscope", "Ultrasound", "BP Apparatus"],
      },
      { category: "Software", items: ["EMR Systems", "Telemedicine Apps"] },
    ],
    certifications: [
      { name: "BLS/ACLS", provider: "AHA", value: "Mandatory" },
      { name: "Fellowship (FNB)", provider: "NBE", value: "High" },
    ],
    dayInLife: [
      {
        time: "08:00 AM",
        activity: "Rounds",
        desc: "Checking on admitted patients with the unit head.",
      },
      {
        time: "10:30 AM",
        activity: "OPD",
        desc: "Consulting outpatients (40-50 patients).",
      },
      {
        time: "02:00 PM",
        activity: "OT",
        desc: "Assisting or performing scheduled surgeries.",
      },
    ],
    marketTrends: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      salary: [12, 13, 13, 14, 15],
      demand: [100, 100, 100, 100, 100],
    },
    roadmap: [
      {
        step: 1,
        title: "NEET UG",
        duration: "2 Years Prep",
        description:
          "Crack the national entrance exam to get into a medical college.",
        resources: ["NCERT", "Physics Wallah"],
      },
      {
        step: 2,
        title: "MBBS",
        duration: "5.5 Years",
        description:
          "Complete Bachelor of Medicine, Bachelor of Surgery + 1 Year Internship.",
        resources: ["Medical College", "Clinical Rotations"],
      },
      {
        step: 3,
        title: "NEET PG",
        duration: "1 Year Prep",
        description:
          "Entrance for specialization (MD/MS). Extremely competitive.",
        resources: ["Marrow", "PrepLadder"],
      },
      {
        step: 4,
        title: "Residency (MD/MS)",
        duration: "3 Years",
        description:
          "Specialization training in hospital. High workload, deep learning.",
        resources: ["Teaching Hospitals"],
      },
    ],
  },
];

# Script to update CSS imports
# Run this in PowerShell from the client directory

# Update component imports
(Get-Content src\components\Navbar.jsx) -replace "import './Navbar.css';", "import '../styles/components/Navbar.css';" | Set-Content src\components\Navbar.jsx
(Get-Content src\components\Footer.jsx) -replace "import './Footer.css';", "import '../styles/components/Footer.css';" | Set-Content src\components\Footer.jsx

# Update page imports
(Get-Content src\pages\Home.jsx) -replace "import './Home.css';", "import '../styles/pages/Home.css';" | Set-Content src\pages\Home.jsx
(Get-Content src\pages\Login.jsx) -replace "import './Login.css';", "import '../styles/pages/Login.css';" | Set-Content src\pages\Login.jsx
(Get-Content src\pages\Register.jsx) -replace "import './Register.css';", "import '../styles/pages/Register.css';" | Set-Content src\pages\Register.jsx
(Get-Content src\pages\About.jsx) -replace "import './About.css';", "import '../styles/pages/About.css';" | Set-Content src\pages\About.jsx
(Get-Content src\pages\Dashboard.jsx) -replace "import './Dashboard.css';", "import '../styles/pages/Dashboard.css';" | Set-Content src\pages\Dashboard.jsx
(Get-Content src\pages\ExploreCareers.jsx) -replace "import './ExploreCareers.css';", "import '../styles/pages/ExploreCareers.css';" | Set-Content src\pages\ExploreCareers.jsx

# Update Common.css imports
(Get-Content src\pages\ProfileSetup.jsx) -replace "import './Common.css';", "import '../styles/pages/Common.css';" | Set-Content src\pages\ProfileSetup.jsx
(Get-Content src\pages\AssessmentTest.jsx) -replace "import './Common.css';", "import '../styles/pages/Common.css';" | Set-Content src\pages\AssessmentTest.jsx
(Get-Content src\pages\CareerDetail.jsx) -replace "import './Common.css';", "import '../styles/pages/Common.css';" | Set-Content src\pages\CareerDetail.jsx
(Get-Content src\pages\Courses.jsx) -replace "import './Common.css';", "import '../styles/pages/Common.css';" | Set-Content src\pages\Courses.jsx
(Get-Content src\pages\Counselling.jsx) -replace "import './Common.css';", "import '../styles/pages/Common.css';" | Set-Content src\pages\Counselling.jsx
(Get-Content src\pages\Pricing.jsx) -replace "import './Common.css';", "import '../styles/pages/Common.css';" | Set-Content src\pages\Pricing.jsx
(Get-Content src\pages\FAQ.jsx) -replace "import './Common.css';", "import '../styles/pages/Common.css';" | Set-Content src\pages\FAQ.jsx

Write-Host "All CSS imports updated successfully!" -ForegroundColor Green

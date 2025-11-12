##  🏋️‍♀️ EliteFit ###

EliteFit is a modern fitness club web platform designed to motivate users to become the strongest version of themselves. It provides an interactive experience where users can explore programs, check schedules, view plans, meet coaches, and track their rankings — all in one elegant and responsive website.

 ## 👩‍💻 Team Information

**Team Name:** Code Queens

**Group:** SE-2414

## 👥 Members & Roles

- Salemkan Aknur – Styled pages: Home, About Us

- Evelina Penkova – Styled pages: Team, Plans

- Kazhymukhamet Birkhanym – Styled pages: Ranking, Login, Signup

- Khairgeldinova Meruert – Styled pages: Schedule, Programs

## 💡 Project Overview

**Topic:** ***Fitness Club Website – EliteFit***

EliteFit is an interactive web application for a modern fitness center that combines design, technology, and functionality. It provides users with information about training programs, gym facilities, coaches, and membership options.

### Key Features

**🏠 Home Page:** Inspiring hero section, membership plans, and testimonials.

**🏋️‍♂️ About Page:** Overview of gym features, offered programs, and gallery.

**🧘 Programs** Page: Program filtering, workout rating, and personalized greeting.

**🕒 Schedule Page:** Weekly class schedule with a booking form.

**👩‍🏫 Team Page:** Trainer profiles and team introduction with interactive visuals.

**💰 Plans Page:** Membership offers and gym equipment showcase.

**🏆 Ranking Page:** Displays user rankings and progress leaderboard.

**🌗 Dark/Light Mode Toggle and Play Sound interactivity.**

## ⚡ API Integration – Exercises Section
### 🔍 What API is used?
We used the **[API Ninjas – Exercises API](https://api-ninjas.com/api/exercises)**.  
This API provides real workout data, including:
- Exercise name  
- Muscle group  
- Equipment used  
- Type and difficulty  
- Step-by-step instructions  
### 🧠 Why this API?
The Exercises API allows users to **instantly load training plans** for different muscle groups, giving real examples of workouts they can do in the gym.  
It makes the **Programs page interactive and personalized**.
### 🛠️ How it was implemented
#### 1. API Key Setup
We registered on [api-ninjas.com](https://api-ninjas.com) and generated a free API key.  
Then the key was added into the JavaScript file:
const API_KEY = "4R2xYsWrwe6DCJQeGUee5A==xw5HAxqOHObkcnCH";
### Fetch Request
When the user selects a muscle group (for example, *biceps* or *legs*),  
the system sends a request to the API endpoint:
https://api.api-ninjas.com/v1/exercises?muscle=biceps
with headers:
headers: { "X-Api-Key": API_KEY }
### JavaScript Function
The core logic is written in meru.js
### User Interface
In programs.html, the user selects the muscle group
On button click, the JavaScript dynamically displays cards with exercise data fetched from the API.
### 🌐 Example Result
When you click "Load Exercises" →
You instantly get a list of exercises like:
💪 Bicep Curl — Type: Strength
Equipment: Dumbbells
Difficulty: Beginner
“Hold the dumbbells and curl towards your shoulders…”

## 🔌 External APIs and Technologies Used

Font Awesome – for icons.

Google Fonts – for modern typography.

JavaScript DOM API – for interactivity (forms, filters, dark/light mode).

CSS Flexbox & Grid – for responsive and adaptive design.

LocalStorage API – for saving user preferences (e.g., dark/light mode, form data).

## 🌍 Project URLs

***Project URL:*** 127.0.0.1:5501/index.html

***Deployed URL:*** https://courageous-manatee-93f835.netlify.app

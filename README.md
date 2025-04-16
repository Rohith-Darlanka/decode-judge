 Decode - Full-Stack Online Judge Platform

A competitive coding platform built  using Next.js, MySQL, and Judge0 API — inspired by Codeforces and LeetCode. Solve problems, get instant feedback, and track your progress.
---
 Features

 Problem page with code editor and real-time submission
 Dynamic test cases from database
 Submissions with runtime, memory, and correctness
 User authentication (JWT + NextAuth)
 Dark mode toggle with smooth animations
 
 Tech Stack
| Frontend         | Backend             | Database | Auth        | Judge Engine |
|------------------|---------------------|----------|-------------|----------------|
| Next.js (App Router) | Next.js API Routes | MySQL    | NextAuth.js | Judge0 API     |
| Tailwind CSS     | TypeScript          | mysql2   | JWT         |                |

---

Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Rohith-Darlanka/decode-judge.git
cd decode-judge

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in DB credentials and Judge0 API key

# Run development server
npm run dev

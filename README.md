---

````markdown
<div align="center">

<br />

<img width="80" src="https://raw.githubusercontent.com/PRATYUSH2444/studyhive-2/main/studyhive-2/public/favicon.svg" />

<h1>StudyHive 2.0</h1>

<p><strong>The AI Academic Operating System for Indian Competitive Exams</strong></p>

<p><em>Not a study app. A war room.</em></p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-Real--time-010101?style=flat-square&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Active_Development-22C55E?style=flat-square" />
  <img src="https://img.shields.io/badge/License-Private-EF4444?style=flat-square" />
</p>

<p>
  <strong>JEE &nbsp;·&nbsp; NEET &nbsp;·&nbsp; UPSC &nbsp;·&nbsp; CAT &nbsp;·&nbsp; GATE &nbsp;·&nbsp; CLAT</strong>
</p>

</div>

---

## The Problem

Most ed-tech is passive. Watch video. Take test. Repeat. **Dead.**

10 million+ students prepare for JEE, NEET, UPSC every year. 90% fail not because they're not smart — but because they study the wrong things, at the wrong time, in the wrong way. Coaching institutes charge ₹2-5 lakh and still can't tell you *why* your brain makes the same mistake in integration under time pressure.

**StudyHive 2.0 fixes this.**

---

## What is StudyHive?

StudyHive is a **full-stack AI academic operating system** powered by **ARIA** (Adaptive Reasoning & Intelligence Architecture) — built on Google Gemini 2.5 Flash.

ARIA builds a cognitive model of each student over time:

```
Student answers questions
         ↓
ARIA records: concept, difficulty, time spent, correct/wrong
         ↓
Updates: Knowledge Graph · Error DNA · Forgetting Curve · XP
         ↓
Dashboard shows: real accuracy · real weak topics · real predictions
         ↓
ARIA personalizes: every question · every explanation · every plan
```

This is **Notion + Discord + Khan Academy + ChatGPT + Duolingo** — built specifically and obsessively for the Indian competitive exam ecosystem.

---

## Core Features

### ARIA — Adaptive AI Coach
- Powered by **Gemini 2.5 Flash** — real AI responses, not scripts
- **Knowledge Graph** — live map of every concept, colored by mastery
- **Error DNA** — names and patterns your specific recurring mistakes
- **Peak Performance Window** — identifies your best 2-3 hour study window
- **Forgetting Curve** — SM-2 spaced repetition, recalibrated to YOUR rate
- **Score Prediction** — daily percentile projection with confidence intervals
- **4 Coaching Modes:** Strict · Supportive · Socratic · Strategist
- **Daily Brief** — personalized morning audio + visual report every day

### Battle Arena
- **1v1 Lightning** — real opponent, 10 questions, 90 seconds each, ELO rating
- **Daily Blitz** — 5 questions, community-wide, same for everyone (like Wordle)
- **The Gauntlet** — 100 questions, adaptive difficulty, global leaderboard
- **Boss Battles** — weekly ultra-hard concept, first 100 correct get Boss Slayer badge
- **Hive Wars** — 5v5 team battles, win together or lose together
- Real-time **ELO system** using Chess standard formula
- Post-battle **cognitive analysis** — exactly where and why you lost

### Cognitive Analytics
- 90-day **performance trend** per subject
- **Error DNA Analysis** — Sign Flip Syndrome, Formula Recall Lag, Unit Conversion Skip
- **Score Prediction Engine** — confidence intervals, scenario modeling
- **Subject Balance Radar** — visual mastery across exam-specific subjects
- **Autopsy Report** — time heatmap, careless vs conceptual error breakdown
- **Peer Comparison** — vs top 10% scorers (anonymized)

### DeepStudy — AI Learning Tools
- **Smart Notes Editor** — ARIA auto-tags, links concepts, flags gaps
- **Concept Crystallizer** — paste any text → exam-ready structured summary
- **YouTube → Notes** — paste lecture URL → notes with timestamps
- **PDF Annihilator** — upload NCERT → exam-ready summary + practice questions
- **Mind Map Generator** — type chapter name → interactive concept map
- **Formula Vault** — every formula linked to question types + memory tricks
- **Bidirectional Flashcards** — auto-generated from notes, SM-2 spaced repetition

### Hive Rooms — Social Study
- **Silent Hive** — Pomodoro focus, ambient sounds, peer pressure without distraction
- **Discussion Hive** — live chat + AI whiteboard + voice
- **Lecture Hive** — one teaches, rest attend, ARIA auto-summarizes recording
- **Battle Hive** — same question for all, fastest correct answer wins
- **Accountability Hive** — daily check-in, state goals, community witnesses
- Synchronized Pomodoro timers across all room members
- Room recordings → ARIA extracts key insights → community note vault

### Smart Scheduler
- ARIA builds **day-by-day, hour-by-hour** study plan for entire prep period
- Adjusts **daily** based on what you actually did yesterday
- **Missed session?** Redistributes content, never drops it
- **Rescue Mode** — falling behind triggers compressed catch-up schedule
- Google Calendar sync
- WhatsApp/Telegram reminders

### Hive Identity
- **Ranks:** Apprentice → Scholar → Thinker → Innovator → Architect → Genius → Einstein
- **Skill Crystals** — earned for every mastered concept, collected into constellations
- **Rivalry System** — challenge friends to month-long competitions with stakes
- **Legacy** — your anonymized prep data helps future students after you crack
- **HiveLegend** status — top contributors featured forever

### ExamForge
- **AI Paper Generator** — unique paper every time, calibrated to YOUR weak areas
- **Predict This Year's Paper** — 10-year pattern analysis + Gemini prediction
- **PYQ Intelligence** — all previous year questions tagged, ARIA finds likely repeats
- **Adaptive Full-Length Test** — adapts in real-time, predicts percentile with 89% accuracy
- Timed proctored mode with AI webcam monitoring (optional)

---

## Tech Stack

### Frontend
```
React 18 + Vite + TypeScript (strict mode)
ShadCN UI + Radix UI primitives
Tailwind CSS with custom hive.* design tokens
GSAP 3 + ScrollTrigger + SplitText (animations)
Three.js + React Three Fiber (knowledge graph 3D)
Framer Motion (page transitions)
Zustand (global state management)
React Query + Axios (server state + data fetching)
Socket.io client (real-time battles)
Recharts (analytics visualizations)
KaTeX + react-katex (math formula rendering)
React Hook Form + Zod (forms + validation)
Lucide React (icon system)
Sonner (toast notifications)
```

### Backend
```
Node.js 20 + Express + TypeScript
MongoDB + Mongoose (primary database, 8 schemas)
Upstash Redis REST (caching + session store)
Socket.io (real-time battles + rooms + notifications)
Bull + node-cron (background job queues)
Passport.js + passport-google-oauth20
JWT + refresh token rotation (httpOnly cookies)
Cloudinary (file upload + PDF storage)
Resend (transactional emails)
bcryptjs (password hashing)
express-rate-limit (API protection)
```

### AI / Intelligence
```
Google Gemini 2.5 Flash — ARIA coaching conversations
Google Gemini 2.5 Flash — Question generation (10 types)
Google Gemini 2.5 Flash — PDF processing + summarization
Google Gemini 2.5 Flash — Mind map generation
Google Gemini 2.5 Flash — Crash plan creation
Google Gemini 2.5 Flash — Daily brief generation
Google Gemini 2.5 Flash — Error DNA analysis
Chess ELO algorithm — Battle rating system
SM-2 algorithm — Spaced repetition flashcards
Ebbinghaus forgetting curve — Retention tracking
```

### Infrastructure
```
Frontend  ── Vercel        (auto-deploy, CDN, SSL)
Backend   ── Railway       (Node.js, auto-scale)
Database  ── MongoDB Atlas (M0 free, Mumbai region)
Cache     ── Upstash       (Redis REST, Singapore)
Files     ── Cloudinary    (25GB free tier)
Email     ── Resend        (3,000/month free)
OAuth     ── Google Cloud  (free forever)
Design    ── Google Stitch (MCP import via Antigravity)
```

---

## Project Structure

```
studyhive-2/                          ← Monorepo root
│
├── studyhive-2/                      ← React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── aria/                 ← ARIAChat, ARIABrief, Badge
│   │   │   ├── battle/               ← Arena, Timer, QuestionCard
│   │   │   ├── dashboard/            ← BriefPanel, FeedPanel, GraphPanel
│   │   │   ├── gsap/                 ← MagneticButton, ScrollReveal, Counter
│   │   │   ├── home/                 ← Hero, Features, Pricing, Footer
│   │   │   ├── layout/               ← AppShell, AuthGuard, Navbar, Sidebar
│   │   │   ├── study/                ← FlashcardStack, MindMap, FormulaVault
│   │   │   ├── three/                ← KnowledgeGraph3D, ParticleField
│   │   │   └── ui/                   ← ShadCN + custom components
│   │   ├── pages/
│   │   │   ├── Landing.tsx           ← Public landing page
│   │   │   ├── LoginPage.tsx         ← Auth: login
│   │   │   ├── RegisterPage.tsx      ← Auth: 2-step registration
│   │   │   ├── Dashboard.tsx         ← Mission Control (3-panel war room)
│   │   │   ├── AICoachPage.tsx       ← ARIA chat interface
│   │   │   ├── BattleArenaPage.tsx   ← Battle mode selector + arena
│   │   │   ├── AnalyticsPage.tsx     ← Cognitive intelligence report
│   │   │   ├── HiveRoomsPage.tsx     ← Social study rooms
│   │   │   ├── DeepStudyPage.tsx     ← AI study tools
│   │   │   ├── ExamForgePage.tsx     ← Mock test generator
│   │   │   └── SchedulePage.tsx      ← AI study calendar
│   │   ├── hooks/
│   │   │   ├── useARIA.ts            ← ARIA state + actions wrapper
│   │   │   ├── useARIAData.ts        ← React Query hooks for ARIA API
│   │   │   ├── useAnalytics.ts       ← Analytics API hooks
│   │   │   ├── useBattle.ts          ← Battle state + socket events
│   │   │   ├── useBattleData.ts      ← Battle API hooks
│   │   │   ├── useScheduler.ts       ← Scheduler API hooks
│   │   │   ├── useSocket.ts          ← Socket.io connection
│   │   │   ├── useBreakpoint.ts      ← Responsive breakpoints
│   │   │   └── usePageTransition.ts  ← GSAP page transitions
│   │   ├── store/
│   │   │   ├── useUserStore.ts       ← Auth + user state (Zustand + persist)
│   │   │   ├── useARIAStore.ts       ← ARIA messages + profile state
│   │   │   ├── useBattleStore.ts     ← Battle state + matchmaking
│   │   │   └── useUIStore.ts         ← UI state (sidebar, modals, toasts)
│   │   ├── lib/
│   │   │   ├── api.ts                ← Axios instance + interceptors
│   │   │   └── socket.ts             ← Socket.io singleton
│   │   ├── constants/
│   │   │   ├── exams.ts              ← Exam configs (JEE/NEET/UPSC/CAT)
│   │   │   ├── ranks.ts              ← Rank system + XP thresholds
│   │   │   └── routes.ts             ← Route constants
│   │   └── types/
│   │       ├── user.ts               ← User, WeakTopic, Crystal types
│   │       ├── aria.ts               ← ARIAProfile, ErrorPattern, Message
│   │       ├── battle.ts             ← Battle, BattlePlayer, Question
│   │       └── question.ts           ← Question types
│   ├── tailwind.config.ts            ← Custom hive.* design tokens
│   └── vite.config.ts                ← Path aliases + React dedupe
│
├── backend/                          ← Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                 ← MongoDB connection
│   │   │   ├── gemini.ts             ← Gemini 2.5 Flash setup
│   │   │   ├── redis.ts              ← Upstash REST client
│   │   │   └── cloudinary.ts         ← File upload config
│   │   ├── models/
│   │   │   ├── User.ts               ← User schema (accuracy virtual, rank calc)
│   │   │   ├── ARIAProfile.ts        ← Knowledge graph + error DNA + forgetting
│   │   │   ├── Battle.ts             ← Battle schema with ELO changes
│   │   │   ├── Question.ts           ← AI-generated questions
│   │   │   ├── Session.ts            ← Study sessions
│   │   │   ├── Note.ts               ← Notes + flashcards
│   │   │   ├── Room.ts               ← Hive rooms + Pomodoro state
│   │   │   └── Notification.ts       ← Push notifications
│   │   ├── routes/
│   │   │   ├── auth.ts               ← Register, Login, OAuth, Refresh
│   │   │   ├── aria.ts               ← Chat, Brief, Graph, ErrorDNA, CrashPlan
│   │   │   ├── questions.ts          ← Generate, Practice, PYQ, Blitz
│   │   │   ├── battles.ts            ← Create, Join, History, Leaderboard
│   │   │   ├── analytics.ts          ← Overview, Trend, Subjects, Sessions
│   │   │   ├── rooms.ts              ← Create, Join, Pomodoro
│   │   │   ├── scheduler.ts          ← Today, Generate, Flashcards
│   │   │   ├── users.ts              ← Profile, Crystals, Rivalry
│   │   │   └── notifications.ts      ← List, Read, ReadAll
│   │   ├── services/
│   │   │   ├── gemini.service.ts     ← 10 AI functions (question gen, ARIA, PDF)
│   │   │   ├── aria.service.ts       ← Knowledge graph + error DNA + forgetting
│   │   │   ├── scoring.service.ts    ← Chess ELO + XP calculation
│   │   │   └── email.service.ts      ← Welcome, reminder, weekly report
│   │   ├── socket/
│   │   │   ├── index.ts              ← Socket.io init + auth middleware
│   │   │   ├── battle.socket.ts      ← Live battle events + ELO updates
│   │   │   └── room.socket.ts        ← Room sync + Pomodoro + whiteboard
│   │   ├── jobs/
│   │   │   ├── forgettingCurve.job.ts  ← Hourly: due flashcard notifications
│   │   │   ├── scoreProjection.job.ts  ← Daily: recalculate percentile
│   │   │   ├── dailyBlitz.job.ts       ← 6AM: generate fresh blitz questions
│   │   │   └── weeklyReport.job.ts     ← Sunday: email cognitive report
│   │   └── middleware/
│   │       ├── auth.ts               ← JWT verify + streak update
│   │       ├── rateLimit.ts          ← Per-route rate limiting
│   │       └── errorHandler.ts       ← Global error boundary
│   └── tsconfig.json
│
└── DESIGN.md                         ← Design DNA (extracted from Google Stitch)
```

---

## API Reference

### Authentication
```
POST   /auth/register          Create account
POST   /auth/login             Sign in
GET    /auth/google            Google OAuth redirect
GET    /auth/google/callback   OAuth callback
POST   /auth/refresh           Refresh access token
POST   /auth/logout            Sign out
GET    /auth/me                Get current user
```

### ARIA Intelligence
```
POST   /api/aria/chat              Send message → Gemini response
GET    /api/aria/daily-brief       Get personalized morning brief
GET    /api/aria/knowledge-graph   Get concept mastery map
GET    /api/aria/error-dna         Get recurring mistake patterns
GET    /api/aria/score-prediction  Get percentile forecast
POST   /api/aria/crash-plan        Generate emergency revision plan
POST   /api/aria/generate-mindmap  Generate chapter mind map
POST   /api/aria/process-pdf       Upload + analyze PDF
```

### Questions
```
POST   /api/questions/generate          AI generate questions
GET    /api/questions/practice          Get calibrated practice set
POST   /api/questions/answer            Submit answer + update graph
GET    /api/questions/daily-blitz       Get today's blitz questions
POST   /api/questions/daily-blitz/submit Submit blitz answers
GET    /api/questions/pyq               Previous year questions
```

### Battles
```
POST   /api/battles/matchmake      Find opponent by ELO
POST   /api/battles/create         Create battle room
POST   /api/battles/join           Join battle
GET    /api/battles/:id            Get battle details
GET    /api/battles/history        Past battles + ELO changes
GET    /api/battles/leaderboard    Top players by ELO
```

### Analytics
```
GET    /api/analytics/overview            Accuracy, questions, hours, percentile
GET    /api/analytics/performance-trend   90-day subject curves
GET    /api/analytics/subject-breakdown   Per-subject mastery
GET    /api/analytics/weekly-report       Full cognitive report
POST   /api/analytics/session/start       Start study session timer
PATCH  /api/analytics/session/:id/end    End session + record data
```

### Scheduler
```
GET    /api/scheduler/today              Today's AI study plan
POST   /api/scheduler/generate           Generate new plan
PATCH  /api/scheduler/session/:id        Update session status
GET    /api/scheduler/flashcards/due     Cards due for review
POST   /api/scheduler/flashcards/review  Record flashcard rating
```

---

## Database Schemas

### User
```typescript
{
  email: string           // unique, indexed
  name: string
  examTarget: string      // JEE | NEET | UPSC | CAT | GATE | CLAT
  examDate: Date
  rank: string            // Apprentice → Einstein
  eloRating: number       // default 1200, Chess ELO
  xp: number              // drives rank calculation
  streak: number          // consecutive days
  longestStreak: number
  projectedPercentile: number
  weakTopics: WeakTopic[]
  crystals: Crystal[]
  totalQuestionsAnswered: number
  totalCorrect: number
  totalStudyMinutes: number
  battlesWon: number
  battlesTotal: number
  isPro: boolean
  isElite: boolean
  // Virtual: accuracy (totalCorrect/totalAnswered * 100)
  // Method: calculateRank() based on XP
  // Method: updateStreak() on daily login
}
```

### ARIAProfile
```typescript
{
  userId: ObjectId
  knowledgeGraph: [{
    concept: string
    subject: string
    mastery: 'mastered' | 'shaky' | 'danger' | 'untouched'
    masteryPercent: number    // 0-100
    lastPracticed: Date
    correctCount: number
    practiceCount: number
  }]
  errorDNA: [{
    name: string              // e.g. "Sign Flip Syndrome"
    subject: string
    frequency: number
    description: string
    lastOccurred: Date
  }]
  forgettingCurves: [{
    conceptId: string
    retentionPercent: number
    nextReviewDate: Date
    easeFactor: number        // SM-2 algorithm
    interval: number
  }]
  conversations: [{
    role: 'user' | 'aria'
    content: string
    timestamp: Date
    mode: string
  }]
  peakWindow: { start: string, end: string }
}
```

---

## Environment Variables

### `backend/.env`
```env
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/studyhive

# Cache
REDIS_URL=https://your-upstash-url.upstash.io
REDIS_TOKEN=your_upstash_token

# Auth
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxx
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# AI
GEMINI_API_KEY=AIzaSy-xxxx

# Files
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
RESEND_API_KEY=re_xxxx

# Frontend
FRONTEND_URL=http://localhost:5173
BCRYPT_ROUNDS=12
```

### `studyhive-2/.env`
```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

---

## Design System

Built from **Google Stitch** UI designs imported via MCP (Model Context Protocol) into Antigravity IDE.

### Color Tokens
```css
--hive-dark:    #08080C   /* Primary background */
--hive-card:    #0F0F18   /* Card surfaces */
--hive-border:  #1C1C2E   /* Subtle borders */
--hive-surface: #13131F   /* Secondary surfaces */
--hive-blue:    #0EA5E9   /* JEE · Primary accent */
--hive-green:   #22C55E   /* NEET · Success */
--hive-gold:    #F59E0B   /* UPSC · Warning */
--hive-purple:  #8B5CF6   /* CAT · AI/ARIA */
--hive-red:     #EF4444   /* Danger · Battles */
--hive-muted:   #6B7280   /* Secondary text */
```

### Animation Stack
```
GSAP SplitText    → Hero headline character animation
GSAP ScrollTrigger → Scroll-driven reveals + parallax
GSAP MagneticButton → Cursor-following hover on CTAs
GSAP CounterAnimation → Number count-up on scroll enter
GSAP SVG Draw     → Score trajectory line animation
CSS Intersection Observer → Section scroll reveals
Three.js          → Knowledge graph 3D + particle field
Framer Motion     → Page transition animations
```

---

## Roadmap

### ✅ Completed
- [x] Full frontend — 9 pages, mobile responsive
- [x] Dark theme design system (Google Stitch → MCP → Antigravity)
- [x] ShadCN UI + GSAP animations throughout
- [x] Complete auth flow (email + Google OAuth)
- [x] Real Gemini 2.5 Flash AI integration
- [x] MongoDB schemas — all 8 models
- [x] REST API — all 10 route groups
- [x] Socket.io infrastructure
- [x] Background job system (cron)
- [x] Email service (Resend)
- [x] Zustand stores + React Query
- [x] JWT + session persistence

### 🔄 In Progress
- [ ] Question answering engine (the data flywheel)
- [ ] Real-time battle system (Socket.io 1v1)
- [ ] Exam-aware dynamic subjects
- [ ] Practice mode UI

### 📋 Planned
- [ ] Deploy to Vercel + Railway
- [ ] PDF Annihilator (Gemini vision)
- [ ] YouTube → Notes pipeline
- [ ] Hive Rooms with Pomodoro sync
- [ ] Mobile PWA
- [ ] Onboarding flow
- [ ] Institute white-label

---

## Business Model

| Tier | Price | Features |
|------|-------|----------|
| **Free** | ₹0/month | 20 AI questions/day, Basic analytics, 2 Hive Rooms, Daily Blitz |
| **Pro** | ₹499/month | Unlimited AI, Full ARIA, All rooms, Mock tests, PDF Annihilator |
| **Elite** | ₹999/month | Everything + 4 mentor sessions, Exam fingerprint, Performance guarantee |
| **Institute** | ₹2L-10L/year | White-label, Teacher dashboard, Parent portal, Bulk onboarding |

**Target market:** 10M+ Indian competitive exam students  
**Addressable market:** ₹58,000 crore exam prep industry

---

## How It Was Built

This project was built using an AI-first development workflow:

```
Google Stitch (UI Design)
    ↓ MCP connection
Antigravity IDE (AI coding agent)
    ↓ Gemini 3.1 Pro
Complete codebase generated + verified
    ↓
GitHub (version control)
    ↓
Vercel + Railway (deployment)
```

**Design → Code pipeline:**
1. Generated 6 high-fidelity UI screens in **Google Stitch** using Vibe Design
2. Connected Stitch to **Antigravity** via MCP (Model Context Protocol)
3. Antigravity's AI agent fetched Design DNA (34 colors, 4 components)
4. Generated complete React components from Stitch HTML/CSS
5. Upgraded every component with **ShadCN** replacements
6. Added **GSAP** animations throughout
7. Built complete **Node.js backend** with all integrations

---

## Contributing

This is currently a private project. Collaboration by invitation only.

If you're interested in contributing, reach out via:
- LinkedIn: [Pratyush Prakash](https://linkedin.com/in/pratyush-prakash-4b2ab0288)
- GitHub: [@PRATYUSH2444](https://github.com/PRATYUSH2444)

---

## License

Private — All rights reserved © 2026 StudyHive

---

<div align="center">

<br />

**Built with obsession for India's exam warriors** 🇮🇳

<br />

<img src="https://img.shields.io/badge/Made_with-Gemini_2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Designed_in-Google_Stitch-EA4335?style=flat-square&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Built_in-Antigravity_IDE-8B5CF6?style=flat-square" />

<br />
<br />

*ARIA is watching. Your exam is waiting.*

</div>
````

🔥

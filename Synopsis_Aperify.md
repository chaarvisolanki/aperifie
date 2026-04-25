# APERIFY — Product Synopsis

## A Behavioral Intelligence Platform for Engineering Flow States

---

**Project Synopsis submitted in partial fulfillment of the requirements for the degree of Bachelor/Master of Computer Applications / Engineering**

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Team Information](#2-team-information)
3. [Problem Statement](#3-problem-statement)
4. [Project Description](#4-project-description)
5. [System Design](#5-system-design)
   - 5.1 Context Level Diagram (Level-0 DFD)
   - 5.2 Level-1 DFD
   - 5.3 ER Diagram
6. [Database Design](#6-database-design)
7. [Screenshots](#7-screenshots)
8. [Software Requirements Specification (SRS)](#8-software-requirements-specification-srs)
9. [Testing](#9-testing)
10. [References](#10-references)

---

## 1. Introduction

### 1.1 Overview

**APERIFY** is the high-performance evolution of ChronosAI and Kairos — a **Behavioral Intelligence Platform** that transforms mundane academic and professional scheduling into a high-dopamine, addictive experience. While its predecessor ChronosAI focused on the "logic" of scheduling, APERIFY focuses on the "psychology" of execution. It is designed to make being productive feel as engaging and rewarding as scrolling through Instagram Reels or TikTok.

The platform operates on a radical premise: **productivity is not a logistics problem, but a behavioral problem**. By leveraging carefully designed reward systems ("Juice"), real-time AI coaching, and engaging visual feedback loops, APERIFY creates an experience that users genuinely want to return to — turning the act of completing tasks into a neurological reward cascade that reinforces positive behavior.

### 1.2 The Core Philosophy: "Dopamine Engineering"

The name **APERIFY** represents the "Aperitif" of productivity — the perfect start to a flow state. It shifts the user's focus from *"What do I have to do?"* to *"How good will it feel to finish this?"*

The name embodies three pillars:
- **AP** — Apex Performance: Reaching peak productivity
- **ER** — Engineered Rewards: Neurological reinforcement loops
- **IFY** — Transformation: Turning tasks into achievements

The platform achieves this through three distinct architectural layers:

1. **The Intelligence Layer (The Brain)**: Gemini AI acting as a neurological partner that calculates Mental Bandwidth and predicts Flow-State Windows
2. **The "Reels-Style" Interface (The Hook)**: High-fidelity, gestural interface replacing basic UI with TikTok-style infinite scroll and celebration animations
3. **The Automated Backend (The Engine)**: NLP Task Parser, dual-layer database, and adaptive learning system

### 1.3 Purpose of the Project

The purpose of this project is to develop a comprehensive productivity application that:

1. **Enhances User Engagement**: Transforms traditional task management into an engaging, game-like experience using dopamine-driven design principles
2. **Promotes Behavioral Change**: Uses psychological principles from BJ Fogg's Behavior Model and gamification to build positive productivity habits through streak systems and "Juice" celebrations
3. **Provides Intelligent Assistance**: Employs Gemini AI for cognitive load engineering, predicting optimal work periods and providing real-time behavioral interventions
4. **Delivers Actionable Insights**: Offers detailed analytics including Focus Scores, Flow-State tracking, and productivity trend analysis
5. **Ensures Accessibility**: Provides a cross-platform experience that works seamlessly on desktop and mobile devices with responsive design

### 1.4 Scope of the Project

APERIFY encompasses the following functional domains:

- **Task Management**: Create, complete, snooze, and organize tasks with AI-optimized prioritization
- **NLP Task Parser**: Convert natural language input into structured task data
- **Streak System**: Gamified daily streak tracking with milestone celebrations and freeze tokens
- **AI Coach**: Real-time behavioral coaching with encouragement, tips, and procrastination intervention
- **Celebration Engine ("Juice")**: Visual and audio feedback system for task completion with particle bursts and confetti
- **Cognitive Load Engineering**: Mental Bandwidth calculation and adaptive task scheduling
- **Analytics Dashboard**: Comprehensive productivity metrics including Focus Scores, category breakdowns, and trend analysis
- **User Authentication**: Secure account management with NextAuth.js integration
- **Responsive Design**: Adaptive interface for desktop and mobile platforms

### 1.5 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend Framework | Next.js (App Router) | 14.2.26 |
| UI Library | React | 18.3.0 |
| Styling | Tailwind CSS | 3.4.3 |
| Animation | Framer Motion | 11.0.0 |
| State Management | Zustand | 4.5.0 |
| Icons | Lucide React | 0.400.0 |
| Database ORM | Prisma | 5.22.0 |
| Database | SQLite (dev) / PostgreSQL (prod) | - |
| Authentication | NextAuth.js | 4.24.5 |
| AI Integration | Anthropic SDK / Groq SDK | 0.91.0 / 1.1.2 |
| Password Hashing | bcryptjs | 3.0.3 |
| Confetti Effects | canvas-confetti | 1.9.0 |
| Language | TypeScript | 5.4.0 |

### 1.6 Document Organization

This synopsis is organized into ten comprehensive chapters. Chapter 1 provides the introduction and project overview. Chapter 2 contains team information. Chapter 3 defines the problem statement. Chapter 4 gives a detailed project description. Chapter 5 presents the system design including DFDs and ER diagrams. Chapter 6 covers database design. Chapter 7 includes screenshots of the application. Chapter 8 provides the Software Requirements Specification. Chapter 9 details the testing strategy. Chapter 10 contains references.

---

## 2. Team Information

### 2.1 Development Team

| Role | Name | Responsibility |
|------|------|----------------|
| Project Lead | [Team Lead Name] | Architecture design, code review, integration |
| Frontend Developer | [Developer 1] | UI implementation, animations, responsive design |
| Backend Developer | [Developer 2] | API development, database design, authentication |
| AI/ML Engineer | [Developer 3] | AI coach integration, productivity algorithms |
| UI/UX Designer | [Designer Name] | Visual design, user experience optimization |
| QA Engineer | [Tester Name] | Testing, bug identification, quality assurance |

### 2.2 Faculty Guide

| Role | Name | Department |
|------|------|------------|
| Project Guide | [Guide Name] | Department of Computer Applications/Engineering |
| Institution | [Institution Name] | [City, State] |

### 2.3 Project Duration

| Item | Details |
|------|---------|
| Start Date | [Start Date] |
| End Date | [End Date] |
| Total Duration | [X] Months |

### 2.4 Acknowledgments

The development team acknowledges the guidance and support of faculty members, peers, and the open-source community whose libraries and frameworks have made this project possible. Special acknowledgment to Google for Gemini AI, Anthropic for Claude, and the Next.js team for creating the foundation of modern web applications.

---

## 3. Problem Statement

### 3.1 Background and Context

The global productivity app market is worth approximately $15 billion, with millions of users downloading task management applications each year. However, despite this massive market and apparent demand, industry research reveals a troubling pattern: **90% of users abandon productivity tools within 30 days of installation**.

This abandonment rate represents a fundamental failure in how traditional productivity applications approach user engagement. ChronosAI solved the *logic* of scheduling. APERIFY solves the *psychology* of execution.

### 3.2 The Core Problem

Traditional task managers and even earlier tools like ChronosAI suffer from critical flaws:

#### 3.2.1 Lack of Neurological Reward Architecture

Checking off a task on a static checklist triggers no significant neurological reward. Traditional productivity apps document work without making work feel rewarding. The act of completion exists in a cognitive vacuum — users complete tasks but don't experience the dopamine release that would reinforce the behavior.

#### 3.2.2 Anxiety-Driven Design

Many productivity applications inadvertently create anxiety rather than motivation. Staring at a calendar filled with deadlines and obligations activates stress responses rather than engagement. The visual design often emphasizes what users haven't done rather than celebrating what they have accomplished.

#### 3.2.3 Static, Non-Adaptive Scheduling

Tools like ChronosAI excel at organizing tasks but fail to adapt to the user's cognitive state. They don't account for mental fatigue, stress levels, or the natural ultradian rhythms that affect productivity throughout the day.

#### 3.2.4 Disconnected from Behavioral Psychology

Most productivity apps optimize for organization but ignore the multi-dimensional nature of human motivation. They don't leverage proven principles from behavioral psychology like variable reward schedules, implementation intentions, or friction reduction.

### 3.3 Existing Solutions and Their Limitations

| Application | Strengths | Limitations |
|-------------|----------|-------------|
| Todoist | Clean interface, cross-platform | No gamification, basic reward feedback |
| Habitica | Strong gamification, social features | Complex UX, overwhelming for new users |
| Forest | Creative concept, focus mode | Limited task management, gamification tied to app |
| Notion | Highly customizable | Steep learning curve, no built-in productivity focus |
| ChronosAI (Previous) | AI scheduling, time tracking | Streamlit UI, no dopamine engineering |
| TickTick | Feature-rich | Dated interface, complex for simple tasks |

None of the existing solutions successfully combines:
- Intuitive task management
- Psychology-driven reward architecture ("Juice")
- AI-powered cognitive load engineering
- Engaging TikTok/Reels-style visual design
- Cross-platform accessibility

### 3.4 Proposed Solution: APERIFY

APERIFY addresses these limitations through a comprehensive three-layer approach:

#### Layer 1: Intelligence Layer (The Brain)

**Gemini AI as a Neurological Partner:**
- Calculates real-time "Mental Bandwidth" to detect stress/fatigue
- Automatically reshuffles high-intensity tasks to optimal times
- Creates "Flow-State Windows" predicting peak efficiency periods
- Proactively adjusts schedules to prevent "time-poverty"

#### Layer 2: Interface Layer (The Hook)

**"Reels-Style" Dopamine Engineering:**
- Swipeable task cards with infinite scroll
- "Juice" celebrations: particle bursts, confetti, haptic glows
- Streak system with milestone animations
- Premium Neon-Dark gaming aesthetic

#### Layer 3: Engine Layer (The Foundation)

**Automated Backend:**
- NLP Task Parser for natural language input
- Dual-layer database (SQLite/PostgreSQL + Redis ready)
- Adaptive learning from user behavior patterns
- Sub-100ms response times

### 3.5 Project Objectives

The primary objectives of the APERIFY project are:

| Objective | Description | Success Metric |
|-----------|-------------|----------------|
| Engagement | Create an addictive user experience | 3x better 30-day retention vs industry benchmark |
| Habit Formation | Build sustainable productivity habits | Users maintaining streaks averaging 14+ days |
| Task Completion | Increase task completion rates | 40% improvement over traditional apps |
| Flow State | Facilitate deep work sessions | AI-predicted Flow Windows improve output by 25% |
| User Satisfaction | Deliver a premium, polished experience | NPS score of 50+ |
| Accessibility | Provide seamless cross-platform experience | 95% feature parity across devices |

### 3.6 Stakeholders

| Stakeholder | Needs and Expectations |
|------------|----------------------|
| Individual Users | Intuitive task management, engaging experience, productivity improvement |
| Students | Academic task organization, study habit development, deadline tracking |
| Professionals | Focus optimization, meeting preparation, project task management |
| Knowledge Workers | Flow state facilitation, cognitive load management, deep work support |
| Organizations | Team productivity insights, shared streaks, collaborative features (future) |

---

## 4. Project Description

### 4.1 Core Concept

APERIFY is a **Behavioral Intelligence Platform** that engineers flow states rather than merely tracking time. The platform transforms the mundane act of task management into an experience users want to open repeatedly — applying the same psychological hooks that make social media addictive, but channeling them toward productive outcomes.

**The Pivot from ChronosAI**: ChronosAI tracked time. APERIFY engineers flow states.

### 4.2 Key Differentiators

| Feature | Traditional Apps | ChronosAI | APERIFY |
|---------|-----------------|-----------|---------|
| Task Display | Static lists, calendars | Streamlit interface | Swipeable, infinite-scroll Focus Feed |
| AI Integration | None or basic reminders | Time tracking, scheduling | Mental Bandwidth, Flow-State prediction |
| Completion Feedback | Checkbox toggle | Progress bar | Scale animation + particle burst + confetti |
| UI Design | Utility-focused | Functional | Premium Neon-Dark gaming aesthetic |
| Reward System | None | Basic | Full "Juice" celebration engine |
| Gestural Interface | None | None | Swipe to complete/snooze |
| Psychology Basis | None | Time optimization | Dopamine engineering, behavioral science |

### 4.3 Feature Description

#### 4.3.1 Focus Feed

The **Focus Feed** is the heart of APERIFY's user experience — a Reels-style infinite scroll of task cards.

**Key Characteristics:**
- Vertical scrolling feed of task cards
- Cards sorted by AI-determined priority and urgency
- Infinite scroll with skeleton loading states
- Pull-to-refresh on mobile devices
- Smooth staggered animations when cards appear
- Physics-based spring animations (stiffness: 300, damping: 30)

**Task Card Interactions:**
- **Swipe Right**: Complete task with full "Juice" celebration effect
- **Swipe Left**: Snooze task (options: 1 hour, 1 day, tomorrow)
- **Tap**: Expand details modal with full task information
- **Long Press**: Quick actions menu (edit, delete, change priority)

#### 4.3.2 The "Juice" Celebration Engine

The **"Juice"** is APERIFY's signature reward system — transforming task completion into a memorable, dopamine-triggering event.

**Visual Effects:**
- Card scales up (1.1x) and fades out smoothly
- Particle burst from card center (50-100 particles in brand colors)
- Confetti shower (subtle, 1-2 seconds duration)
- Streak counter animates upward with bounce
- Glow pulse effect on streak flame icon
- AI Coach celebration message with typing animation

**Additional Feedback:**
- Sound effects (toggleable in preferences)
- Haptic feedback on mobile devices
- Color pulse ripple effect from completed card

**Animation Specifications:**
- Spring physics: stiffness 300, damping 30
- Particle count: 50-100 per burst
- Confetti spread: 100 degrees
- Duration: 1-2 seconds for full celebration

#### 4.3.3 Streak System

The streak system is APERIFY's primary gamification element, designed to build consistent daily engagement using behavioral psychology principles.

**Components:**
- **Current Streak**: Days of consecutive task completion
- **Longest Streak**: Historical best achievement
- **Streak Flame**: Animated flame icon with flicker effect
- **Streak Freezes**: 2 tokens per week to maintain streak during breaks
- **Milestone Celebrations**: Special "Juice" effects at 7, 30, 100, and 365 days

**Behavioral Psychology Basis:**
Streaks leverage the "endowment effect" — people value things more highly once they own them. A streak becomes a digital asset users are reluctant to lose, creating powerful motivation for daily engagement.

#### 4.3.4 AI Coach (Intelligence Layer)

The **AI Coach** provides real-time behavioral intervention through a floating chat interface powered by Gemini AI.

**Functional Capabilities:**
- **Mental Bandwidth Calculation**: Detects when user's cognitive capacity is reduced
- **Flow-State Window Prediction**: Identifies optimal times for deep work based on historical patterns
- **Time-of-Day Motivation**: Appropriate messages for morning, afternoon, evening
- **Procrastination Detection**: Triggers when no interaction for extended periods (configurable)
- **Task Completion Encouragement**: Positive reinforcement on task completion
- **Deadline Pressure Management**: Gentle nudges as deadlines approach

**Personality Traits:**
- Encouraging and supportive
- Slightly playful and witty
- Never guilt-tripping or shaming
- Motivating without being aggressive
- Uses natural, conversational language

**Sample Messages:**
- "Good morning! Your focus energy is peak right now. Tackle that big task before noon!"
- "You've been stuck on the same task for 45 minutes. Take a 5-minute break — you've got this."
- "Only 2 tasks left! Imagine how satisfying that final completion will feel."
- "I noticed your Mental Bandwidth is low today. I've rescheduled the heavy lifting for tomorrow morning."

#### 4.3.5 Schedule View

The **Schedule View** provides a calendar-based overview with AI-optimized time blocks.

**Features:**
- Weekly calendar with time blocks
- Tasks color-coded by priority and category
- AI-suggested focus blocks highlighted with special indicator
- Week navigation (previous/next)
- Timeline view showing hourly task distribution
- Drag-and-drop task rescheduling (future)

#### 4.3.6 Stats Dashboard

The **Stats Dashboard** provides comprehensive productivity analytics including Flow State tracking.

**Metrics Tracked:**
- **Focus Score (0-100)**: Daily calculated productivity metric based on completion rate and efficiency
- **Flow State Score**: Percentage of time spent in deep work vs shallow tasks
- **Tasks Completed**: Total and category breakdown
- **Current Streak**: Daily engagement indicator
- **Weekly Productivity Graph**: Historical performance visualization
- **Category Breakdown**: Pie/bar chart of task distribution
- **Week-over-Week Comparison**: Progress tracking
- **Mental Bandwidth History**: AI-calculated cognitive capacity over time

#### 4.3.7 User Profile

The **Profile Page** contains user settings, achievements, and AI preference controls.

**Components:**
- Profile card with avatar and streak display
- Stats row (current streak, best streak, focus score)
- Achievement badges (7-day, 30-day, 100-day, 365-day streak milestones)
- Preference toggles (notifications, sound, haptics, AI coach)
- AI settings (mental bandwidth sensitivity, flow state reminders)
- Sign out functionality

### 4.4 User Interface Design

#### 4.4.1 Design Philosophy: "Neon-Dark Premium"

APERIFY's visual design draws inspiration from:
- Premium gaming interfaces (Discord, Linear, Raycast)
- Dopamine architecture of TikTok/Instagram Reels
- Modern dark mode aesthetics with electric accents

Every interaction feels premium and rewarding, with careful attention to:
- Smooth transitions and animations (60 FPS target)
- Satisfying micro-interactions
- Consistent visual language
- Accessible contrast ratios (WCAG AA)

#### 4.4.2 Color Palette

| Purpose | Color Name | Hex Code |
|---------|-----------|----------|
| Deepest Background | Void | #09090B |
| Card Backgrounds | Surface | #0F0F12 |
| Elevated Surfaces | Elevated | #18181B |
| Hover States | Hover | #27272A |
| Subtle Dividers | Border Subtle | #1F1F23 |
| Default Borders | Border Default | #27272A |
| Focus Rings | Border Focus | #3F3F46 |
| Primary Text | Text Primary | #FAFAFA |
| Secondary Text | Text Secondary | #A1A1AA |
| Tertiary Text | Text Tertiary | #71717A |
| Primary Accent | Violet | #8B5CF6 |
| Secondary Accent | Cyan | #06B6D4 |
| Success States | Emerald | #10B981 |
| Warnings/Streaks | Amber | #F59E0B |
| Errors/Destructive | Rose | #F43F5E |

**Glow Effects:**
- Violet Glow: rgba(139, 92, 246, 0.4)
- Cyan Glow: rgba(6, 182, 212, 0.3)
- Emerald Glow: rgba(16, 185, 129, 0.4)
- Amber Glow: rgba(245, 158, 11, 0.4)

#### 4.4.3 Typography

| Purpose | Font | Fallback |
|---------|------|---------|
| Primary Text | Inter | system-ui, sans-serif |
| Headings/Display | Space Grotesk | system-ui, sans-serif |
| Metrics/Timers | JetBrains Mono | monospace |

#### 4.4.4 Spatial System

| Element | Value |
|---------|-------|
| Base Unit | 4px |
| Border Radius (sm) | 6px |
| Border Radius (md) | 10px |
| Border Radius (lg) | 16px |
| Border Radius (xl) | 24px |
| Card Padding | 20-24px |

#### 4.4.5 Responsive Breakpoints

| Breakpoint | Width | Layout Adaptation |
|------------|-------|-------------------|
| Mobile | <768px | Bottom navigation, full-width cards, touch gestures |
| Tablet | 768-1023px | Collapsed sidebar, full-width feed |
| Desktop | ≥1024px | Sidebar navigation, 2-column layouts |

### 4.5 User Interactions and Flows

#### 4.5.1 User Registration Flow

```
Landing Page → Register Button → Registration Form
    ↓
[Name, Email, Password] → Submit
    ↓
Account Created → Auto-Login → Focus Feed (Home)
    ↓
Onboarding: Set first task, define daily goal
```

#### 4.5.2 Task Completion Flow (The "Juice")

```
View Focus Feed → See Task Card → Swipe Right to Complete
    ↓
Card Scales Up (1.1x) + Particle Burst → Confetti Shower
    ↓
Streak Counter Animates Up → AI Coach Celebrates
    ↓
Card Fades Out → Stats Dashboard Updates
```

#### 4.5.3 AI Flow-State Prediction Flow

```
System Analyzes → Historical Completion Data + Time Patterns
    ↓
AI Identifies → Peak Focus Windows (e.g., 9-11 AM, 2-4 PM)
    ↓
High-Intensity Tasks → Automatically Scheduled in Flow Windows
    ↓
Low Energy Detected → Tasks Rescheduled, User Notified
```

### 4.6 Data Handling

#### 4.6.1 Local Storage
- Session tokens stored securely (HTTP-only cookies)
- UI preferences cached locally
- Offline-first architecture with sync indicators

#### 4.6.2 API Communication
- RESTful API endpoints for CRUD operations
- JWT-based authentication via NextAuth.js
- Real-time updates via optimistic UI updates

#### 4.6.3 State Management
- Zustand for global state (tasks, user data, UI state)
- React Context for theming and authentication
- Optimistic updates for responsive feel

### 4.7 Edge Cases and Error Handling

| Scenario | Handling |
|----------|----------|
| Empty State | Motivational illustration + "Add your first task" CTA |
| Loading | Skeleton cards with shimmer animation |
| API Error | Toast notification with retry action |
| Network Offline | Local-first with sync indicator, queue mutations |
| Procrastination Detected | Gentle AI nudge (not aggressive), offer break |
| Streak About to Break | Special encouragement message, streak freeze suggestion |
| Milestone Achieved | Special "Juice" celebration animation + badge unlock |
| Mental Bandwidth Low | AI reschedules heavy tasks, notifies user |

---

## 5. System Design

### 5.1 Context Level Diagram (Level-0 DFD)

The Context Level Diagram represents the entire APERIFY system as a single process with external entities interacting through data flows.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           APERIFY SYSTEM                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │     ┌────────────────────────────────────────────────────────┐     │    │
│  │     │           INTELLIGENCE LAYER (The Brain)                 │     │    │
│  │     │  • Mental Bandwidth Calculation    • Flow-State Prediction│     │    │
│  │     │  • Cognitive Load Engineering       • Adaptive Learning   │     │    │
│  │     └────────────────────────────────────────────────────────┘     │    │
│  │                              │                                        │    │
│  │     ┌───────────────────────┼───────────────────────────┐           │    │
│  │     │                       │                           │           │    │
│  │     ▼                       ▼                           ▼           │    │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐     │    │
│  │  │   TASK MGMT  │    │   STREAK    │    │    AI COACH      │     │    │
│  │  │   MODULE     │    │   SYSTEM    │    │    MODULE       │     │    │
│  │  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘     │    │
│  │         │                   │                   │               │    │
│  │         └───────────────────┼───────────────────┘               │    │
│  │                             ▼                                   │    │
│  │                    ┌──────────────────┐                          │    │
│  │                    │   "JUICE"       │                          │    │
│  │                    │   CELEBRATION   │                          │    │
│  │                    │   ENGINE        │                          │    │
│  │                    └──────────────────┘                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│                              │                                              │
└──────────────────────────────┼──────────────────────────────────────────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
    ┌────────────┐      ┌────────────┐     ┌────────────┐
    │   USER     │      │  DATABASE  │     │   AI API   │
    │  (Browser) │      │  (SQLite)  │     │ (Gemini/   │
    │  Mobile    │      │ PostgreSQL │     │  Claude)   │
    └────────────┘      └────────────┘     └────────────┘
```

**External Entities:**

| Entity | Description | Data Flows |
|--------|-------------|------------|
| User | End user interacting via browser/mobile app | Tasks, Preferences, Auth credentials |
| Database | SQLite (dev) / PostgreSQL (prod) via Prisma ORM | User data, Tasks, Streak data, AI models |
| AI API | External AI service (Gemini/Claude/Groq) | Coach messages, Mental Bandwidth, Flow predictions |

**Data Flows:**

| Flow ID | Description |
|---------|-------------|
| D1 | User authentication (login/register/logout) |
| D2 | Task CRUD operations |
| D3 | Streak updates on task completion |
| D4 | AI Coach messages to user |
| D5 | "Juice" celebration triggers |
| D6 | Mental Bandwidth calculations |
| D7 | Flow-State Window predictions |
| D8 | Stats/analytics to user |
| D9 | User preferences updates |
| D10 | AI API responses (messages, predictions) |

### 5.2 Level-1 DFD

The Level-1 DFD decomposes the system into major processes:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              LEVEL-1 DFD                                     │
└──────────────────────────────────────────────────────────────────────────────┘

                                ┌─────────────┐
                          D1    │             │
    ┌──────────────────────────►│  AUTH       │
    │                          │  MODULE     │
    │     User Credentials     │             │    Session Token
    │     Registration Data     │             ├──────────────────────────► User
    │                          └─────────────┘
    │                                 │
    │                                 │ D2
    │                                 ▼
    │ ┌───────────────────────────────────────────────────────────────────┐
    │ │                                                                   │
    │ │                        PROCESSES                                  │
    │ │                                                                   │
    │ │   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
    │ │   │   TASK       │    │   USER       │    │   AI COACH   │       │
    │ │   │   MODULE     │◄──►│   MODULE     │    │   MODULE     │       │
    │ │   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘       │
    │ │          │                   │                   │               │
    │ │          │ D3                │ D4                 │ D5              │
    │ │          │                   │                   │               │
    │ │          ▼                   ▼                   ▼               │
    │ │   ┌──────────────────────────────────────────────────────────┐    │
    │ │   │                      DATABASE                             │    │
    │ │   │  ┌─────────┐  ┌─────────┐  ┌──────────┐  ┌───────────┐  │    │
    │ │   │  │  USERS  │  │  TASKS  │  │ STREAKS  │  │PREFERENCES│  │    │
    │ │   │  └─────────┘  └─────────┘  └──────────┘  └───────────┘  │    │
    │ │   └──────────────────────────────────────────────────────────┘    │
    │ │                              │                                    │
    │ │                              │ D6                                  │
    │ │                              ▼                                    │
    │ │   ┌──────────────────────────────────────────────────────────┐     │
    │ │   │            INTELLIGENCE ENGINE                           │     │
    │ │   │  • Focus Score Calculation    • Streak History          │     │
    │ │   │  • Mental Bandwidth           • Flow-State Prediction   │     │
    │ │   │  • Category Breakdown         • Productivity Trends    │     │
    │ │   └──────────────────────────────────────────────────────────┘     │
    │ │                              │                                    │
    │ │                              │ D7                                  │
    │ └──────────────────────────────┼────────────────────────────────────┘
    │                                │
    │                                ▼
    │                          ┌─────────────┐
    └──────────────────────────│   OUTPUT    │
                               │  GENERATOR  │
                               │  (UI/RESP)  │
                               └─────────────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │    USER     │
                               │  (Browser)  │
                               └─────────────┘
```

**Level-1 Process Descriptions:**

| Process ID | Process Name | Description | Sub-processes |
|------------|--------------|-------------|---------------|
| P1 | Authentication Module | User login, registration, session management | Validate credentials, Create session, Generate JWT |
| P2 | Task Module | CRUD operations for tasks | Create task, Read tasks, Update task, Delete task, Complete task, Snooze task |
| P3 | User Module | User profile and preferences management | Update profile, Manage preferences, Fetch user data |
| P4 | AI Coach Module | AI-powered behavioral coaching | Mental Bandwidth calc, Flow-State prediction, Generate encouragement, Send nudges |
| P5 | Intelligence Engine | Advanced analytics and AI | Calculate focus score, Generate streak history, Category analysis, Adaptive learning |
| P6 | Database | Persistent storage layer | Store/retrieve users, tasks, streaks, preferences |
| P7 | Output Generator | Response formatting for UI | Format JSON responses, Aggregate data |

**Data Stores:**

| Data Store | Description | Records |
|------------|-------------|---------|
| D1-USERS | Registered user accounts | User credentials, profile info |
| D2-TASKS | User's task collection | Task details, status, timestamps, flow tags |
| D3-STREAKS | Streak tracking data | Current streak, longest streak, history |
| D4-PREFERENCES | User settings | Sound, haptics, AI coach toggles |
| D5-AI-DATA | AI-specific learning data | Mental bandwidth history, flow windows |

### 5.3 Entity-Relationship (ER) Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           ER DIAGRAM                                        │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐         ┌─────────────────────┐
│       USER          │         │       TASK         │
├─────────────────────┤         ├─────────────────────┤
│ id (PK)             │         │ id (PK)             │
│ email (UK)          │         │ title               │
│ name                │         │ description         │
│ password            │         │ priority             │
│ avatar              │         │ category            │
│ mentalBandwidth     │         │ deadline             │
│ focusScore          │         │ estimatedMinutes    │
│ createdAt           │         │ completed           │
│ updatedAt           │         │ completedAt         │
└─────────┬───────────┘         │ snoozedUntil        │
          │                     │ flowTag             │
          │                     │ createdAt            │
          │                     │ updatedAt           │
          │                     └─────────┬───────────┘
          │                               │
          │ 1                    ┌────────┴───────────┐
          │                      │                     │
          ▼                      └─────────────────────┘
┌─────────────────────┐
│    STREAKDATA       │
├─────────────────────┤         ┌─────────────────────┐
│ id (PK)             │         │  STREAKHISTORY      │
│ currentStreak       ├─────────┤ id (PK)             │
│ longestStreak       │    1   N├─────────────────────┤
│ freezesAvailable    │         │ date                │
│ lastCompletedDate   │         │ completed           │
│ userId (FK)         │         │ streakDataId (FK)   │
└─────────────────────┘         └─────────────────────┘


┌─────────────────────┐
│  USERPREFERENCES   │
├─────────────────────┤
│ id (PK)             │
│ soundEnabled        │
│ hapticsEnabled      │
│ aiCoachEnabled      │
│ aiSensitivity       │
│ userId (FK, UK)     │
└─────────────────────┘

┌─────────────────────┐
│    AIFLOWDATA     │
├─────────────────────┤
│ id (PK)             │
│ date                │
│ flowWindows         │
│ mentalBandwidth     │
│ productivityScore   │
│ userId (FK)         │
└─────────────────────┘

┌─────────────────────┐
│      ACCOUNT        │
├─────────────────────┤
│ id (PK)             │
│ userId (FK)         │
│ type                │
│ provider            │
│ providerAccountId   │
│ refresh_token       │
│ access_token        │
│ expires_at          │
└─────────────────────┘

┌─────────────────────┐
│      SESSION       │
├─────────────────────┤
│ id (PK)             │
│ sessionToken (UK)   │
│ userId (FK)         │
│ expires             │
└─────────────────────┘
```

**ER Diagram Notation:**

| Symbol | Meaning |
|--------|---------|
| PK | Primary Key |
| FK | Foreign Key |
| UK | Unique Constraint |
| 1 | One relationship |
| N | Many relationship |

**Relationships:**

| Relationship | Entity 1 | Entity 2 | Type |
|--------------|----------|----------|------|
| Owns | User | Task | 1:N |
| Has | User | StreakData | 1:1 |
| Tracks | StreakData | StreakHistory | 1:N |
| Configures | User | Preferences | 1:1 |
| Stores | User | AIFlowData | 1:N |
| Uses | User | Account | 1:N |
| Belongs | Session | User | N:1 |

---

## 6. Database Design

### 6.1 Database Overview

APERIFY uses **SQLite** for development and **PostgreSQL** for production, managed through **Prisma ORM**. This provides:
- Zero-configuration deployment for development
- Type-safe database access
- Automatic schema migrations
- Cross-platform compatibility
- Production-ready scalability

### 6.2 Schema Design

#### 6.2.1 User Model

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  avatar        String?
  mentalBandwidth Int     @default(100)
  focusScore    Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  tasks         Task[]
  streakData    StreakData?
  preferences   UserPreferences?
  aiFlowData    AIFlowData[]
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| email | String | Unique | User email for authentication |
| name | String | Nullable | Display name |
| password | String | Required | Bcrypt hashed password |
| avatar | String | Nullable | Profile picture URL |
| mentalBandwidth | Int | Default: 100 | AI-calculated cognitive capacity |
| focusScore | Int | Default: 0 | Overall productivity score (0-100) |
| createdAt | DateTime | Default: now() | Account creation timestamp |
| updatedAt | DateTime | Auto | Last update timestamp |

#### 6.2.2 Task Model

```prisma
model Task {
  id               String    @id @default(cuid())
  title            String
  description      String?
  priority         String    @default("medium")
  category         String    @default("Personal")
  deadline         DateTime?
  estimatedMinutes Int?
  completed        Boolean   @default(false)
  completedAt      DateTime?
  snoozedUntil     DateTime?
  flowTag          String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| title | String | Required | Task title |
| description | String | Nullable | Detailed task description |
| priority | String | Default: "medium" | low, medium, high, urgent |
| category | String | Default: "Personal" | Task category |
| deadline | DateTime | Nullable | Due date/time |
| estimatedMinutes | Int | Nullable | Time estimate |
| completed | Boolean | Default: false | Completion status |
| completedAt | DateTime | Nullable | Completion timestamp |
| snoozedUntil | DateTime | Nullable | Snooze until |
| flowTag | String | Nullable | deep-work, quick-win, admin, creative |
| createdAt | DateTime | Default: now() | Creation timestamp |
| updatedAt | DateTime | Auto | Last update timestamp |
| userId | String | FK, Required | Owner reference |

#### 6.2.3 StreakData Model

```prisma
model StreakData {
  id                String   @id @default(cuid())
  currentStreak     Int      @default(0)
  longestStreak     Int      @default(0)
  freezesAvailable  Int      @default(2)
  lastCompletedDate DateTime?

  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  history   StreakHistory[]
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| currentStreak | Int | Default: 0 | Current consecutive days |
| longestStreak | Int | Default: 0 | All-time best |
| freezesAvailable | Int | Default: 2 | Weekly freeze tokens |
| lastCompletedDate | DateTime | Nullable | Last task completion |
| userId | String | FK, Unique | Owner reference |

#### 6.2.4 StreakHistory Model

```prisma
model StreakHistory {
  id          String   @id @default(cuid())
  date        String
  completed   Int      @default(0)

  streakDataId String
  streakData   StreakData @relation(fields: [streakDataId], references: [id], onDelete: Cascade)

  @@unique([streakDataId, date])
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| date | String | Required | Date in YYYY-MM-DD format |
| completed | Int | Default: 0 | Tasks completed that day |
| streakDataId | String | FK | Parent streak reference |

#### 6.2.5 UserPreferences Model

```prisma
model UserPreferences {
  id              String  @id @default(cuid())
  soundEnabled    Boolean @default(true)
  hapticsEnabled  Boolean @default(true)
  aiCoachEnabled  Boolean @default(true)
  aiSensitivity   Int     @default(50)

  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| soundEnabled | Boolean | Default: true | Sound effects toggle |
| hapticsEnabled | Boolean | Default: true | Haptic feedback toggle |
| aiCoachEnabled | Boolean | Default: true | AI coach toggle |
| aiSensitivity | Int | Default: 50 | AI intervention sensitivity (0-100) |
| userId | String | FK, Unique | Owner reference |

#### 6.2.6 AIFlowData Model

```prisma
model AIFlowData {
  id               String   @id @default(cuid())
  date             String
  flowWindows      String   @default("[]")
  mentalBandwidth  Int      @default(100)
  productivityScore Float    @default(0.0)

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, date])
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| date | String | Required | Date in YYYY-MM-DD format |
| flowWindows | String | JSON array | Predicted optimal work periods |
| mentalBandwidth | Int | Default: 100 | Daily cognitive capacity |
| productivityScore | Float | Default: 0.0 | Calculated productivity (0.0-1.0) |
| userId | String | FK | Owner reference |

### 6.3 Database Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE RELATIONSHIPS                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│    USER     │──────────│   TASK      │          │ PREFERENCES │
└─────────────┘          └─────────────┘          └─────────────┘
       │                        │                        │
       │ 1                      │ N                      │ 1
       │                        │                        │
       ▼                        ▼                        │
┌─────────────┐          ┌─────────────┐                  │
│ STREAKDATA │          │   (Task     │                  │
└─────────────┘          │  operations)│                  │
       │                        │                        │
       │ 1                      │                        │
       │                        │                        │
       ▼                        │                        │
┌─────────────┐                 │                        │
│STREAKHISTORY│◄────────────────┘                        │
└─────────────┘                                           │
       │                                                  │
       │                                                  │
┌─────────────┐                                           │
│  AIFLOW    │◄──────────────────────────────────────────┘
│   DATA     │
└─────────────┘
```

### 6.4 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |
| GET | /api/tasks | Get all user tasks |
| POST | /api/tasks | Create new task (supports NLP parsing) |
| GET | /api/tasks/[id] | Get specific task |
| PATCH | /api/tasks/[id] | Update task |
| DELETE | /api/tasks/[id] | Delete task |
| GET | /api/user | Get user profile and streak |
| PATCH | /api/user | Update user preferences |
| POST | /api/coach | AI coach message (mental bandwidth, flow prediction) |

---

## 7. Screenshots

### 7.1 Application Screenshots

This section includes visual documentation of the APERIFY application interface.

#### 7.1.1 Login Page

**Description:** Modern authentication interface with gradient accents and smooth animations.

**Key Elements:**
- Centered login form with email and password fields
- Gradient violet-to-cyan submit button
- "Create account" link for new users
- Animated gradient orbs in background
- Toggle password visibility
- APERIFY logo with electric glow

#### 7.1.2 Registration Page

**Description:** Account creation interface with name, email, and password fields.

**Key Elements:**
- Clean form layout with icon-enhanced inputs
- Password strength indicator (6+ characters)
- Gradient submit button with loading state
- Terms of service acceptance text
- Link to existing account login
- Welcome message emphasizing "Aperitif of productivity"

#### 7.1.3 Focus Feed (Home)

**Description:** Main task feed with greeting, stats, and task cards.

**Key Elements:**
- Time-based greeting ("Good morning, [Name]")
- Quick stats row (streak flame, focus score)
- "Add Task" button with gradient styling
- Task cards with priority indicators and AI hints
- Bottom navigation bar (mobile)
- Swipe gesture hints on cards

#### 7.1.4 Task Card with "Juice" Celebration

**Description:** Individual task cards with swipe and completion animations.

**Key Elements:**
- Priority badge (low/medium/high/urgent) with color coding
- Task title and category emoji
- Deadline/time information
- AI hint chip ("Deep work recommended")
- Swipe gesture indicators
- Full "Juice" celebration on completion (particle burst, confetti, streak animation)

#### 7.1.5 Add Task Modal

**Description:** Modal overlay for creating new tasks with NLP support.

**Key Elements:**
- Title input field with smart parsing indicator
- Description textarea
- Priority selector (visual buttons)
- Category dropdown with emojis
- Deadline picker with AI suggestions
- Time estimate input
- Flow tag selector (deep-work, quick-win, admin, creative)
- Submit and cancel buttons with animations

#### 7.1.6 AI Coach Bubble

**Description:** Floating AI assistant with encouraging messages.

**Key Elements:**
- Chat bubble icon with pulse animation
- Slide-up animation from bottom-right
- Message text with typing effect
- Different message types with color coding:
  - Encouragement (emerald text)
  - Warning (amber text)
  - Celebration (violet text)
  - Procrastination intervention (cyan text)
- "Got it!" and "More tips" quick action buttons

#### 7.1.7 Schedule View

**Description:** Weekly calendar view with time-blocked tasks.

**Key Elements:**
- Week navigation (previous/next arrows)
- 7-day column grid with date numbers
- Today highlighted with violet glow
- Task indicators on days (green dots)
- Hourly timeline view with task blocks
- AI-suggested focus blocks highlighted
- Task color-coding by priority

#### 7.1.8 Stats Dashboard

**Description:** Comprehensive analytics and productivity metrics.

**Key Elements:**
- Stat cards grid (Tasks Completed, Current Streak, Longest Streak, Focus Score)
- Focus Score gauge with circular progress indicator
- Weekly productivity bar chart
- Category breakdown with progress bars
- Week-over-week comparison indicator
- Flow State score (if AI enabled)

#### 7.1.9 Profile Page

**Description:** User settings and achievements interface.

**Key Elements:**
- Profile avatar with initial gradient
- User name and email display
- Streak badge with flame animation
- Achievement badges grid (7/30/100/365 day milestones)
- Settings toggles (Notifications, Sound, Haptics, AI Coach)
- AI sensitivity slider
- Sign out button

#### 7.1.10 Celebration Overlay

**Description:** Full-screen celebration on milestone achievements.

**Key Elements:**
- Particle burst effect from center
- Confetti shower animation
- Large streak number animation
- AI Coach celebration message
- Milestone badge reveal
- "Juice" color palette (violet, cyan, emerald, amber)

### 7.2 Visual Design System

#### Color Implementation

```
Primary Background (Void):     #09090B
Surface Cards:                  #0F0F12
Elevated Elements:              #18181B
Violet Accent (Primary):        #8B5CF6
Cyan Accent (Secondary):        #06B6D4
Emerald (Success):             #10B981
Amber (Streaks/Warning):       #F59E0B
Rose (Error/Destructive):      #F43F5E
```

#### Component States

| Component | Default | Hover | Active | Disabled |
|-----------|---------|-------|--------|----------|
| Button | Violet bg, scale 1.0 | Scale 1.02, glow | Scale 0.98 | Opacity 0.5 |
| Task Card | Surface bg, border-subtle | Scale 1.02, border-glow | Scale 0.98 | Grayed out |
| Input | Elevated bg | Border violet | Border violet | Muted text |
| Streak Flame | Amber with flicker | Pulse animation | — | Dim gray |

---

## 8. Software Requirements Specification (SRS)

### 8.1 Introduction

#### 8.1.1 Purpose

This Software Requirements Specification (SRS) document provides a complete description of the APERIFY application. It defines the functional and non-functional requirements, user interface specifications, and system constraints that the development team must satisfy.

#### 8.1.2 Scope

APERIFY is a web-based Behavioral Intelligence Platform that includes:
- User authentication system
- Task management (CRUD operations with NLP support)
- AI-powered cognitive assistance (Mental Bandwidth, Flow-State prediction)
- "Juice" gamification elements (streaks, achievements, celebrations)
- Analytics and statistics dashboard with Focus Scores
- Responsive design for desktop and mobile

#### 8.1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| APERIFY | A Product that Engineers Focus — the application name |
| Focus Feed | The main task display interface featuring infinite-scroll cards |
| Juice | The celebration/ reward system for task completion |
| Flow State | A mental state of deep immersion and high productivity |
| Mental Bandwidth | AI-calculated cognitive capacity (0-100) |
| Flow-State Window | AI-predicted optimal work periods |
| DFD | Data Flow Diagram — system modeling technique |
| ER | Entity-Relationship — database modeling technique |
| SRS | Software Requirements Specification |
| NLP | Natural Language Processing |
| UI | User Interface |
| UX | User Experience |
| CRUD | Create, Read, Update, Delete operations |
| JWT | JSON Web Token — authentication standard |
| ORM | Object-Relational Mapping |
| API | Application Programming Interface |
| WCAG | Web Content Accessibility Guidelines |

### 8.2 General Description

#### 8.2.1 Product Perspective

APERIFY is a standalone web application operating in a client-server architecture. The frontend communicates with the backend via RESTful API endpoints. External services include:
- AI API (Anthropic Claude, Google Gemini, or Groq) for AI Coach and Flow-State prediction
- SQLite database for development persistence
- PostgreSQL-ready schema for production deployment

#### 8.2.2 User Classes and Characteristics

| User Class | Description | Primary Needs |
|------------|-------------|---------------|
| Individual User | General productivity seekers | Simple task management, engagement |
| Student | Academic-focused users | Deadline tracking, study habit development |
| Professional | Work-focused users | Project tasks, meeting preparation |
| Knowledge Worker | Deep work seekers | Flow state facilitation, cognitive load management |
| Power User | Advanced feature seekers | Statistics, detailed tracking, AI customization |

#### 8.2.3 Operating Environment

| Environment | Specification |
|------------|---------------|
| Browser Support | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Mobile OS | iOS 14+, Android 10+ |
| Server OS | Cross-platform (Node.js 18+) |
| Database | SQLite 3+ (dev), PostgreSQL 14+ (prod) |
| Node.js | Version 18.0 or higher |

#### 8.2.4 Design and Implementation Constraints

| Constraint | Description |
|------------|-------------|
| Framework | Next.js 14+ with App Router |
| Language | TypeScript 5.0+ |
| Styling | Tailwind CSS 3.4+ |
| Authentication | NextAuth.js 4.24+ |
| Database | Prisma ORM 5.22+ with SQLite/PostgreSQL |

### 8.3 Functional Requirements

#### 8.3.1 Authentication Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| AUTH-01 | User Registration | High | System shall allow new users to create accounts with email and password |
| AUTH-02 | User Login | High | System shall authenticate users with email and password credentials |
| AUTH-03 | User Logout | High | System shall terminate user session and redirect to login |
| AUTH-04 | Session Management | High | System shall maintain user sessions using JWT tokens |
| AUTH-05 | Password Security | High | System shall hash passwords using bcrypt before storage |
| AUTH-06 | Unique Email | High | System shall enforce unique email addresses per user |

#### 8.3.2 Task Management Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| TASK-01 | Create Task | High | System shall allow users to create tasks with title, description, priority, category, deadline |
| TASK-02 | NLP Task Parsing | Medium | System shall parse natural language input to extract task details automatically |
| TASK-03 | View Tasks | High | System shall display all incomplete tasks in the Focus Feed |
| TASK-04 | Complete Task | High | System shall mark tasks as completed and trigger "Juice" celebration effects |
| TASK-05 | Snooze Task | High | System shall allow users to snooze tasks for 1 hour, 1 day, or until tomorrow |
| TASK-06 | Delete Task | Medium | System shall allow users to permanently delete tasks |
| TASK-07 | Edit Task | Medium | System shall allow users to modify existing task details |
| TASK-08 | Task Priority | High | System shall support priority levels: low, medium, high, urgent |
| TASK-09 | Task Categories | Medium | System shall support task categorization with custom categories |
| TASK-10 | Task Deadlines | Medium | System shall support optional deadline dates/times |
| TASK-11 | AI Priority Sorting | High | System shall sort tasks by AI-determined priority and Flow-State alignment |
| TASK-12 | Flow Tags | Medium | System shall support flow tags: deep-work, quick-win, admin, creative |

#### 8.3.3 "Juice" Celebration Engine Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| JUICE-01 | Completion Animation | High | System shall play scale animation (1.1x) on task completion |
| JUICE-02 | Particle Burst | High | System shall emit particles (50-100) from completed task card |
| JUICE-03 | Confetti Effect | Medium | System shall trigger confetti shower (1-2 seconds) |
| JUICE-04 | Streak Animation | High | System shall animate streak counter increment with bounce |
| JUICE-05 | Sound Effects | Low | System shall play optional sound effects |
| JUICE-06 | Haptic Feedback | Low | System shall trigger device vibration on mobile |
| JUICE-07 | AI Coach Celebration | Medium | System shall display AI celebration message |
| JUICE-08 | Glow Pulse | Medium | System shall emit glow pulse from streak flame |

#### 8.3.4 Streak System Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| STREAK-01 | Track Streak | High | System shall track consecutive days of task completion |
| STREAK-02 | Display Streak | High | System shall display current streak prominently with flame icon |
| STREAK-03 | Update Streak | High | System shall increment streak when user completes task on consecutive days |
| STREAK-04 | Longest Streak | High | System shall maintain and display longest streak record |
| STREAK-05 | Streak Freeze | Medium | System shall allow users to use 2 freeze tokens per week |
| STREAK-06 | Milestone Celebration | Medium | System shall trigger special "Juice" at 7, 30, 100, 365 days |
| STREAK-07 | Streak History | Medium | System shall maintain daily completion history |

#### 8.3.5 AI Coach Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| COACH-01 | Time-based Messages | Medium | System shall send appropriate messages based on time of day |
| COACH-02 | Procrastination Detection | Medium | System shall detect when user hasn't interacted for extended period |
| COACH-03 | Encouragement | Medium | System shall provide positive reinforcement on task completion |
| COACH-04 | Tips and Tricks | Low | System shall occasionally share productivity tips |
| COACH-05 | Toggle Control | Medium | System shall allow users to enable/disable AI coach |
| COACH-06 | Mental Bandwidth | High | System shall calculate and track user's cognitive capacity |
| COACH-07 | Flow-State Prediction | High | System shall predict optimal work periods based on history |
| COACH-08 | Adaptive Rescheduling | Medium | System shall suggest rescheduling when Mental Bandwidth is low |

#### 8.3.6 Statistics Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| STATS-01 | Focus Score | High | System shall calculate and display daily focus score (0-100) |
| STATS-02 | Task Counter | Medium | System shall track total tasks completed |
| STATS-03 | Category Breakdown | Medium | System shall show task distribution by category |
| STATS-04 | Weekly Chart | Medium | System shall display weekly productivity graph |
| STATS-05 | Streak History | Medium | System shall maintain historical streak data |
| STATS-06 | Flow State Score | Medium | System shall calculate percentage of deep work time |
| STATS-07 | Week-over-Week | Low | System shall compare current week to previous week |

#### 8.3.7 User Preferences Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| PREF-01 | Sound Toggle | Low | System shall allow users to enable/disable sound effects |
| PREF-02 | Haptics Toggle | Low | System shall allow users to enable/disable haptic feedback |
| PREF-03 | AI Coach Toggle | Medium | System shall allow users to enable/disable AI coach |
| PREF-04 | AI Sensitivity | Low | System shall allow users to adjust AI intervention sensitivity |

### 8.4 User Interface Requirements

#### 8.4.1 Layout Structure

| Screen | Layout Elements |
|--------|----------------|
| Login/Register | Centered card, gradient background, logo, animated orbs |
| Focus Feed | TopBar, QuickStats, TaskFeed, BottomNav |
| Schedule | TopBar, week grid, timeline view, BottomNav |
| Stats | TopBar, stat cards, charts, BottomNav |
| Profile | TopBar, profile card, achievements, settings, BottomNav |

#### 8.4.2 Navigation

| Navigation Type | Platform | Elements |
|----------------|----------|----------|
| TopBar | All | Logo, Search, Streak Counter, Avatar |
| BottomNav | Mobile | Feed, Schedule, Stats, Profile tabs |
| Sidebar | Desktop | Expanded navigation (optional) |

#### 8.4.3 Responsive Breakpoints

| Breakpoint | Width | Layout Adaptation |
|------------|-------|-------------------|
| Mobile | <768px | BottomNav, full-width cards, touch gestures |
| Tablet | 768-1023px | Collapsed sidebar, full-width feed |
| Desktop | ≥1024px | Sidebar navigation, 2-column layouts |

### 8.5 Non-Functional Requirements

#### 8.5.1 Performance

| Metric | Target |
|--------|--------|
| Page Load Time | < 2 seconds |
| Time to Interactive | < 3 seconds |
| Animation Frame Rate | 60 FPS |
| API Response Time | < 500ms |
| "Juice" Animation | < 100ms latency |
| Concurrent Users | 100+ |

#### 8.5.2 Security

| Requirement | Implementation |
|-------------|----------------|
| Password Hashing | bcrypt with 12 salt rounds |
| Session Management | HTTP-only cookies, JWT |
| Input Validation | Server-side validation |
| SQL Injection Prevention | Prisma ORM parameterization |
| XSS Prevention | React default escaping |

#### 8.5.3 Accessibility

| Requirement | Standard |
|-------------|----------|
| Color Contrast | WCAG AA (4.5:1 text, 3:1 UI) |
| Keyboard Navigation | All interactive elements accessible |
| Screen Reader | Semantic HTML, ARIA labels |
| Focus Indicators | Visible focus rings |

#### 8.5.4 Reliability

| Metric | Target |
|--------|--------|
| Uptime | 99.5% |
| Error Rate | < 1% |
| Recovery Time | < 30 minutes |

### 8.6 Use Case Specifications

#### UC-01: User Registration

| Element | Description |
|---------|-------------|
| ID | UC-01 |
| Name | User Registration |
| Actor | Guest User |
| Precondition | User is not logged in |
| Basic Flow | 1. User navigates to registration page |
| | 2. User enters name, email, password |
| | 3. System validates email uniqueness |
| | 4. System hashes password |
| | 5. System creates user account with default preferences |
| | 6. System creates initial streak data |
| | 7. System logs user in |
| | 8. System redirects to Focus Feed |
| Alternative Flow | - Email already exists: Display error |
| | - Password too short: Display error |
| Postcondition | User is logged in with new account |

#### UC-02: Task Completion with "Juice"

| Element | Description |
|---------|-------------|
| ID | UC-02 |
| Name | Task Completion Celebration |
| Actor | Authenticated User |
| Precondition | User is logged in, has incomplete tasks |
| Basic Flow | 1. User views Focus Feed |
| | 2. User swipes task card right |
| | 3. System triggers "Juice" celebration: |
| |    - Card scales up (1.1x) + particle burst |
| |    - Confetti shower triggers |
| |    - Streak counter animates upward |
| | 4. System updates task status to completed |
| | 5. System updates streak data |
| | 6. System shows AI Coach celebration message |
| | 7. Card fades out with animation |
| | 8. Stats dashboard updates |
| Postcondition | Task marked complete, streak incremented, celebration played |

#### UC-03: AI Flow-State Prediction

| Element | Description |
|---------|-------------|
| ID | UC-03 |
| Name | AI Flow-State Window Prediction |
| Actor | AI System |
| Precondition | User has 7+ days of task completion data |
| Basic Flow | 1. System analyzes historical completion patterns |
| | 2. System identifies peak productivity hours |
| | 3. System calculates Mental Bandwidth factors |
| | 4. System generates Flow-State Windows |
| | 5. High-intensity tasks scheduled in optimal windows |
| | 6. User sees AI hints on task cards |
| | 7. User receives notification of Flow Window |
| Postcondition | Tasks optimally scheduled, user productivity improved |

### 8.7 Data Requirements

#### 8.7.1 Data Retention

| Data Type | Retention Period | Storage Location |
|-----------|-----------------|-----------------|
| User Account | Until user deletes | SQLite/PostgreSQL database |
| Tasks | Until user deletes | SQLite/PostgreSQL database |
| Streak History | 1 year rolling | SQLite/PostgreSQL database |
| AI Flow Data | 90 days rolling | SQLite/PostgreSQL database |
| Session Tokens | Duration of session | HTTP-only cookies |
| Preferences | Until user modifies | SQLite/PostgreSQL database |

#### 8.7.2 Data Export

System shall support data export in JSON format for user data portability.

---

## 9. Testing

### 9.1 Testing Strategy

#### 9.1.1 Testing Philosophy

APERIFY follows a comprehensive testing strategy that ensures:
- **Reliability**: Users can trust the application to work correctly
- **Security**: User data and authentication are properly protected
- **Performance**: Application meets responsiveness requirements including "Juice" animations
- **Maintainability**: Code changes don't introduce regressions

#### 9.1.2 Testing Pyramid

```
                    ┌─────────────┐
                    │     E2E     │  ← Few, slow, high confidence
                    │   Testing   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────┴─────┐ ┌────┴────┐ ┌────┴────┐
        │Integration│ │  Unit   │ │   UI    │
        │  Testing  │ │ Testing │ │ Testing │
        └───────────┘ └─────────┘ └─────────┘
           Many          Most        Moderate
           Medium        Fast         Slow
```

### 9.2 Unit Testing

#### 9.2.1 Test Coverage Areas

| Module | Components Tested |
|--------|------------------|
| Task Store | addTask, completeTask, snoozeTask, deleteTask, fetchTasks |
| Authentication | Password hashing, JWT validation |
| AI Coach | Message generation, Mental Bandwidth calculation, Flow-State prediction |
| Streak Logic | Streak calculation, freeze tokens, milestone detection |
| "Juice" Engine | Particle burst trigger, confetti timing, animation sequences |
| Utilities | Date formatting, ID generation, NLP parsing |

#### 9.2.2 Sample Test Cases

**Test Case: completeTask Function with "Juice"**

| Field | Value |
|-------|-------|
| Test ID | TC-001 |
| Module | Task Store |
| Input | Valid taskId string |
| Expected | Task marked complete, celebration triggered |
| Validation | Optimistic update, API call, celebration state updated |

**Test Case: Streak Calculation**

| Field | Value |
|-------|-------|
| Test ID | TC-015 |
| Module | Streak System |
| Input | Task completed on consecutive days |
| Expected | Streak increments by 1 |
| Validation | CurrentStreak = PreviousStreak + 1 |

**Test Case: Mental Bandwidth Calculation**

| Field | Value |
|-------|-------|
| Test ID | TC-025 |
| Module | AI Intelligence |
| Input | User completion patterns, time of day, recent breaks |
| Expected | Mental Bandwidth score (0-100) calculated |
| Validation | Score reflects actual cognitive capacity |

### 9.3 Integration Testing

#### 9.3.1 API Endpoint Testing

| Endpoint | Test Scenarios |
|----------|---------------|
| POST /api/auth/register | Valid registration, duplicate email, invalid password |
| POST /api/auth/login | Valid credentials, invalid credentials |
| GET /api/tasks | Authenticated fetch, unauthenticated fetch |
| POST /api/tasks | Valid task, NLP parsing, missing required fields |
| PATCH /api/tasks/[id] | Valid update, task not found |
| DELETE /api/tasks/[id] | Valid delete, task not found |
| POST /api/coach | Mental bandwidth request, flow prediction request |

#### 9.3.2 Database Integration

| Test | Description |
|------|-------------|
| User Creation | Verify user saved to database with hashed password |
| Task Operations | Verify task CRUD operations persist correctly |
| Streak Updates | Verify streak data updates atomically |
| Cascade Delete | Verify related records deleted when user deleted |
| AI Data Persistence | Verify flow data stored and retrieved correctly |

### 9.4 End-to-End Testing

#### 9.4.1 Critical User Flows

| Flow ID | Flow Name | Steps |
|---------|-----------|-------|
| E2E-01 | User Registration | Navigate to register → Fill form → Submit → Verify home page |
| E2E-02 | Task Lifecycle with "Juice" | Add task → View in feed → Swipe complete → Verify celebration, streak update |
| E2E-03 | Snooze Flow | View task → Swipe left → Select duration → Verify card removed, reappears later |
| E2E-04 | AI Flow Prediction | Complete tasks for 7 days → View schedule → Verify AI suggestions |
| E2E-05 | Stats Update | Complete tasks → Navigate to stats → Verify count updated |

#### 9.4.2 E2E Test Tools

| Tool | Purpose |
|------|---------|
| Playwright | Browser automation |
| Cypress | E2E testing framework |
| Jest | Test runner |

### 9.5 UI/UX Testing

#### 9.5.1 Visual Regression Testing

| Checkpoint | Validation |
|------------|------------|
| Component Rendering | All components render without errors |
| Responsive Layout | UI adapts correctly at all breakpoints |
| Animation Smoothness | "Juice" animations run at 60 FPS |
| Theme Consistency | Colors and styles match design system |
| Particle Effects | Confetti and particle burst render correctly |

#### 9.5.2 Cross-Browser Testing

| Browser | Version | Critical Checks |
|---------|---------|----------------|
| Chrome | 90+ | Full functionality, hardware acceleration for animations |
| Firefox | 88+ | Full functionality |
| Safari | 14+ | Full functionality |
| Edge | 90+ | Full functionality |

### 9.6 Security Testing

#### 9.6.1 Security Test Cases

| Test | Description | Expected Result |
|------|-------------|-----------------|
| SQL Injection | Input ' OR 1=1 -- in task title | Query fails or sanitized |
| XSS | Input <script>alert(1)</script> | Script not executed |
| CSRF | Cross-origin request with session cookie | Request rejected |
| Password Storage | Verify password not stored in plaintext | Password hashed with bcrypt |
| Session Security | Check session token handling | HTTP-only, secure cookies |
| JWT Validation | Tamper with JWT token | Request rejected |

### 9.7 Performance Testing

#### 9.7.1 Performance Benchmarks

| Metric | Target | Test Method |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.5s | Lighthouse |
| "Juice" Animation Latency | < 100ms | Performance monitor |
| API Response (avg) | < 200ms | API profiling |
| Animation Frame Rate | 60 FPS | Performance monitor |

#### 9.7.2 Load Testing

| Scenario | Concurrent Users | Expected Response |
|----------|-----------------|------------------|
| Page Load | 100 | < 2s average |
| Task Creation | 50 | < 500ms average |
| "Juice" Celebration | 50 | < 100ms animation start |
| AI Coach Message | 30 | < 1s response |

### 9.8 Test Execution

#### 9.8.1 Test Commands

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

#### 9.8.2 Continuous Integration

Tests run automatically on:
- Every pull request
- Every push to main branch
- Scheduled daily run

---

## 10. References

### 10.1 Technical Documentation

| Resource | URL | Description |
|----------|-----|-------------|
| Next.js Documentation | https://nextjs.org/docs | Framework documentation |
| React Documentation | https://react.dev | UI library documentation |
| Tailwind CSS Docs | https://tailwindcss.com/docs | Styling framework |
| Framer Motion Docs | https://www.framer.com/motion/ | Animation library |
| Prisma Documentation | https://prisma.io/docs | Database ORM |
| Zustand Docs | https://docs.pmnd.rs/zustand | State management |
| NextAuth.js Docs | https://next-auth.js.org | Authentication |

### 10.2 External APIs

| API | Documentation | Purpose |
|-----|---------------|---------|
| Anthropic Claude | https://anthropic.com/claude | AI Coach integration |
| Google Gemini | https://ai.google.dev | AI Coach, Flow-State prediction |
| Groq | https://console.groq.com | AI Coach alternative |

### 10.3 Design Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| Lucide Icons | https://lucide.dev | Icon library |
| Inter Font | https://fonts.google.com/specimen/Inter | Primary typography |
| Space Grotesk | https://fonts.google.com/specimen/Space+Grotesk | Display typography |
| JetBrains Mono | https://fonts.google.com/specimen/JetBrains+Mono | Monospace typography |

### 10.4 Industry Research

1. **Productivity App Market Statistics**
   - Source: Grand View Research, "Productivity Software Market Size Report"
   - URL: https://www.grandviewresearch.com

2. **User Retention Research**
   - "Why 90% of Users Abandon Productivity Apps"
   - Source: App Fidelius Retention Report

3. **Gamification in Productivity**
   - Yu-Kai Chou's Octalysis Framework
   - Source: "Actionable Gamification"

4. **Behavioral Psychology**
   - BJ Fogg's Behavior Model (Fogg Behavior Grid)
   - Dopamine and reward systems research
   - Flow State research (Mihaly Csikszentmihalyi)

5. **ChronosAI (Previous Version)**
   - Project that evolved into APERIFY
   - Focus on time tracking and scheduling

### 10.5 Development Tools

| Tool | Purpose |
|------|---------|
| Visual Studio Code | Code editor |
| Git | Version control |
| GitHub | Repository hosting |
| Figma | UI/UX design |
| Insomnia | API testing |
| Prisma Studio | Database management |

### 10.6 Project Files

| File | Location | Description |
|------|----------|-------------|
| Specification | SPEC.md | Product specification document |
| Source Code | /app, /components, /hooks, /lib | Application source |
| Database Schema | prisma/schema.prisma | Database design |
| Package Config | package.json | Dependencies |
| TypeScript Types | types/index.ts | Type definitions |

---

## Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| CUID | Collision-resistant Unique Identifier used by Prisma |
| Dopamine Engineering | Designing experiences to trigger neurological reward responses |
| Flow State | A mental state of deep immersion and high productivity |
| Flow-State Window | AI-predicted optimal time periods for deep work |
| Juice | APERIFY's signature celebration/reward system for task completion |
| Mental Bandwidth | AI-calculated cognitive capacity (0-100 scale) |
| NLP | Natural Language Processing for parsing task input |
| Optimistic Update | UI update before server confirmation for responsive feel |
| Streak Freeze | Token to maintain streak without daily activity |

### Appendix B: Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| API | Application Programming Interface |
| DFD | Data Flow Diagram |
| ER | Entity-Relationship |
| JWT | JSON Web Token |
| NLP | Natural Language Processing |
| ORM | Object-Relational Mapping |
| SRS | Software Requirements Specification |
| UI | User Interface |
| UX | User Experience |
| WCAG | Web Content Accessibility Guidelines |

### Appendix C: Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Team] | Initial version — APERIFY MVP |

---

*This synopsis was prepared for academic evaluation purposes.*

*APERIFY: The Aperitif of Productivity — Engineered Flow States for the Modern Knowledge Worker*

*Evolution from ChronosAI (time tracking) → APERIFY (behavioral intelligence, dopamine engineering)*

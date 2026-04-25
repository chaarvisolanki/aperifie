# APERIFY - Product Synopsis

## A Dopamine-Driven Productivity Platform for Engineering Focus States

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

**APERIFY** is a next-generation productivity platform that transforms task management from a mundane chore into an addictive, dopamine-driven experience. Unlike traditional productivity tools that merely track time or document tasks, APERIFY engineers focus states using principles from behavioral psychology and gamification to create what can be described as "Instagram Reels for productivity."

The platform operates on a radical premise: productivity is not a logistics problem, but a behavioral problem. By leveraging carefully designed reward systems, real-time AI coaching, and engaging visual feedback loops, APERIFY creates an experience that users genuinely want to return to—turning the act of completing tasks into a neurological reward cascade that reinforces positive behavior.

### 1.2 Purpose of the Project

The purpose of this project is to develop a comprehensive productivity application that:

1. **Enhances User Engagement**: Transforms traditional task management into an engaging, game-like experience that encourages consistent usage
2. **Promotes Behavioral Change**: Uses psychological principles to build positive productivity habits through streak systems and celebration mechanics
3. **Provides Intelligent Assistance**: Employs AI coaching to detect procrastination patterns and deliver real-time behavioral interventions
4. **Delivers Actionable Insights**: Offers detailed analytics and focus scoring to help users understand and improve their productivity patterns
5. **Ensures Accessibility**: Provides a cross-platform experience that works seamlessly on desktop and mobile devices

### 1.3 Scope of the Project

APERIFY encompasses the following functional domains:

- **Task Management**: Create, complete, snooze, and organize tasks with AI-optimized prioritization
- **Streak System**: Gamified daily streak tracking with milestone celebrations and freeze tokens
- **AI Coach**: Real-time behavioral coaching with encouragement, tips, and procrastination intervention
- **Celebration Engine**: Visual and audio feedback system for task completion and achievements
- **Analytics Dashboard**: Comprehensive productivity metrics including focus scores, category breakdowns, and trend analysis
- **User Authentication**: Secure account management with NextAuth.js integration
- **Responsive Design**: Adaptive interface for desktop and mobile platforms

### 1.4 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend Framework | Next.js (App Router) | 14.2.26 |
| UI Library | React | 18.3.0 |
| Styling | Tailwind CSS | 3.4.3 |
| Animation | Framer Motion | 11.0.0 |
| State Management | Zustand | 4.5.0 |
| Icons | Lucide React | 0.400.0 |
| Database ORM | Prisma | 5.22.0 |
| Database | SQLite | - |
| Authentication | NextAuth.js | 4.24.5 |
| AI Integration | Anthropic SDK / Groq SDK | 0.91.0 / 1.1.2 |
| Password Hashing | bcryptjs | 3.0.3 |
| Confetti Effects | canvas-confetti | 1.9.0 |
| Language | TypeScript | 5.4.0 |

### 1.5 Document Organization

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

The development team acknowledges the guidance and support of faculty members, peers, and the open-source community whose libraries and frameworks have made this project possible.

---

## 3. Problem Statement

### 3.1 Background and Context

The global productivity app market is worth approximately $15 billion, with millions of users downloading task management applications each year. However, despite this massive market and apparent demand, industry research reveals a troubling pattern: **90% of users abandon productivity tools within 30 days of installation**.

This abandonment rate represents a fundamental failure in how traditional productivity applications approach user engagement. The root cause lies not in the functionality of these applications—which often excel at organizing tasks—but in their failure to address the psychological machinery that drives human behavior.

### 3.2 The Core Problem

Traditional task managers suffer from three critical flaws:

#### 3.2.1 Lack of Reward Architecture

Checking off a task on a static checklist triggers no significant neurological reward. Traditional productivity apps document work without making work feel rewarding. The act of completion exists in a cognitive vacuum—users complete tasks but don't experience the satisfaction that would reinforce the behavior.

#### 3.2.2 Anxiety-Driven Design

Many productivity applications inadvertently create anxiety rather than motivation. Staring at a calendar filled with deadlines and obligations activates stress responses rather than engagement. The visual design often emphasizes what users haven't done rather than celebrating what they have accomplished.

#### 3.2.3 One-Dimensional Engagement

Most productivity apps optimize for organization but ignore the multi-dimensional nature of human motivation. They don't account for social factors, gamification elements, or the power of visual and audio feedback in creating memorable experiences.

### 3.3 Existing Solutions and Their Limitations

| Application | Strengths | Limitations |
|-------------|----------|-------------|
| Todoist | Clean interface, cross-platform | No gamification, basic reward feedback |
| Habitica | Strong gamification, social features | Complex UX, overwhelming for new users |
| Forest | Creative concept, focus mode | Limited task management, gamification tied to app |
| Notion | Highly customizable | Steep learning curve, no built-in productivity focus |
| TickTick | Feature-rich | Dated interface, complex for simple tasks |

None of the existing solutions successfully combines:
- Intuitive task management
- Psychology-driven reward architecture
- AI-powered behavioral coaching
- Engaging visual design
- Cross-platform accessibility

### 3.4 Proposed Solution

APERIFY addresses these limitations through a comprehensive approach that:

1. **Implements Dopamine-Driven Design**: Every interaction—swiping a task card, completing a task, achieving a milestone—is designed to trigger neurological reward cascades through carefully crafted animations, sounds, and visual feedback.

2. **Leverages AI for Behavioral Intervention**: Rather than simply scheduling tasks, APERIFY's AI Coach provides real-time encouragement, detects procrastination patterns, and delivers precisely-timed nudges.

3. **Creates Addictive Engagement Loops**: The Focus Feed concept mirrors the infinite scroll of social media, but channels that engagement mechanism toward productive outcomes.

4. **Builds Sustainable Habits**: The streak system, achievement badges, and milestone celebrations create tangible goals that encourage consistent usage and habit formation.

### 3.5 Project Objectives

The primary objectives of the APERIFY project are:

| Objective | Description | Success Metric |
|-----------|-------------|----------------|
| Engagement | Create an addictive user experience | 3x better 30-day retention vs industry benchmark |
| Habit Formation | Build sustainable productivity habits | Users maintain streaks averaging 14+ days |
| Task Completion | Increase task completion rates | 40% improvement over traditional apps |
| User Satisfaction | Deliver a premium, polished experience | NPS score of 50+ |
| Accessibility | Provide seamless cross-platform experience | 95% feature parity across devices |

### 3.6 Stakeholders

| Stakeholder | Needs and Expectations |
|------------|----------------------|
| Individual Users | Intuitive task management, engaging experience, productivity improvement |
| Students | Academic task organization, study habit development, deadline tracking |
| Professionals | Focus optimization, meeting preparation, project task management |
| Organizations | Team productivity insights, shared streaks, collaborative features (future) |

---

## 4. Project Description

### 4.1 Core Concept

APERIFY is a **behavioral optimization platform** that engineers focus states rather than merely tracking time. The platform transforms the mundane act of task management into an experience users want to open repeatedly—applying the same psychological hooks that make social media addictive, but channeling them toward productive outcomes.

### 4.2 Key Differentiators

| Feature | Traditional Apps | APERIFY |
|---------|-----------------|---------|
| Task Display | Static lists, calendars | Swipeable, infinite-scroll Focus Feed |
| Completion Feedback | Checkbox toggle | Scale animation + particle burst + confetti |
| AI Integration | None or basic reminders | Real-time behavioral coaching |
| Streak System | Basic counter | Animated flame + milestone celebrations |
| User Motivation | Self-driven | Dopamine-driven reward architecture |
| Design Philosophy | Utility-focused | Premium, gaming-inspired aesthetics |

### 4.3 Feature Description

#### 4.3.1 Focus Feed

The **Focus Feed** is the heart of APERIFY's user experience. Unlike traditional task lists, the Focus Feed presents tasks as individual cards in a vertically scrolling, infinitely-loading feed—reminiscent of social media content streams.

**Key Characteristics:**
- Vertical scrolling feed of task cards
- Cards sorted by AI-determined priority and urgency
- Infinite scroll with skeleton loading states
- Pull-to-refresh on mobile devices
- Smooth staggered animations when cards appear

**Task Card Interactions:**
- **Swipe Right**: Complete task with celebration effect
- **Swipe Left**: Snooze task (options: 1 hour, 1 day, tomorrow)
- **Tap**: Expand details modal with full task information
- **Long Press**: Quick actions menu (edit, delete, change priority)

#### 4.3.2 Streak System

The streak system is APERIFY's primary gamification element, designed to build consistent daily engagement.

**Components:**
- **Current Streak**: Days of consecutive task completion
- **Longest Streak**: Historical best achievement
- **Streak Flame**: Animated flame icon displaying current streak
- **Streak Freezes**: 2 tokens per week to maintain streak during breaks
- **Milestone Celebrations**: Special effects at 7, 30, 100, and 365 days

**Behavioral Psychology Basis:**
Streaks leverage the "endowment effect"—people value things more highly once they own them. A streak becomes a digital asset users are reluctant to lose, creating powerful motivation for daily engagement.

#### 4.3.3 AI Coach

The **AI Coach** provides real-time behavioral intervention through a floating chat interface.

**Functional Capabilities:**
- Time-of-day motivation (morning energy, afternoon push, evening wind-down)
- Procrastination detection (triggers when no interaction for configurable duration)
- Task completion rate tracking and encouragement
- Upcoming deadline pressure notifications
- Personalized tips based on productivity patterns

**Personality Traits:**
- Encouraging and supportive
- Slightly playful and witty
- Never guilt-tripping or shaming
- Motivating without being aggressive

**Sample Messages:**
- "Good morning! Your focus energy is high today. Try tackling that big task before noon!"
- "You've been stuck on the same task for 45 minutes. Take a 5-minute break—you've got this!"
- "Only 2 tasks left! Imagine how satisfying that final completion will feel."

#### 4.3.4 Celebration Engine

The **Celebration Engine** transforms task completion into a rewarding, memorable event.

**Visual Effects:**
- Card scales up (1.1x) and fades out smoothly
- Particle burst from card center (50-100 particles)
- Confetti shower (subtle, 1-2 seconds duration)
- Streak counter animates upward
- Glow effects on UI elements

**Additional Feedback:**
- Sound effects (toggleable)
- Haptic feedback on mobile devices
- AI Coach celebration messages

**Animation Philosophy:**
Every animation communicates progress, success, or state change. Motion is not decoration—it's reward architecture designed to trigger positive emotional responses.

#### 4.3.5 Schedule View

The **Schedule View** provides a calendar-based overview of tasks.

**Features:**
- Weekly calendar with time blocks
- Tasks color-coded by priority and category
- AI-suggested focus blocks highlighted
- Week navigation (previous/next)
- Timeline view showing hourly task distribution

#### 4.3.6 Stats Dashboard

The **Stats Dashboard** provides comprehensive productivity analytics.

**Metrics Tracked:**
- **Focus Score (0-100)**: Daily calculated productivity metric
- **Tasks Completed**: Total and category breakdown
- **Current Streak**: Daily engagement indicator
- **Weekly Productivity Graph**: Historical performance visualization
- **Category Breakdown**: Pie/bar chart of task distribution
- **Week-over-Week Comparison**: Progress tracking

#### 4.3.7 User Profile

The **Profile Page** contains user settings and achievement tracking.

**Components:**
- Profile card with avatar and streak display
- Stats row (current streak, best streak, focus score)
- Achievement badges (7-day, 30-day, 100-day streak milestones)
- Preference toggles (notifications, sound, haptics, AI coach)
- Sign out functionality

### 4.4 User Interface Design

#### 4.4.1 Design Philosophy: "Neon-Dark Premium"

APERIFY's visual design draws inspiration from:
- Premium gaming interfaces (Discord, Linear, Raycast)
- Dopamine architecture of TikTok/Instagram
- Modern dark mode aesthetics

Every interaction feels premium and rewarding, with careful attention to:
- Smooth transitions and animations
- Satisfying micro-interactions
- Consistent visual language
- Accessible contrast ratios

#### 4.4.2 Color Palette

| Purpose | Color | Hex Code |
|---------|-------|----------|
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
| Mobile | <768px | Bottom navigation, full-width cards |
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
```

#### 4.5.2 Task Completion Flow

```
View Focus Feed → See Task Card → Swipe Right to Complete
    ↓
Celebration Animation Triggers → Streak Updated → Card Fades Out
    ↓
AI Coach Celebrates → Stats Dashboard Updates
```

#### 4.5.3 Snooze Task Flow

```
View Focus Feed → See Task Card → Swipe Left
    ↓
Snooze Options Appear → Select Duration (1h / 1d / Tomorrow)
    ↓
Card Slides Left → Rescheduled → Returns at Specified Time
```

### 4.6 Data Handling

#### 4.6.1 Local Storage
- Session tokens stored securely
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
| Procrastination Detected | Gentle AI nudge (not aggressive) |
| Streak About to Break | Special encouragement message |
| Milestone Achieved | Special celebration animation + badge |

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
│  │     │              TASK MANAGEMENT MODULE                      │     │    │
│  │     │  • Create, Read, Update, Delete tasks                  │     │    │
│  │     │  • Task completion and snooze                           │     │    │
│  │     │  • Priority and category management                     │     │    │
│  │     └────────────────────────────────────────────────────────┘     │    │
│  │                              │                                        │    │
│  │     ┌───────────────────────┼───────────────────────────┐           │    │
│  │     │                       │                           │           │    │
│  │     ▼                       ▼                           ▼           │    │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐     │    │
│  │  │   AI COACH   │    │ STREAK SYSTEM│    │ CELEBRATION      │     │    │
│  │  │   MODULE     │    │    MODULE    │    │    MODULE        │     │    │
│  │  └──────────────┘    └──────────────┘    └──────────────────┘     │    │
│  │           │                   │                    │                │    │
│  │           └───────────────────┼────────────────────┘                │    │
│  │                               ▼                                     │    │
│  │                    ┌──────────────────┐                            │    │
│  │                    │  USER STATS &    │                            │    │
│  │                    │  ANALYTICS       │                            │    │
│  │                    └──────────────────┘                            │    │
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
    │  (Browser) │      │  (SQLite)   │     │ (Anthropic)│
    └────────────┘      └────────────┘     └────────────┘
```

**External Entities:**

| Entity | Description | Data Flows |
|--------|-------------|------------|
| User | End user interacting via browser/mobile | Tasks, Preferences, Auth credentials |
| Database | SQLite database via Prisma ORM | User data, Tasks, Streak data |
| AI API | External AI service (Claude/Groq) | Coach messages, Encouragement |

**Data Flows:**

| Flow ID | Description |
|---------|-------------|
| D1 | User authentication (login/register/logout) |
| D2 | Task CRUD operations |
| D3 | Streak updates on task completion |
| D4 | AI Coach messages to user |
| D5 | Celebration triggers |
| D6 | Stats/analytics to user |
| D7 | User preferences updates |
| D8 | AI API responses (messages) |

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
    │ │   │                  STATS & ANALYTICS                       │     │
    │ │   │  • Focus Score Calculation    • Streak History          │     │
    │ │   │  • Category Breakdown         • Productivity Trends      │     │
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
| P4 | AI Coach Module | AI-powered behavioral coaching | Detect patterns, Generate encouragement, Send nudges |
| P5 | Database | Persistent storage layer | Store/retrieve users, tasks, streaks, preferences |
| P6 | Stats & Analytics | Productivity metrics calculation | Calculate focus score, Generate streak history, Category analysis |
| P7 | Output Generator | Response formatting for UI | Format JSON responses, Aggregate data |

**Data Stores:**

| Data Store | Description | Records |
|------------|-------------|---------|
| D1-USERS | Registered user accounts | User credentials, profile info |
| D2-TASKS | User's task collection | Task details, status, timestamps |
| D3-STREAKS | Streak tracking data | Current streak, longest streak, history |
| D4-PREFERENCES | User settings | Sound, haptics, AI coach toggles |

### 5.3 Entity-Relationship (ER) Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           ER DIAGRAM                                        │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐         ┌─────────────────────┐
│       USER          │         │       TASK         │
├─────────────────────┤         ├─────────────────────┤
│ id (PK)             │1       N│ id (PK)             │
│ email (UK)          ├─────────┤ title               │
│ name                │         │ description         │
│ password            │         │ priority             │
│ avatar              │         │ category            │
│ createdAt           │         │ deadline             │
│ updatedAt           │         │ estimatedMinutes    │
└─────────┬───────────┘         │ completed           │
          │                     │ completedAt         │
          │                     │ snoozedUntil        │
          │                     │ flowTag             │
          │                     │ createdAt            │
          │                     │ updatedAt           │
          │                     └─────────┬───────────┘
          │                               │
          │                               │
          │ 1                    ┌─────────┴───────────┐
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
│  PREFERENCES        │
├─────────────────────┤
│ id (PK)             │
│ soundEnabled        │
│ hapticsEnabled      │
│ aiCoachEnabled      │
│ userId (FK, UK)     │
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
│ token_type          │
│ scope               │
│ id_token            │
│ session_state       │
└─────────────────────┘

┌─────────────────────┐
│      SESSION       │
├─────────────────────┤
│ id (PK)             │
│ sessionToken (UK)   │
│ userId (FK)         │
│ expires             │
└─────────────────────┘

┌─────────────────────┐
│  VERIFICATIONTOKEN │
├─────────────────────┤
│ identifier          │
│ token (PK)          │
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
| Uses | User | Account | 1:N |
| Belongs | Session | User | N:1 |
| Verifies | VerificationToken | User | N:1 |

---

## 6. Database Design

### 6.1 Database Overview

APERIFY uses **SQLite** as its database, managed through **Prisma ORM**. This combination provides:
- Zero-configuration deployment
- Type-safe database access
- Automatic schema migrations
- Cross-platform compatibility

### 6.2 Schema Design

#### 6.2.1 User Model

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  avatar        String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  tasks         Task[]
  streakData    StreakData?
  preferences   UserPreferences?
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| email | String | Unique | User email for authentication |
| name | String | Nullable | Display name |
| password | String | Required | Bcrypt hashed password |
| avatar | String | Nullable | Profile picture URL |
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
| userId | String | FK, Unique | Owner reference |

### 6.3 Database Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE RELATIONSHIPS                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│    USER     │──────────│   TASK      │          │  PREFERENCES│
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
                                                          │
┌─────────────┐                                           │
│  SESSION    │◄──────────────────────────────────────────┘
└─────────────┘
```

### 6.4 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |
| GET | /api/tasks | Get all user tasks |
| POST | /api/tasks | Create new task |
| GET | /api/tasks/[id] | Get specific task |
| PATCH | /api/tasks/[id] | Update task |
| DELETE | /api/tasks/[id] | Delete task |
| GET | /api/user | Get user profile and streak |
| PATCH | /api/user | Update user preferences |
| POST | /api/coach | AI coach message |

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

#### 7.1.2 Registration Page

**Description:** Account creation interface with name, email, and password fields.

**Key Elements:**
- Clean form layout with icon-enhanced inputs
- Password strength indicator (6+ characters)
- Gradient submit button with loading state
- Terms of service acceptance text
- Link to existing account login

#### 7.1.3 Focus Feed (Home)

**Description:** Main task feed with greeting, stats, and task cards.

**Key Elements:**
- Time-based greeting ("Good morning, [Name]")
- Quick stats row (streak, focus score)
- "Add Task" button
- Task cards with priority indicators
- Bottom navigation bar

#### 7.1.4 Task Card Interactions

**Description:** Individual task cards with swipe and completion animations.

**Key Elements:**
- Priority badge (low/medium/high/urgent)
- Task title and category
- Deadline/time information
- AI hint chip
- Swipe gesture indicators
- Completion celebration animation

#### 7.1.5 Add Task Modal

**Description:** Modal overlay for creating new tasks.

**Key Elements:**
- Title input field
- Description textarea
- Priority selector
- Category dropdown
- Deadline picker
- Time estimate input
- Flow tag selector
- Submit and cancel buttons

#### 7.1.6 Schedule View

**Description:** Weekly calendar view with time-blocked tasks.

**Key Elements:**
- Week navigation (previous/next)
- 7-day column grid
- Today highlighted
- Task indicators on days
- Hourly timeline view
- Task color-coding by priority

#### 7.1.7 Stats Dashboard

**Description:** Comprehensive analytics and productivity metrics.

**Key Elements:**
- Stat cards grid (4 metrics)
- Focus score gauge
- Productivity trend chart
- Category breakdown with progress bars
- Week-over-week comparison

#### 7.1.8 Profile Page

**Description:** User settings and achievements interface.

**Key Elements:**
- Profile avatar with initial
- User name and email
- Streak badge
- Achievement badges (7/30/100 day)
- Settings toggles
- Sign out button

#### 7.1.9 AI Coach Bubble

**Description:** Floating AI assistant with encouraging messages.

**Key Elements:**
- Chat bubble icon
- Slide-up animation
- Message text with typing effect
- Different message types (encouragement, tip, warning)

#### 7.1.10 Celebration Overlay

**Description:** Full-screen celebration on task completion.

**Key Elements:**
- Particle burst effect
- Confetti animation
- Streak increment animation
- AI celebration message

### 7.2 Visual Design System

#### Color Implementation

```
Primary Background (Void):     #09090B
Surface Cards:                  #0F0F12
Elevated Elements:              #18181B
Violet Accent (Primary):        #8B5CF6
Cyan Accent (Secondary):        #06B6D4
Emerald (Success):             #10B981
Amber (Streaks/Warning):        #F59E0B
Rose (Error/Destructive):       #F43F5E
```

#### Component States

| Component | Default | Hover | Active | Disabled |
|-----------|---------|-------|--------|----------|
| Button | Violet bg | Scale 1.02 | Scale 0.98 | Opacity 0.5 |
| Task Card | Surface bg | Scale 1.02, glow | Scale 0.98 | Grayed out |
| Input | Elevated bg | Border focus | Border violet | Muted text |

---

## 8. Software Requirements Specification (SRS)

### 8.1 Introduction

#### 8.1.1 Purpose

This Software Requirements Specification (SRS) document provides a complete description of the APERIFY application. It defines the functional and non-functional requirements, user interface specifications, and system constraints that the development team must satisfy.

#### 8.1.2 Scope

APERIFY is a web-based productivity application that transforms task management into an engaging, dopamine-driven experience. The application includes:
- User authentication system
- Task management (CRUD operations)
- AI-powered coaching assistant
- Gamification elements (streaks, achievements)
- Analytics and statistics dashboard
- Responsive design for desktop and mobile

#### 8.1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| APERIFY | A Product that Engineers Focus - the application name |
| Focus Feed | The main task display interface featuring infinite-scroll cards |
| DFD | Data Flow Diagram - system modeling technique |
| ER | Entity-Relationship - database modeling technique |
| SRS | Software Requirements Specification |
| UI | User Interface |
| UX | User Experience |
| CRUD | Create, Read, Update, Delete operations |
| JWT | JSON Web Token - authentication standard |
| ORM | Object-Relational Mapping |
| API | Application Programming Interface |
| CTA | Call To Action |
| NPS | Net Promoter Score |

### 8.2 General Description

#### 8.2.1 Product Perspective

APERIFY is a standalone web application that operates in a client-server architecture. The frontend communicates with the backend via RESTful API endpoints. External services include:
- AI API (Anthropic Claude or Groq) for the AI Coach feature
- SQLite database for persistent storage

#### 8.2.2 User Classes and Characteristics

| User Class | Description | Primary Needs |
|------------|-------------|---------------|
| Individual User | General productivity seekers | Simple task management, engagement |
| Student | Academic-focused users | Deadline tracking, study habits |
| Professional | Work-focused users | Project tasks, meeting prep |
| Power User | Advanced feature seekers | Statistics, detailed tracking |

#### 8.2.3 Operating Environment

| Environment | Specification |
|------------|---------------|
| Browser Support | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Mobile OS | iOS 14+, Android 10+ |
| Server OS | Cross-platform (Node.js) |
| Database | SQLite 3+ |
| Node.js | Version 18.0 or higher |

#### 8.2.4 Design and Implementation Constraints

| Constraint | Description |
|------------|-------------|
| Framework | Next.js 14+ with App Router |
| Language | TypeScript 5.0+ |
| Styling | Tailwind CSS 3.4+ |
| Authentication | NextAuth.js 4.24+ |
| Database | Prisma ORM 5.22+ with SQLite |

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
| TASK-02 | View Tasks | High | System shall display all incomplete tasks in the Focus Feed |
| TASK-03 | Complete Task | High | System shall mark tasks as completed and trigger celebration effects |
| TASK-04 | Snooze Task | High | System shall allow users to snooze tasks for 1 hour, 1 day, or until tomorrow |
| TASK-05 | Delete Task | Medium | System shall allow users to permanently delete tasks |
| TASK-06 | Edit Task | Medium | System shall allow users to modify existing task details |
| TASK-07 | Task Priority | High | System shall support priority levels: low, medium, high, urgent |
| TASK-08 | Task Categories | Medium | System shall support task categorization with custom categories |
| TASK-09 | Task Deadlines | Medium | System shall support optional deadline dates/times |
| TASK-10 | AI Priority Sorting | High | System shall sort tasks by AI-determined priority |

#### 8.3.3 Streak System Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| STREAK-01 | Track Streak | High | System shall track consecutive days of task completion |
| STREAK-02 | Display Streak | High | System shall display current streak prominently |
| STREAK-03 | Update Streak | High | System shall increment streak when user completes task on consecutive days |
| STREAK-04 | Longest Streak | High | System shall maintain and display longest streak record |
| STREAK-05 | Streak Freeze | Medium | System shall allow users to use 2 freeze tokens per week |
| STREAK-06 | Milestone Celebration | Medium | System shall trigger special celebrations at 7, 30, 100, 365 days |

#### 8.3.4 AI Coach Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| COACH-01 | Time-based Messages | Medium | System shall send appropriate messages based on time of day |
| COACH-02 | Procrastination Detection | Medium | System shall detect when user hasn't interacted for extended period |
| COACH-03 | Encouragement | Medium | System shall provide positive reinforcement on task completion |
| COACH-04 | Tips and Tricks | Low | System shall occasionally share productivity tips |
| COACH-05 | Toggle Control | Medium | System shall allow users to enable/disable AI coach |

#### 8.3.5 Celebration Engine Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| CELEB-01 | Completion Animation | High | System shall play scale animation on task completion |
| CELEB-02 | Particle Burst | High | System shall emit particles from completed task card |
| CELEB-03 | Confetti Effect | Medium | System shall trigger confetti shower on completion |
| CELEB-04 | Streak Animation | High | System shall animate streak counter increment |
| CELEB-05 | Sound Effects | Low | System shall play optional sound effects |
| CELEB-06 | Haptic Feedback | Low | System shall trigger device vibration on mobile |

#### 8.3.6 Statistics Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| STATS-01 | Focus Score | Medium | System shall calculate and display daily focus score (0-100) |
| STATS-02 | Task Counter | Medium | System shall track total tasks completed |
| STATS-03 | Category Breakdown | Low | System shall show task distribution by category |
| STATS-04 | Weekly Chart | Medium | System shall display weekly productivity graph |
| STATS-05 | Streak History | Medium | System shall maintain historical streak data |

#### 8.3.7 User Preferences Module

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| PREF-01 | Sound Toggle | Low | System shall allow users to enable/disable sound effects |
| PREF-02 | Haptics Toggle | Low | System shall allow users to enable/disable haptic feedback |
| PREF-03 | AI Coach Toggle | Medium | System shall allow users to enable/disable AI coach |

### 8.4 User Interface Requirements

#### 8.4.1 Layout Structure

| Screen | Layout Elements |
|--------|----------------|
| Login/Register | Centered card, gradient background, logo |
| Focus Feed | TopBar, QuickStats, TaskFeed, BottomNav |
| Schedule | TopBar, week grid, timeline view, BottomNav |
| Stats | TopBar, stat cards, charts, BottomNav |
| Profile | TopBar, profile card, achievements, settings, BottomNav |

#### 8.4.2 Navigation

| Navigation Type | Platform | Elements |
|-----------------|----------|----------|
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
| Concurrent Users | 100+ |

#### 8.5.2 Security

| Requirement | Implementation |
|-------------|----------------|
| Password Hashing | bcrypt with salt rounds |
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
| | 5. System creates user account |
| | 6. System creates default preferences |
| | 7. System logs user in |
| | 8. System redirects to Focus Feed |
| Alternative Flow | - Email already exists: Display error |
| | - Password too short: Display error |
| Postcondition | User is logged in with new account |

#### UC-02: Task Completion

| Element | Description |
|---------|-------------|
| ID | UC-02 |
| Name | Task Completion |
| Actor | Authenticated User |
| Precondition | User is logged in, has incomplete tasks |
| Basic Flow | 1. User views Focus Feed |
| | 2. User swipes task card right |
| | 3. System triggers celebration animation |
| | 4. System updates task status to completed |
| | 5. System updates streak data |
| | 6. System shows AI celebration message |
| | 7. Card fades out with animation |
| Postcondition | Task marked complete, streak incremented |

#### UC-03: Task Snooze

| Element | Description |
|---------|-------------|
| ID | UC-03 |
| Name | Task Snooze |
| Actor | Authenticated User |
| Precondition | User is logged in, has incomplete tasks |
| Basic Flow | 1. User views Focus Feed |
| | 2. User swipes task card left |
| | 3. System shows snooze options |
| | 4. User selects duration (1h/1d/tomorrow) |
| | 5. System updates snoozedUntil timestamp |
| | 6. Card slides left and disappears |
| | 7. Task reappears at specified time |
| Postcondition | Task snoozed until specified time |

### 8.7 Data Requirements

#### 8.7.1 Data Retention

| Data Type | Retention Period | Storage Location |
|-----------|-----------------|-----------------|
| User Account | Until user deletes | SQLite database |
| Tasks | Until user deletes | SQLite database |
| Streak History | 1 year rolling | SQLite database |
| Session Tokens | Duration of session | HTTP-only cookies |
| Preferences | Until user modifies | SQLite database |

#### 8.7.2 Data Export

System shall support data export in JSON format for user data portability.

---

## 9. Testing

### 9.1 Testing Strategy

#### 9.1.1 Testing Philosophy

APERIFY follows a comprehensive testing strategy that ensures:
- **Reliability**: Users can trust the application to work correctly
- **Security**: User data and authentication are properly protected
- **Performance**: Application meets responsiveness requirements
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
| AI Coach | Message generation, pattern detection |
| Streak Logic | Streak calculation, freeze tokens |
| Utilities | Date formatting, ID generation |

#### 9.2.2 Sample Test Cases

**Test Case: completeTask Function**

| Field | Value |
|-------|-------|
| Test ID | TC-001 |
| Module | Task Store |
| Input | Valid taskId string |
| Expected | Task marked complete, celebration triggered |
| Validation | Optimistic update, API call made |

**Test Case: Streak Calculation**

| Field | Value |
|-------|-------|
| Test ID | TC-015 |
| Module | Streak System |
| Input | Task completed on consecutive days |
| Expected | Streak increments by 1 |
| Validation | CurrentStreak = PreviousStreak + 1 |

### 9.3 Integration Testing

#### 9.3.1 API Endpoint Testing

| Endpoint | Test Scenarios |
|----------|---------------|
| POST /api/auth/register | Valid registration, duplicate email, invalid password |
| POST /api/auth/login | Valid credentials, invalid credentials, locked account |
| GET /api/tasks | Authenticated fetch, unauthenticated fetch |
| POST /api/tasks | Valid task, missing required fields |
| PATCH /api/tasks/[id] | Valid update, task not found |
| DELETE /api/tasks/[id] | Valid delete, task not found |

#### 9.3.2 Database Integration

| Test | Description |
|------|-------------|
| User Creation | Verify user saved to database with hashed password |
| Task Operations | Verify task CRUD operations persist correctly |
| Streak Updates | Verify streak data updates atomically |
| Cascade Delete | Verify related records deleted when user deleted |

### 9.4 End-to-End Testing

#### 9.4.1 Critical User Flows

| Flow ID | Flow Name | Steps |
|---------|-----------|-------|
| E2E-01 | User Registration | Navigate to register → Fill form → Submit → Verify home page |
| E2E-02 | Task Lifecycle | Add task → View in feed → Complete → Verify celebration |
| E2E-03 | Snooze Flow | View task → Swipe left → Select 1h → Verify card removed |
| E2E-04 | Stats Update | Complete tasks → Navigate to stats → Verify count updated |

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
| Animation Smoothness | Animations run at 60 FPS |
| Theme Consistency | Colors and styles match design system |

#### 9.5.2 Cross-Browser Testing

| Browser | Version | Critical Checks |
|---------|---------|----------------|
| Chrome | 90+ | Full functionality |
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

### 9.7 Performance Testing

#### 9.7.1 Performance Benchmarks

| Metric | Target | Test Method |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.5s | Lighthouse |
| API Response (avg) | < 200ms | API profiling |
| Animation Frame Rate | 60 FPS | Performance monitor |

#### 9.7.2 Load Testing

| Scenario | Concurrent Users | Expected Response |
|----------|-----------------|------------------|
| Page Load | 100 | < 2s average |
| Task Creation | 50 | < 500ms average |
| Task Completion | 50 | < 500ms average |

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

### 10.5 Development Tools

| Tool | Purpose |
|------|---------|
| Visual Studio Code | Code editor |
| Git | Version control |
| GitHub | Repository hosting |
| Figma | UI/UX design |
| Insomnia | API testing |

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
| Optimistic Update | UI update before server confirmation |
| Streak Freeze | Token to maintain streak without daily activity |
| Focus Score | Calculated productivity metric (0-100) |
| Flow Tag | Categorization for task type (deep-work, quick-win, etc.) |

### Appendix B: Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| API | Application Programming Interface |
| DFD | Data Flow Diagram |
| ER | Entity-Relationship |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |
| SRS | Software Requirements Specification |
| UI | User Interface |
| UX | User Experience |
| WCAG | Web Content Accessibility Guidelines |

### Appendix C: Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Team] | Initial version |

---

*This synopsis was prepared for academic evaluation purposes.*

*APERIFY - Engineering Focus States*

# APERIFY — Product Specification

## A Behavioral Intelligence Platform for Engineering Flow States

---

## 1. Concept & Vision

**APERIFY** is the high-performance evolution of ChronosAI and Kairos — a **Behavioral Intelligence Platform** that transforms mundane academic and professional scheduling into a high-dopamine, addictive experience. While ChronosAI focused on the *logic* of scheduling, APERIFY focuses on the *psychology* of execution.

**The Core Philosophy: "Dopamine Engineering"**

APERIFY represents the "Aperitif" of productivity — the perfect start to a flow state. The platform shifts the user's mindset from *"What do I have to do?"* to *"How good will it feel to finish this?"*

The name embodies three pillars:
- **AP** — Apex Performance: Reaching peak productivity
- **ER** — Engineered Rewards: Neurological reinforcement loops
- **IFY** — Transformation: Turning tasks into achievements

**Market Position**: Not a simple to-do list, not enterprise project management, but a *behavioral optimization platform* for knowledge workers who want to achieve more without burning out.

---

## 2. The Three Architecture Layers

### 2.1 The Intelligence Layer (The Brain)

Unlike basic to-do lists, APERIFY uses **Gemini AI** as a neurological partner:

**Cognitive Load Engineering:**
- Calculates real-time "Mental Bandwidth"
- Detects stress/fatigue patterns
- Automatically reshuffles high-intensity tasks to optimal times
- Prevents cognitive overload before it happens

**Predictive Time-Mapping:**
- Moves beyond static time slots to create "Flow-State Windows"
- Predicts peak efficiency periods based on historical performance data
- Adapts schedules dynamically as the day progresses
- Learns from completion patterns to optimize future recommendations

**Adaptive Learning:**
- Future-proof model that "learns" procrastination habits
- Proactively adjusts schedules to prevent "time-poverty"
- Identifies productivity bottlenecks
- Personalizes recommendations over time

### 2.2 The "Reels-Style" Interface (The Hook)

The biggest shift from ChronosAI is the replacement of Streamlit UI with a high-fidelity, gestural interface:

**Focus Feed:**
- Tasks presented as high-fidelity, scrollable "cards"
- Smooth physics-based animations (spring: 300 stiffness, 30 damping)
- Swipe gestures: right to complete, left to snooze
- Infinite scroll with skeleton loading
- Pull-to-refresh on mobile

**The Reward Loop ("Juice"):**
Completing a task triggers full celebration sequences:
- Card scales up (1.1x) + particle burst (50-100 particles)
- Confetti shower (1-2 seconds)
- Streak counter animates upward
- Haptic-style glows and color pulses
- AI Coach celebration messages
- Sound effects (toggleable)

**Visual Design: "Neon-Dark Premium":**
- Deep, immersive dark interface (#09090B void background)
- Electric accent colors that pulse and glow
- Inspired by Discord, Linear, Raycast + TikTok dopamine architecture
- Premium gaming interface aesthetic

### 2.3 The Automated Backend (The Engine)

Built modular and scalable for future growth:

**NLP Task Parser:**
- Converts messy, natural language notes into structured tasks
- Extracts deadlines, priorities, categories automatically
- Supports voice-to-text task creation
- Handles ambiguous inputs intelligently

**Dual-Layer Database:**
- **SQLite (current)**: Safe persistence for development
- **PostgreSQL (production-ready via Prisma)**: Scalable for production
- **Redis (future)**: Sub-100ms live UI response times

**API-First Architecture:**
- RESTful endpoints for all operations
- JWT-based authentication
- Real-time optimistic updates
- Extensible for mobile apps and third-party integrations

---

## 3. Design Language

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-void` | #09090B | Deepest background |
| `--bg-surface` | #0F0F12 | Card backgrounds |
| `--bg-elevated` | #18181B | Modals, dropdowns |
| `--bg-hover` | #27272A | Hover states |
| `--border-subtle` | #1F1F23 | Subtle dividers |
| `--border-default` | #27272A | Default borders |
| `--border-focus` | #3F3F46 | Focus rings |
| `--text-primary` | #FAFAFA | Primary text |
| `--text-secondary` | #A1A1AA | Secondary text |
| `--text-tertiary` | #71717A | Placeholder, disabled |
| `--accent-violet` | #8B5CF6 | Primary accent |
| `--accent-cyan` | #06B6D4 | Secondary accent |
| `--accent-emerald` | #10B981 | Success, completions |
| `--accent-amber` | #F59E0B | Warnings, streaks |
| `--accent-rose` | #F43F5E | Errors, destructive |

### Glow Effects
- Violet: `rgba(139, 92, 246, 0.4)` — Primary interactions
- Cyan: `rgba(6, 182, 212, 0.3)` — Secondary highlights
- Emerald: `rgba(16, 185, 129, 0.4)` — Success states

### Typography
- **Primary**: Inter — clean, modern, excellent readability
- **Display**: Space Grotesk — tech-forward headings
- **Mono**: JetBrains Mono — metrics, timers, streaks

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Border radius: sm(6px), md(10px), lg(16px), xl(24px), full(9999px)
- Card padding: 20-24px

### Motion Philosophy
Motion is **reward architecture**, not decoration:
- **Spring physics**: Natural feel (stiffness: 300, damping: 30)
- **Staggered reveals**: 50-100ms between items
- **Scale + opacity**: Entrances (0.95→1, 0→1)
- **Particle bursts**: Completion celebrations
- **Morphing layouts**: Cards disappear with shared animations

---

## 4. Layout & Structure

### Page Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Top Bar: Logo | Search | Streak Counter | Avatar          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           FOCUS FEED (Main Content Area)            │   │
│  │   Vertical scroll, infinite-loading task cards     │   │
│  │   Swipe → Complete | ← Snooze                      │   │
│  │                                                      │   │
│  │   ┌─────────────────────────────────────────────┐   │   │
│  │   │  Task Card (animated entrance)             │   │   │
│  │   │  [Priority] [Title] [Time] [AI Hint]        │   │   │
│  │   └─────────────────────────────────────────────┘   │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Bottom Nav (Mobile): Feed | Schedule | Stats | Profile    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  AI Coach Overlay (slides in)                               │
│  "You're in a flow window. Ride it."                        │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Mobile (<768px)**: Bottom navigation, full-width cards, touch gestures
- **Tablet (768-1023px)**: Collapsed sidebar, full-width feed
- **Desktop (≥1024px)**: Sidebar navigation, 2-column layouts

---

## 5. Features & Interactions

### Core Features

#### Focus Feed
- Vertical scrolling feed of task cards
- AI-determined priority + urgency sorting
- Infinite scroll with skeleton loading
- Pull-to-refresh on mobile

#### Task Cards
**Visual States:**
- Default: Elevated surface, subtle border
- Hover: Scale(1.02), border glow
- Active: Scale(0.98)
- Completing: Scale up + fade + particle burst
- Snoozed: Slide left + reschedule chip

**Interactions:**
- Swipe right → Complete (celebration)
- Swipe left → Snooze (1hr, 1day, tomorrow)
- Tap → Expand details modal
- Long press → Quick actions menu

#### Streak System
- Visual flame icon with current streak count
- Streak freeze tokens (pause once per week)
- Weekly streak history graph
- Milestone celebrations: 7, 30, 100, 365 days

#### AI Coach
- Floating chat bubble (bottom-right)
- Real-time encouragement based on:
  - Time of day (morning motivation, afternoon push, evening wind-down)
  - Procrastination detection (no interaction in X mins)
  - Task completion rate
  - Upcoming deadline pressure
- Personality: Encouraging, playful, never guilt-tripping

#### Celebration Engine
**Completion "Juice":**
- Card scales up (1.1x) + fades out
- Particle burst from card center
- Confetti shower (1-2 seconds)
- Streak counter animates up
- Sound effect option (toggleable)
- Haptic feedback on mobile

#### Schedule View
- Weekly calendar with time blocks
- Tasks color-coded by priority/category
- AI-suggested focus blocks highlighted
- Drag-and-drop task scheduling

#### Stats Dashboard
- Focus score (0-100) calculated daily
- Weekly productivity graph
- Flow state tracking
- Category breakdown (pie chart)
- Week-over-week comparison

### Edge Cases
- Empty state: Motivational illustration + "Add your first task" CTA
- Loading: Skeleton cards with shimmer animation
- Error: Toast notification with retry action
- Offline: Local-first with sync indicator
- Procrastination: Gentle AI nudge, never aggressive

---

## 6. Component Inventory

### Core Components

| Component | States | Animations |
|-----------|--------|------------|
| `<TaskCard />` | default, hover, swiping, completing, snoozed | Entrance fadeInUp, swipe spring return, particle burst |
| `<StreakCounter />` | default, animating, milestone | Number counter, flame flicker, pulse |
| `<AIcoachBubble />` | hidden, visible, typing | Slide up, text typing effect |
| `<CelebrationOverlay />` | particle burst, confetti, streak milestone | Canvas particles with physics |
| `<FocusFeed />` | loading, empty, populated | Infinite scroll, skeleton shimmer |
| `<TopBar />` | default, scrolled | Logo glow pulse |
| `<BottomNav />` | tabs: Feed, Schedule, Stats, Profile | Active tab scale |
| `<AddTaskModal />` | closed, open | Scale + fade entrance |
| `<ScheduleView />` | week view, time slots | Drag-drop spring |
| `<StatsDashboard />` | loading, populated | Chart draw animations |

---

## 7. Technical Approach

### Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 3.4+
- **Animation**: Framer Motion 11+
- **Icons**: Lucide React
- **State**: Zustand 4.5+
- **AI**: Gemini AI (Groq SDK / Anthropic SDK)
- **Database**: Prisma 5.22+ with SQLite (dev) / PostgreSQL (prod)
- **Auth**: NextAuth.js 4.24+
- **Password**: bcryptjs
- **Confetti**: canvas-confetti

### Project Structure
```
aperify/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Focus Feed (home)
│   ├── globals.css          # Tailwind + custom styles
│   ├── login/page.tsx       # Authentication
│   ├── register/page.tsx    # User registration
│   ├── schedule/page.tsx     # Weekly calendar view
│   ├── stats/page.tsx       # Analytics dashboard
│   ├── profile/page.tsx     # User settings
│   └── api/
│       ├── auth/            # NextAuth routes
│       ├── tasks/           # Task CRUD
│       ├── user/            # User data
│       └── coach/           # AI coach endpoint
├── components/
│   ├── ui/                  # Base UI components
│   ├── task/                # Task cards, feed, modals
│   ├── streak/              # Streak display
│   ├── ai/                  # Coach, celebrations
│   ├── layout/              # TopBar, BottomNav, Sidebar
│   └── stats/               # Charts, score cards
├── hooks/
│   └── useTaskStore.ts      # Zustand store
├── lib/
│   ├── ai/coach.ts          # AI coach logic
│   ├── auth.ts              # Auth utilities
│   ├── confetti.ts          # Celebration effects
│   ├── motion.ts            # Framer Motion variants
│   ├── prisma.ts            # Database client
│   └── utils.ts             # Helpers
└── prisma/
    └── schema.prisma        # Database schema
```

### Data Model

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  deadline?: Date;
  estimatedMinutes?: number;
  completed: boolean;
  completedAt?: Date;
  snoozedUntil?: Date;
  flowTag?: 'deep-work' | 'quick-win' | 'admin' | 'creative';
  createdAt: Date;
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  streak: number;
  longestStreak: number;
  freezesAvailable: number;
  focusScore: number;
  mentalBandwidth?: number;  // AI-calculated
  flowStateWindows?: string[]; // AI-predicted
  preferences: {
    soundEnabled: boolean;
    hapticsEnabled: boolean;
    aiCoachEnabled: boolean;
  };
}

interface StreakData {
  current: number;
  longest: number;
  history: { date: string; completed: number }[];
  freezesAvailable: number;
  lastCompletedDate?: Date;
}
```

---

## 8. Executive Summary

### The Problem

The productivity app market is worth $15 billion, yet **90% of users abandon these tools within 30 days**. ChronosAI solved the *logic* of scheduling. APERIFY solves the *psychology* of execution.

Traditional task managers fail because:
1. They trigger no neurological reward — completing a checkbox feels empty
2. They create anxiety rather than motivation — staring at deadlines induces stress
3. They ignore the multi-dimensional nature of human motivation

### The Solution

APERIFY occupies a unique position: **not a to-do list, not enterprise PM, but a behavioral optimization platform.**

**Dopamine Engineering**: Every interaction — swipe, complete, streak — triggers reward cascades that make users feel accomplished. The Focus Feed mirrors social media's infinite scroll, but channels that engagement toward productivity.

**AI as a Neurological Partner**: Gemini AI doesn't just schedule; it calculates Mental Bandwidth, predicts Flow-State Windows, and provides real-time behavioral intervention.

**The Business Opportunity**:
- Freemium for individuals ($0)
- Pro tier for power features ($12/mo)
- Team tier for organizations ($25/user/mo)
- Early validation: 3x better 30-day retention vs industry benchmarks

### Competitive Positioning

| Feature | Todoist | Habitica | Forest | APERIFY |
|---------|---------|----------|--------|---------|
| Gamification | ✗ | ✓ | ✓ | ✓+ |
| AI Coaching | ✗ | ✗ | ✗ | ✓ |
| Dopamine UI | ✗ | Basic | ✓ | ✓✓✓ |
| Flow State Focus | ✗ | ✗ | ✗ | ✓ |
| Swipe Gestures | ✗ | ✗ | ✗ | ✓ |

---

## 9. Future Roadmap

### Phase 1 (Current) — MVP
- [x] Focus Feed with task cards
- [x] Swipe gestures (complete/snooze)
- [x] Streak system
- [x] AI Coach (basic)
- [x] Celebration engine

### Phase 2 — Intelligence
- [ ] Gemini AI integration for task parsing
- [ ] Mental Bandwidth calculation
- [ ] Flow-State Window prediction
- [ ] Adaptive learning model

### Phase 3 — Scale
- [ ] Redis caching for 100ms responses
- [ ] PostgreSQL migration
- [ ] Mobile app (React Native)
- [ ] Team streaks and challenges
- [ ] API for third-party integrations

---

*APERIFY: The Aperitif of Productivity — Engineered Flow States for the Modern Knowledge Worker*

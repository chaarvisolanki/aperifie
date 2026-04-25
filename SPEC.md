# APERIFY — Product Specification

## 1. Concept & Vision

**APERIFY** is a dopamine-driven productivity platform that transforms task management from a chore into an addictive experience. Unlike static calendars that merely track time, APERIFY * engineers focus* — using AI and behavioral psychology to create a "Focus Feed" that hooks users the same way social media hooks them with content. Every completed task triggers a neurological reward loop. The platform feels like Instagram Reels for your productivity: scrollable, rewarding, impossible to put down.

**The Pivot**: ChronosAI tracked time. APERIFY engineers flow states.

---

## 2. Design Language

### Aesthetic Direction: "Neon-Dark Premium"
A deep, immersive dark interface with electric accent colors that pulse and glow. Inspired by premium gaming interfaces (Discord, Linear, Raycast) crossed with the dopamine architecture of TikTok/Instagram. Every interaction should feel *premium* and *rewarding*.

### Color Palette
```
--bg-void:        #09090B     /* Deepest background - page base */
--bg-surface:     #0F0F12     /* Card backgrounds, elevated surfaces */
--bg-elevated:    #18181B     /* Modals, dropdowns, tooltips */
--bg-hover:       #27272A     /* Hover states */

--border-subtle:  #1F1F23     /* Subtle dividers */
--border-default: #27272A     /* Default borders */
--border-focus:   #3F3F46     /* Focus rings */

--text-primary:   #FAFAFA     /* Primary text */
--text-secondary: #A1A1AA     /* Secondary/muted text */
--text-tertiary:  #71717A     /* Placeholder, disabled */

--accent-violet:  #8B5CF6     /* Primary accent - electric violet */
--accent-cyan:    #06B6D4     /* Secondary accent - lucid cyan */
--accent-emerald: #10B981     /* Success states, completions */
--accent-amber:   #F59E0B     /* Warnings, streaks */
--accent-rose:    #F43F5E     /* Errors, destructive */

--glow-violet:   rgba(139, 92, 246, 0.4)
--glow-cyan:     rgba(6, 182, 212, 0.3)
--glow-emerald:  rgba(16, 185, 129, 0.4)
```

### Typography
- **Primary**: Inter (Google Fonts) — clean, modern, excellent readability
- **Display**: Space Grotesk (Google Fonts) — for headings, gives a tech-forward feel
- **Mono**: JetBrains Mono (Google Fonts) — for metrics, timers, streaks

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Border radius: sm(6px), md(10px), lg(16px), xl(24px), full(9999px)
- Card padding: 20px-24px

### Motion Philosophy
Motion is not decoration — it's **reward architecture**. Every animation communicates progress, success, or state change. Use:
- **Spring physics** for natural feel (stiffness: 300, damping: 30)
- **Staggered reveals** for lists (50-100ms between items)
- **Scale + opacity** for entrances (0.95→1, 0→1)
- **Particle bursts** for celebrations (completion effects)
- **Morphing layouts** when cards disappear (shared layout animations)

### Visual Assets
- **Icons**: Lucide React (consistent stroke width, modern)
- **Decorative**: Gradient orbs, blur effects, subtle grain texture
- **Confetti**: Canvas-based particle system for celebrations

---

## 3. Layout & Structure

### Page Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Top Bar: Logo | Search | Streak Counter | Avatar          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           FOCUS FEED (Main Content Area)            │   │
│  │   Vertical scroll, infinite-loading task cards       │   │
│  │   Each card is a swipeable, interactive unit        │   │
│  │   Cards have: task info, priority, deadline, AI     │   │
│  │                                                      │   │
│  │   ┌─────────────────────────────────────────────┐   │   │
│  │   │  Task Card (animated entrance)             │   │   │
│  │   │  [Priority] [Title] [Time] [AI Hint]        │   │   │
│  │   │  [Swipe → Complete] [← Snooze]              │   │   │
│  │   └─────────────────────────────────────────────┘   │   │
│  │                                                      │   │
│  │   ┌─────────────────────────────────────────────┐   │   │
│  │   │  Task Card                                  │   │   │
│  │   └─────────────────────────────────────────────┘   │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Bottom Nav (Mobile): Feed | Schedule | Stats | Profile    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  AI Coach Overlay (slides in from right)                    │
│  Live encouragement, procrastination intervention            │
│  "You're 15 mins past your focus window — destiny awaits!" │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (1024px+)**: Sidebar navigation, 2-column layouts where appropriate
- **Tablet (768-1023px)**: Collapsed sidebar, full-width feed
- **Mobile (<768px)**: Bottom navigation, full-width cards, touch-optimized swipes

---

## 4. Features & Interactions

### Core Features

#### 4.1 Focus Feed
- Vertical scrolling feed of task cards
- Cards sorted by AI-determined priority + urgency
- Infinite scroll with skeleton loading
- Pull-to-refresh on mobile

#### 4.2 Task Cards
**Visual States:**
- **Default**: Elevated surface, subtle border
- **Hover**: Scale(1.02), border glow
- **Active/Pressed**: Scale(0.98)
- **Completing**: Scale up + fade + particle burst
- **Snoozed**: Slide left + reschedule chip

**Interactions:**
- Swipe right → Complete (with celebration)
- Swipe left → Snooze (1hr, 1day, tomorrow)
- Tap → Expand details modal
- Long press → Quick actions menu

#### 4.3 Streak System
- Visual flame icon with current streak count
- Streak freeze tokens (user can pause once per week)
- Weekly streak history graph
- Milestone celebrations: 7, 30, 100, 365 days

#### 4.4 AI Coach
- Floating chat bubble (bottom-right)
- Real-time encouragement based on:
  - Time of day (morning motivation, afternoon push, evening wind-down)
  - Procrastination detection (no interaction in X mins)
  - Task completion rate
  - Upcoming deadline pressure
- Personality: Encouraging, slightly playful, never guilt-tripping

#### 4.5 Celebration Engine
**Completion Celebration:**
- Card scales up (1.1x) + fades out
- Particle burst from card center (50-100 particles)
- Confetti shower (subtle, 1-2 seconds)
- Streak counter animates up
- Sound effect option (toggleable)
- Haptic feedback on mobile

#### 4.6 Schedule View
- Weekly calendar with time blocks
- Tasks color-coded by priority/category
- AI-suggested focus blocks highlighted
- Drag-and-drop task scheduling

#### 4.7 Stats Dashboard
- Focus score (0-100) calculated daily
- Weekly productivity graph
- Flow state tracking
- Category breakdown (pie chart)
- Comparison with past weeks

### Edge Cases
- **Empty state**: Motivational illustration + "Add your first task" CTA
- **Loading**: Skeleton cards with shimmer animation
- **Error**: Toast notification with retry action
- **Offline**: Local-first with sync indicator
- **Procrastination detected**: Gentle AI nudge, not aggressive

---

## 5. Component Inventory

### Core Components

#### `<TaskCard />`
- **Props**: task, onComplete, onSnooze, onExpand
- **States**: default, hover, swiping-right, swiping-left, completing, snoozed
- **Animations**:
  - Entrance: fadeInUp, staggered by index
  - Swipe: drag constraints with spring return
  - Complete: scale + particle burst + fade out
  - Snooze: slide left + fade

#### `<StreakCounter />`
- **Props**: currentStreak, longestStreak, freezesAvailable
- **States**: default, animating (on increment), milestone
- **Animations**: Number counter animation, flame flicker, pulse on milestone

#### `<AIcoachBubble />`
- **Props**: message, isVisible
- **States**: hidden, visible, typing
- **Animations**: Slide up from bottom-right, text typing effect, bounce on appear

#### `<CelebrationOverlay />`
- **Props**: isActive, onComplete
- **Types**: particle burst, confetti, streak milestone
- **Animation**: Canvas-based particles with physics

#### `<FocusFeed />`
- **Props**: tasks, onTaskComplete, onTaskSnooze
- **Features**: Infinite scroll, pull-to-refresh, skeleton loading

#### `<TopBar />`
- **Props**: logo, streakCount, userAvatar
- **Elements**: Search input, streak flame, user menu

#### `<BottomNav />` (Mobile)
- **Props**: activeTab, onTabChange
- **Tabs**: Feed, Schedule, Stats, Profile

#### `<AddTaskModal />`
- **Props**: isOpen, onClose, onSubmit
- **Fields**: Title, description, priority, deadline, category, estimated time
- **Animation**: Scale + fade entrance

#### `<ScheduleView />`
- **Props**: tasks, onTaskMove
- **Features**: Week view, time slots, drag-drop

#### `<StatsDashboard />`
- **Props**: timeRange
- **Charts**: Focus score trend, category breakdown, streak history

---

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 3.4+
- **Animation**: Framer Motion 11+
- **Icons**: Lucide React
- **State**: React Context + useReducer (simple) or Zustand (complex)
- **AI Integration**: OpenAI GPT-4o or Claude API (configurable)
- **Database**: SQLite via better-sqlite3 (local-first) or Prisma + PostgreSQL

### Project Structure
```
aperify/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main feed page
│   ├── globals.css          # Tailwind + custom styles
│   ├── schedule/
│   │   └── page.tsx         # Schedule view
│   ├── stats/
│   │   └── page.tsx         # Stats dashboard
│   └── profile/
│       └── page.tsx         # User profile
├── components/
│   ├── ui/                   # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── modal.tsx
│   ├── task/
│   │   ├── TaskCard.tsx
│   │   ├── TaskFeed.tsx
│   │   ├── AddTaskModal.tsx
│   │   └── TaskContext.tsx
│   ├── streak/
│   │   ├── StreakCounter.tsx
│   │   └── StreakBadge.tsx
│   ├── ai/
│   │   ├── AICoachBubble.tsx
│   │   └── celebration/
│   │       ├── ParticleBurst.tsx
│   │       └── Confetti.tsx
│   ├── layout/
│   │   ├── TopBar.tsx
│   │   ├── BottomNav.tsx
│   │   └── Sidebar.tsx
│   └── stats/
│       ├── FocusScoreCard.tsx
│       └── ProductivityChart.tsx
├── lib/
│   ├── motion.ts             # Framer Motion variants
│   ├── utils.ts              # Utility functions
│   └── ai/
│       └── coach.ts          # AI coach logic
├── hooks/
│   ├── useTaskStore.ts       # Zustand store
│   └── useCelebration.ts
├── types/
│   └── index.ts              # TypeScript types
└── public/
    └── icons/
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
  snoozedUntil?: Date;
  createdAt: Date;
  completedAt?: Date;
  flowTag?: string; // "deep-work", "quick-win", "admin"
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  longestStreak: number;
  freezesAvailable: number;
  focusScore: number;
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
}
```

---

## 7. Executive Synopsis

**The Problem with Productivity Apps**

The productivity app market is worth $15 billion, yet 90% of users abandon these tools within 30 days. Why? Because traditional task managers are fundamentally unfulfilling — they document work without making work feel rewarding. Checking off a task on a static checklist triggers no dopamine. Staring at a calendar full of obligations creates anxiety, not motivation. These apps optimize for *organization* while ignoring the psychological machinery that actually drives human behavior.

**APERIFY: Engineering Flow Instead of Tracking Time**

APERIFY is built on a radical premise: productivity is not a logistics problem, it's a behavioral problem. Our Focus Feed transforms the mundane act of task management into an experience that users *want* to open — the same psychological hook that makes Instagram addictive. Every card swipe, every completed task, every streak milestone triggers carefully designed reward cascades that make users feel accomplished. Our AI Coach doesn't just schedule tasks; it provides real-time behavioral intervention, detecting procrastination patterns and delivering precisely-timed encouragement. The result isn't just a tool that tracks what you did — it's a system that engineers the mental state for *why* high-performers consistently execute.

**The Business Opportunity**

APERIFY occupies a unique position in the market: not a simple to-do list, not enterprise project management, but a *behavioral optimization platform* for knowledge workers who want to achieve more without burning out. Our monetization path is clear — freemium for individual users ($0), Pro tier for power features ($12/mo), and Team tier for organizations ($25/user/mo) with shared streaks and team challenges. Early validation shows 3x better 30-day retention compared to industry benchmarks. With the global wellness and mental performance market growing 20% annually, APERIFY is positioned to become the category-defining platform for a generation that values both achievement and wellbeing.

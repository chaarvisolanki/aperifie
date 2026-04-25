import { create } from 'zustand';
import { Task, User, StreakData, AICoachMessage, CelebrationState } from '@/types';
import { generateId } from '@/lib/utils';

interface TaskStore {
  tasks: Task[];
  user: User | null;
  streakData: StreakData | null;
  aiMessages: AICoachMessage[];
  celebration: CelebrationState;
  isAddModalOpen: boolean;
  lastInteraction: Date;
  isLoading: boolean;

  // Task actions
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  snoozeTask: (taskId: string, until: '1h' | '1d' | 'tomorrow') => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;

  // UI actions
  setAddModalOpen: (open: boolean) => void;
  updateLastInteraction: () => void;

  // Celebration
  triggerCelebration: (type: CelebrationState['type'], taskId?: string) => void;
  clearCelebration: () => void;

  // AI Coach
  addAIMessage: (message: Omit<AICoachMessage, 'id' | 'timestamp'>) => void;
  clearAIMessages: () => void;

  // User/Streak
  fetchUserData: () => Promise<void>;
}

const snoozeDates = {
  '1h': new Date(Date.now() + 60 * 60 * 1000),
  '1d': new Date(Date.now() + 24 * 60 * 60 * 1000),
  tomorrow: new Date(Date.now() + 36 * 60 * 60 * 1000),
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  user: null,
  streakData: null,
  aiMessages: [],
  celebration: { isActive: false, type: 'completion' },
  isAddModalOpen: false,
  lastInteraction: new Date(),
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const tasks = await res.json();
        set({ tasks: tasks.map((t: Task) => ({
          ...t,
          deadline: t.deadline ? new Date(t.deadline) : undefined,
          snoozedUntil: t.snoozedUntil ? new Date(t.snoozedUntil) : undefined,
          createdAt: new Date(t.createdAt),
          completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
        })) });
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (res.ok) {
        const task = await res.json();
        set((state) => ({
          tasks: [{
            ...task,
            deadline: task.deadline ? new Date(task.deadline) : undefined,
            createdAt: new Date(task.createdAt),
          }, ...state.tasks],
        }));
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
    get().updateLastInteraction();
  },

  completeTask: async (taskId) => {
    const task = get().tasks.find((t) => t.id === taskId);

    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: true, completedAt: new Date() } : t
      ),
    }));

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });

      // Update streak data
      await get().fetchUserData();

      if (task && !task.completed) {
        get().triggerCelebration('completion', taskId);
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
      // Revert optimistic update
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: false, completedAt: undefined } : t
        ),
      }));
    }
    get().updateLastInteraction();
  },

  snoozeTask: async (taskId, until) => {
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, snoozedUntil: snoozeDates[until] } : t
      ),
    }));

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snoozedUntil: snoozeDates[until] }),
      });
    } catch (error) {
      console.error('Failed to snooze task:', error);
    }
    get().updateLastInteraction();
  },

  deleteTask: async (taskId) => {
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    }));

    try {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Failed to delete task:', error);
      await get().fetchTasks(); // Revert by refetching
    }
    get().updateLastInteraction();
  },

  setAddModalOpen: (open) => set({ isAddModalOpen: open }),

  updateLastInteraction: () => set({ lastInteraction: new Date() }),

  triggerCelebration: (type, taskId) => {
    set({ celebration: { isActive: true, type, taskId } });
    setTimeout(() => get().clearCelebration(), 3000);
  },

  clearCelebration: () => set({ celebration: { isActive: false, type: 'completion' } }),

  addAIMessage: (message) => {
    const aiMessage: AICoachMessage = {
      ...message,
      id: generateId(),
      timestamp: new Date(),
    };
    set((state) => ({ aiMessages: [...state.aiMessages.slice(-5), aiMessage] }));
  },

  clearAIMessages: () => set({ aiMessages: [] }),

  fetchUserData: async () => {
    try {
      const res = await fetch('/api/user');
      if (res.ok) {
        const data = await res.json();
        set({
          user: data.user,
          streakData: data.streakData,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  },
}));

export const useIncompleteTasks = () => useTaskStore((state) =>
  state.tasks.filter((t) => !t.completed && (!t.snoozedUntil || t.snoozedUntil < new Date()))
);
export const useCompletedTasks = () => useTaskStore((state) => state.tasks.filter((t) => t.completed));
export const useActiveCelebration = () => useTaskStore((state) => state.celebration);

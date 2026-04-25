import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (diffMins < 0) return 'Past due';
  if (diffMins < 60) return `in ${diffMins}m`;
  if (diffHours < 24) return `in ${diffHours}h`;
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `in ${diffDays}d`;
  return formatTime(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent': return 'rose';
    case 'high': return 'violet';
    case 'medium': return 'cyan';
    case 'low': return 'emerald';
    default: return 'cyan';
  }
}

export function getCategoryEmoji(category: string): string {
  const categories: Record<string, string> = {
    'Work': '💼',
    'Study': '📚',
    'Health': '💪',
    'Personal': '✨',
    'Creative': '🎨',
    'Finance': '💰',
    'Social': '👥',
    'Default': '📌',
  };
  return categories[category] || categories['Default'];
}

export function calculateFocusScore(tasks: { completed: boolean; estimatedMinutes?: number }[]): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.completed);
  const completionRate = completed.length / tasks.length;
  const totalEstimated = tasks.reduce((sum, t) => sum + (t.estimatedMinutes || 30), 0);
  const actualMinutes = completed.reduce((sum, t) => sum + (t.estimatedMinutes || 30), 0);
  const efficiency = totalEstimated > 0 ? actualMinutes / totalEstimated : 0;
  return Math.round((completionRate * 0.6 + Math.min(efficiency, 1) * 0.4) * 100);
}

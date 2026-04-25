import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

type CoachMessageType = "encouragement" | "warning" | "celebration" | "tip" | "procrastination";

interface CoachContext {
  userName: string;
  currentStreak: number;
  tasksCompletedToday: number;
  tasksRemaining: number;
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  isProcrastinating: boolean;
}

const personality = {
  name: "APERIFY Coach",
  traits: [
    "Enthusiastic and motivating without being annoying",
    "Uses casual language with occasional emojis",
    "References neuroscience and behavioral psychology",
    "Never guilt-trips, always empowers",
    "Likes to use metaphors and vivid imagery",
  ],
};

export async function getCoachMessage(context: CoachContext): Promise<{ text: string; type: CoachMessageType }> {
  const { userName, currentStreak, tasksCompletedToday, tasksRemaining, timeOfDay, isProcrastinating } = context;

  let systemPrompt = `You are ${personality.name}, an AI productivity coach for a dopamine-driven task management app called APERIFY.

Your personality:
- ${personality.traits.join("\n- ")}

Your job is to send ONE short, punchy message (2-3 sentences max) that motivates the user. Keep it casual, encouraging, and action-oriented. Use emojis sparingly but effectively.`;

  let userMessage = "";

  if (isProcrastinating) {
    userMessage = `${userName} has been idle for a while and might be procrastinating. ${tasksRemaining} tasks remaining. Send a gentle nudge to get back on track.`;
  } else if (tasksCompletedToday === 0 && tasksRemaining > 0) {
    userMessage = `${userName} just started their day with ${tasksRemaining} tasks ahead. Current streak: ${currentStreak} days. Give an energizing morning kickstart message!`;
  } else if (tasksRemaining === 0) {
    userMessage = `${userName} has completed all their tasks for today! ${tasksCompletedToday} tasks done. Celebrate this win!`;
  } else if (timeOfDay === "afternoon" && tasksRemaining > 3) {
    userMessage = `It's afternoon and ${userName} has ${tasksRemaining} tasks left. Current streak: ${currentStreak} days. Send an encouraging push message.`;
  } else if (timeOfDay === "evening" && tasksRemaining > 0) {
    userMessage = `Evening time! ${userName} has ${tasksRemaining} tasks remaining. Send a focused wind-down message to finish strong.`;
  } else {
    userMessage = `${userName} is on a ${currentStreak}-day streak with ${tasksRemaining} tasks left. Send a quick encouraging message.`;
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "You've got this!";

    let type: CoachMessageType = "encouragement";
    if (isProcrastinating) type = "procrastination";
    else if (tasksRemaining === 0) type = "celebration";
    else if (timeOfDay === "afternoon" && tasksRemaining > 3) type = "tip";

    return { text: responseText.trim(), type };
  } catch (error) {
    console.error("AI Coach error:", error);

    const fallbackMessages = [
      { text: "Every task you complete is a brick in the foundation of your future. Let's build! 💪", type: "encouragement" as CoachMessageType },
      { text: "Your brain is wired for greatness. Time to prove it! ⚡", type: "encouragement" as CoachMessageType },
      { text: "Small wins stack up fast. What's one thing you can crush right now?", type: "tip" as CoachMessageType },
    ];

    return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
  }
}

export async function getCompletionCelebration(taskTitle: string, streak: number): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are APERIFY Coach. Celebrate task completions briefly and enthusiastically. Max 1-2 sentences. Use emojis.",
        },
        {
          role: "user",
          content: `User just completed "${taskTitle}" and is on a ${streak}-day streak! Give a quick celebration message.`,
        },
      ],
      max_tokens: 100,
      temperature: 0.9,
    });

    return chatCompletion.choices[0]?.message?.content || "Boom! Another one crushed! 🔥";
  } catch {
    return "Boom! Another one crushed! 🔥";
  }
}
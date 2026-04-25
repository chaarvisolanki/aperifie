import "next-auth";
import { handlers } from "@/auth";

export async function getAuthSession() {
  const session = await (handlers as any).auth?.();
  return session;
}
import { Zap } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet to-violet/60 shadow-glow-violet mb-6">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-display font-bold text-text-primary mb-2">404</h1>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Page not found</h2>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-xl font-medium hover:bg-violet/80 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
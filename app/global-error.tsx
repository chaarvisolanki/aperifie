"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-void text-text-primary antialiased flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-display font-bold text-violet mb-4">Oops!</h1>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Something went wrong</h2>
          <p className="text-text-secondary mb-6">{error.message}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-violet text-white rounded-xl font-medium hover:bg-violet/80 transition-colors"
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}

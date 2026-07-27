import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl border bg-muted/40">
          <span className="text-4xl font-bold">404</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-4 text-muted-foreground">
          Looks like the page you're looking for doesn't exist or has been
          moved.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
import { Hammer } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
          <Hammer className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Forge Dashboard
        </h1>

        <p className="mt-4 max-w-md text-muted-foreground">
          Welcome to Forge. Your dashboard is currently under construction.
          Soon you'll be able to solve production-grade bugs, track your
          progress, and manage projects from here.
        </p>
    </div>
    </main>
  );
}
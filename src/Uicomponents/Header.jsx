import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              TrainConnect Pro
            </Link>
          </div>
          <div className="ml-10 space-x-4">
            <Button variant="outline">
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

import { Feather } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link className="flex items-center" href="#">
              <Feather className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">
                MindScribe
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Exploring ideas, one post at a time.
            </p>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

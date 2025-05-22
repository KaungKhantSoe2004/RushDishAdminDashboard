import { FaServer, FaExclamationTriangle, FaSync } from "react-icons/fa";
import Button from "../../components/Button";
// Adjust import based on your setup

export default function InternalServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-white p-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <FaServer className="text-6xl text-rose-500" />
            <div className="absolute -top-2 -right-2">
              <FaExclamationTriangle className="text-2xl text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-800">500</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Internal Server Error
          </h2>
          <p className="text-gray-500">
            Oops! Something went wrong on our end. Our team has been notified
            and we're working to fix it.
          </p>
        </div>

        <div className="pt-4">
          <Button
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700"
            onClick={() => window.location.reload()}
          >
            <FaSync />
            Try Again
          </Button>
        </div>

        <div className="pt-6 text-sm text-gray-400">
          <p>Need immediate assistance?</p>
          <a
            href="mailto:support@example.com"
            className="text-rose-600 hover:underline"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}

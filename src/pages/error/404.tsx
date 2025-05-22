import { FaSearch, FaHome, FaCompass } from "react-icons/fa";
import Button from "../../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="relative inline-block">
          <FaSearch className="text-6xl text-gray-400" />
          <div className="absolute -top-2 -right-2">
            <div className="w-4 h-4 rounded-full bg-rose-500"></div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button className="inline-flex items-center gap-2 w-full sm:w-auto">
            <FaHome />
            Go Home
          </Button>
          <Button
            variant="outline"
            className="inline-flex items-center gap-2 w-full sm:w-auto"
          >
            <FaCompass />
            Explore Dashboard
          </Button>
        </div>

        <div className="pt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">
                Quick Links
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4">
            {["Reports", "Analytics", "Stores", "Settings"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-rose-600 hover:underline"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


import { Target } from "lucide-react";

const ErrorState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Plan Not Found</h2>
        <p className="text-gray-600">The meal plan you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default ErrorState;

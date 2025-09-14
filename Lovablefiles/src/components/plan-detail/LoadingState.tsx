
import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-gray-600">Loading your meal plan...</p>
      </div>
    </div>
  );
};

export default LoadingState;


import { ChefHat } from "lucide-react";

const EmptyMealsState = () => {
  return (
    <div className="text-center py-12">
      <div className="animate-pulse">
        <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Meals are being prepared
      </h3>
      <p className="text-gray-600">
        Your personalized meal details are being generated. Please check back in a few minutes.
      </p>
    </div>
  );
};

export default EmptyMealsState;

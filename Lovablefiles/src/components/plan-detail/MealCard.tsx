
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Apple } from "lucide-react";
import { Meal } from "@/lib/api";

interface MealCardProps {
  mealType: string;
  meal: Meal;
}

const MealCard = ({ mealType, meal }: MealCardProps) => {
  // Add safety checks for meal data
  if (!meal) {
    return (
      <Card className="hover:shadow-md transition-all duration-300 hover:scale-105">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No meal data available</p>
        </CardContent>
      </Card>
    );
  }

  const getMealIcon = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '🌞';
      case 'dinner':
        return '🌙';
      case 'snacks':
        return '🍎';
      default:
        return '🍽️';
    }
  };

  // Handle ingredients whether they come as string or array
  const getIngredients = (ingredients: string | string[]) => {
    if (typeof ingredients === 'string') {
      // Split by comma and clean up whitespace
      return ingredients.split(',').map(ingredient => ingredient.trim());
    }
    return Array.isArray(ingredients) ? ingredients : [];
  };

  const ingredients = getIngredients(meal.ingredients);

  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg capitalize flex items-center">
          <span className="mr-2">{getMealIcon(mealType)}</span>
          {mealType}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="font-semibold text-gray-900">
          {meal.name || 'Untitled Meal'}
        </h4>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <Flame className="h-4 w-4 mr-1 text-orange-500" />
            {meal.calories || 0} cal
          </div>
          <div className="text-sm text-gray-600">
            P: {meal.protein || 0}g
          </div>
          <div className="text-sm text-gray-600">
            C: {meal.carbs || 0}g
          </div>
          <div className="text-sm text-gray-600">
            F: {meal.fat || 0}g
          </div>
          {meal.fiber && (
            <div className="text-sm text-gray-600">
              Fiber: {meal.fiber}g
            </div>
          )}
        </div>
        
        <div>
          <h5 className="font-medium text-gray-900 mb-2 flex items-center">
            <Apple className="h-4 w-4 mr-1" />
            Ingredients:
          </h5>
          <div className="flex flex-wrap gap-1">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {ingredient}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">No ingredients listed</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;

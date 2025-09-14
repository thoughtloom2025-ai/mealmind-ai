
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DailyMeals } from "@/lib/api";

interface DailySummaryProps {
  dayMeal: DailyMeals;
}

const DailySummary = ({ dayMeal }: DailySummaryProps) => {
  const calculateDailyTotals = () => {
    const meals = [dayMeal.breakfast, dayMeal.lunch, dayMeal.dinner, dayMeal.snacks];
    return meals.reduce((totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fat: totals.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const totals = calculateDailyTotals();
  const targetCalories = 2000; // This could be dynamic based on user profile

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Daily Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{totals.calories}</div>
            <div className="text-sm text-gray-600">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totals.protein}g</div>
            <div className="text-sm text-gray-600">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totals.carbs}g</div>
            <div className="text-sm text-gray-600">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totals.fat}g</div>
            <div className="text-sm text-gray-600">Fat</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span>{Math.round((totals.calories / targetCalories) * 100)}% of target</span>
          </div>
          <Progress value={Math.min((totals.calories / targetCalories) * 100, 100)} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySummary;

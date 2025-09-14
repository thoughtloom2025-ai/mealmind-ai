
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar as CalendarIcon, List, ShoppingCart } from "lucide-react";
import { DailyMeals } from "@/lib/api";
import MealCard from "./MealCard";
import DailySummary from "./DailySummary";
import CalendarView from "./CalendarView";

interface DayTabsProps {
  meals: DailyMeals[];
  onDownloadPDF: () => void;
  onDownloadIngredients: () => void;
}

const DayTabs = ({ meals, onDownloadPDF, onDownloadIngredients }: DayTabsProps) => {
  const [viewMode, setViewMode] = useState<'tabs' | 'calendar'>('tabs');
  
  console.log("DayTabs - Meals data:", meals);

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No meals found for this plan.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="animate-bounce-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Daily Meal Plans</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'tabs' ? 'default' : 'outline'}
            onClick={() => setViewMode('tabs')}
            size="sm"
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            onClick={() => setViewMode('calendar')}
            size="sm"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button 
            onClick={onDownloadIngredients}
            variant="outline"
            className="text-green-600 hover:bg-green-50"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ingredients List
          </Button>
          <Button 
            onClick={onDownloadPDF}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download as PDF
          </Button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <CalendarView meals={meals} />
      ) : (
        <Tabs defaultValue="day-1" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-6">
            {meals.map((dayMeal) => (
              <TabsTrigger 
                key={dayMeal.day} 
                value={`day-${dayMeal.day}`}
                className="text-xs transition-all duration-300 hover:scale-105"
              >
                Day {dayMeal.day}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {meals.map((dayMeal) => (
            <TabsContent 
              key={dayMeal.day} 
              value={`day-${dayMeal.day}`}
              className="space-y-6 animate-fade-in"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Day {dayMeal.day}
                </h3>
                <p className="text-gray-600">
                  {formatDate(dayMeal.date)}
                </p>
              </div>
              
              <DailySummary dayMeal={dayMeal} />
              
              <div className="grid md:grid-cols-2 gap-6">
                {dayMeal.breakfast && (
                  <MealCard 
                    key="breakfast"
                    mealType="breakfast"
                    meal={dayMeal.breakfast}
                  />
                )}
                {dayMeal.lunch && (
                  <MealCard 
                    key="lunch"
                    mealType="lunch"
                    meal={dayMeal.lunch}
                  />
                )}
                {dayMeal.snacks && (
                  <MealCard 
                    key="snacks"
                    mealType="snacks"
                    meal={dayMeal.snacks}
                  />
                )}
                {dayMeal.dinner && (
                  <MealCard 
                    key="dinner"
                    mealType="dinner"
                    meal={dayMeal.dinner}
                  />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default DayTabs;

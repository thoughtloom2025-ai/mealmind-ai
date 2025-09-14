
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyMeals } from "@/lib/api";
import MealCard from "./MealCard";
import DailySummary from "./DailySummary";

interface CalendarViewProps {
  meals: DailyMeals[];
}

const CalendarView = ({ meals }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    meals.length > 0 ? new Date(meals[0].date) : undefined
  );

  // Find the meal data for the selected date
  const getSelectedDayMeal = () => {
    if (!selectedDate) return null;
    
    const dateString = selectedDate.toISOString().split('T')[0];
    return meals.find(meal => meal.date === dateString);
  };

  const selectedDayMeal = getSelectedDayMeal();

  // Get the available dates from the meal plan
  const availableDates = meals.map(meal => new Date(meal.date));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar Section */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              available: availableDates,
            }}
            modifiersStyles={{
              available: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              },
            }}
            disabled={(date) => {
              const dateString = date.toISOString().split('T')[0];
              return !meals.some(meal => meal.date === dateString);
            }}
          />
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium">Available dates are highlighted</p>
            <p>Select a date to view the meal plan</p>
          </div>
        </CardContent>
      </Card>

      {/* Meal Details Section */}
      <div className="lg:col-span-2">
        {selectedDayMeal ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Day {selectedDayMeal.day}
              </h3>
              <p className="text-gray-600">
                {formatDate(selectedDayMeal.date)}
              </p>
            </div>
            
            <DailySummary dayMeal={selectedDayMeal} />
            
            <div className="grid md:grid-cols-2 gap-6">
              {selectedDayMeal.breakfast && (
                <MealCard 
                  key="breakfast"
                  mealType="breakfast"
                  meal={selectedDayMeal.breakfast}
                />
              )}
              {selectedDayMeal.lunch && (
                <MealCard 
                  key="lunch"
                  mealType="lunch"
                  meal={selectedDayMeal.lunch}
                />
              )}
              {selectedDayMeal.snacks && (
                <MealCard 
                  key="snacks"
                  mealType="snacks"
                  meal={selectedDayMeal.snacks}
                />
              )}
              {selectedDayMeal.dinner && (
                <MealCard 
                  key="dinner"
                  mealType="dinner"
                  meal={selectedDayMeal.dinner}
                />
              )}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a Date
              </h3>
              <p className="text-gray-600">
                Choose a date from the calendar to view your meal plan for that day
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CalendarView;

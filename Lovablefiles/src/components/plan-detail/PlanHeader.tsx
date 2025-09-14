import { Calendar, Clock, Utensils, Target, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MealPlan } from "@/lib/api";

interface PlanHeaderProps {
  plan: MealPlan;
}

const PlanHeader = ({ plan }: PlanHeaderProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGoalColor = (goal: string) => {
    switch (goal.toLowerCase()) {
      case 'weight loss':
        return 'bg-red-100 text-red-800';
      case 'muscle gain':
        return 'bg-blue-100 text-blue-800';
      case 'diabetes':
        return 'bg-purple-100 text-purple-800';
      case 'fitness':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get diet preference from either diet or diet_preference field
  const dietPreference = plan.diet || plan.diet_preference || 'Not specified';

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {plan.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Starts {formatDate(plan.start_date)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {plan.duration} days
            </div>
            <div className="flex items-center">
              <Utensils className="h-4 w-4 mr-1" />
              {dietPreference}
            </div>
          </div>
        </div>
        
        <Badge className={`${getGoalColor(plan.goal)} text-sm px-3 py-1`}>
          {plan.goal}
        </Badge>
      </div>
    </div>
  );
};

export default PlanHeader;

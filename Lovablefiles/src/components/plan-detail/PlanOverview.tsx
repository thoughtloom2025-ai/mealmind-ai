
import { Card, CardContent } from "@/components/ui/card";
import { Target, ChefHat, Calendar } from "lucide-react";
import { MealPlan } from "@/lib/api";

interface PlanOverviewProps {
  plan: MealPlan;
}

const PlanOverview = ({ plan }: PlanOverviewProps) => {
  // Get diet preference from either diet or diet_preference field
  const dietPreference = plan.diet || plan.diet_preference || 'Not specified';

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8 animate-slide-up">
      <Card>
        <CardContent className="p-6 text-center">
          <Target className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Goal</h3>
          <p className="text-gray-600 capitalize">{plan.goal}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <ChefHat className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Diet</h3>
          <p className="text-gray-600 capitalize">{dietPreference}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Duration</h3>
          <p className="text-gray-600">{plan.duration} Days</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanOverview;

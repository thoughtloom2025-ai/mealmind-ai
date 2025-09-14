
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getPlanDetails } from "@/lib/api";
import { generateMealPlanPDF } from "@/lib/pdfGenerator";
import { generateIngredientListPDF } from "@/lib/ingredientListGenerator";
import PlanHeader from "@/components/plan-detail/PlanHeader";
import PlanOverview from "@/components/plan-detail/PlanOverview";
import DayTabs from "@/components/plan-detail/DayTabs";
import EmptyMealsState from "@/components/plan-detail/EmptyMealsState";
import LoadingState from "@/components/plan-detail/LoadingState";
import ErrorState from "@/components/plan-detail/ErrorState";

const PlanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log("PlanDetailPage - Plan ID:", id);

  const { data: plan, isLoading, error } = useQuery({
    queryKey: ['plan', id],
    queryFn: () => getPlanDetails(id!),
    enabled: !!id,
  });

  console.log("PlanDetailPage - Plan data:", plan);
  console.log("PlanDetailPage - Loading:", isLoading);
  console.log("PlanDetailPage - Error:", error);

  const handleDownloadPDF = () => {
    if (!plan) {
      toast({
        title: "Error",
        description: "No plan data available to download",
        variant: "destructive",
      });
      return;
    }

    try {
      generateMealPlanPDF(plan);
      toast({
        title: "Success!",
        description: "PDF downloaded successfully!",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadIngredients = () => {
    if (!plan) {
      toast({
        title: "Error",
        description: "No plan data available to download",
        variant: "destructive",
      });
      return;
    }

    try {
      generateIngredientListPDF(plan);
      toast({
        title: "Success!",
        description: "Ingredients list downloaded successfully!",
      });
    } catch (error) {
      console.error("Error generating ingredients list:", error);
      toast({
        title: "Error",
        description: "Failed to generate ingredients list. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !plan) {
    console.error("Error loading plan:", error);
    return <ErrorState />;
  }

  if (!plan.meals || plan.meals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          
          <PlanHeader plan={plan} />
          <PlanOverview plan={plan} />
          <EmptyMealsState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        <PlanHeader plan={plan} />
        <PlanOverview plan={plan} />
        <DayTabs 
          meals={plan.meals} 
          onDownloadPDF={handleDownloadPDF}
          onDownloadIngredients={handleDownloadIngredients}
        />
      </div>
    </div>
  );
};

export default PlanDetailPage;

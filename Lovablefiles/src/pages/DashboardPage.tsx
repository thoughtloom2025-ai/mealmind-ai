import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Plus, Calendar, Target, Clock, ArrowRight, Loader2, RefreshCw, User } from "lucide-react";
import { Link } from "react-router-dom";
import { ApiService, MealPlan } from "@/lib/api";
import { AuthService } from "@/lib/auth";

const DashboardPage = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = AuthService.getUser();

  const fetchMealPlans = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const plans = await ApiService.getUserPlans();
      setMealPlans(plans);
    } catch (error) {
      console.error("Failed to fetch meal plans:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const handleRefresh = () => {
    fetchMealPlans(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGoalIcon = (goal: string) => {
    switch (goal.toLowerCase()) {
      case 'weight loss':
        return '🏃‍♀️';
      case 'muscle gain':
        return '💪';
      case 'diabetes':
        return '🩺';
      case 'fitness':
        return '🏋️‍♂️';
      default:
        return '🎯';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || user?.email}! 👋
            </h1>
            <p className="text-gray-600">
              Manage your personalized meal plans and track your health journey.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 animate-slide-up">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-blue-500/5">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Ready for your next meal plan?
                    </h2>
                    <p className="text-gray-600">
                      Create a new personalized meal plan tailored to your goals.
                    </p>
                  </div>
                  <Button asChild size="lg" className="sm:ml-4">
                    <Link to="/create-plan">
                      <Plus className="mr-2 h-5 w-5" />
                      Create New Plan
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meal Plans Grid */}
          <div className="animate-bounce-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Meal Plans</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                {mealPlans.length > 0 && (
                  <Button variant="outline" asChild>
                    <Link to="/create-plan">
                      <Plus className="mr-2 h-4 w-4" />
                      New Plan
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-gray-600">Loading your meal plans...</span>
              </div>
            ) : mealPlans.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      You haven't created any plans yet!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get started by creating your first AI-powered meal plan 
                      tailored to your health goals.
                    </p>
                    <Button asChild>
                      <Link to="/create-plan">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Plan
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mealPlans.map((plan, index) => (
                  <Card 
                    key={plan.id} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          🏷️ <span className="ml-2">{plan.title}</span>
                        </CardTitle>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <CardDescription className="capitalize">
                        🎯 {plan.goal} • 🥗 {plan.diet_preference}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          📅 Starts {formatDate(plan.start_date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          ⏳ {plan.duration} days
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          👤 User ID: {plan.user_id}
                        </div>
                        <div className="pt-2">
                          <Button 
                            asChild 
                            size="sm" 
                            className="w-full"
                            variant="outline"
                          >
                            <Link to={`/plan/${plan.id}`}>
                              🔘 View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Stats Cards */}
          {mealPlans.length > 0 && (
            <div className="mt-12 grid md:grid-cols-3 gap-6 animate-slide-up">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {mealPlans.length}
                  </div>
                  <p className="text-gray-600">Total Plans Created</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {mealPlans.reduce((acc, plan) => acc + plan.duration, 0)}
                  </div>
                  <p className="text-gray-600">Total Days Planned</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(mealPlans.map(plan => plan.goal)).size}
                  </div>
                  <p className="text-gray-600">Different Goals</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

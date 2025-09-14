
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from "@/components/Navbar";
import { CalendarIcon, Loader2, Target, Users, Activity } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ApiService, CreatePlanData } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const CreatePlanPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState<Partial<CreatePlanData>>({
    title: "",
    duration: 7,
    goal: "",
    diet_preference: "",
    allergies: "",
    health_conditions: "",
    lifestyle: "",
    gender: "",
    age: undefined,
    height: undefined,
    weight: undefined,
    activity_level: "moderate",
  });

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.title || !formData.goal || !formData.diet_preference) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const planData: CreatePlanData = {
        ...formData as CreatePlanData,
        start_date: format(date, "yyyy-MM-dd"),
      };

      console.log("Sending plan data:", planData);
      const response = await ApiService.createMealPlan(planData);
      console.log("Plan created successfully:", response);
      
      // Extract plan_id from response
      if (response.plan_id) {
        toast({
          title: "Success!",
          description: "Meal plan created successfully!",
        });
        
        navigate(`/plan/${response.plan_id}`);
      } else {
        console.error("No plan_id in response:", response);
        toast({
          title: "Error",
          description: "Plan created but unable to navigate. Missing plan ID.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create meal plan:", error);
      toast({
        title: "Error",
        description: "Failed to create meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof CreatePlanData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Personalized Meal Plan
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tell us about your goals, preferences, and lifestyle so our AI can 
              create the perfect meal plan for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Start with the fundamentals of your meal plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Plan Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., My Weight Loss Journey"
                      value={formData.title}
                      onChange={(e) => updateFormData("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (Days)</Label>
                    <Select 
                      value={formData.duration?.toString()} 
                      onValueChange={(value) => updateFormData("duration", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 Days (1 Week)</SelectItem>
                        <SelectItem value="14">14 Days (2 Weeks)</SelectItem>
                        <SelectItem value="21">21 Days (3 Weeks)</SelectItem>
                        <SelectItem value="30">30 Days (1 Month)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal">Health Goal *</Label>
                    <Select 
                      value={formData.goal} 
                      onValueChange={(value) => updateFormData("goal", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle gain">Muscle Gain</SelectItem>
                        <SelectItem value="fitness">General Fitness</SelectItem>
                        <SelectItem value="diabetes">Diabetes Management</SelectItem>
                        <SelectItem value="heart health">Heart Health</SelectItem>
                        <SelectItem value="maintenance">Weight Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diet_preference">Diet Preference *</Label>
                  <Select 
                    value={formData.diet_preference} 
                    onValueChange={(value) => updateFormData("diet_preference", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="omnivore">Omnivore (All foods)</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="low carb">Low Carb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Personal Details */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Personal Details
                </CardTitle>
                <CardDescription>
                  Help us calculate your nutritional needs accurately
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => updateFormData("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 30"
                      value={formData.age || ""}
                      onChange={(e) => updateFormData("age", parseInt(e.target.value) || undefined)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 170"
                      value={formData.height || ""}
                      onChange={(e) => updateFormData("height", parseInt(e.target.value) || undefined)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 70"
                      value={formData.weight || ""}
                      onChange={(e) => updateFormData("weight", parseInt(e.target.value) || undefined)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lifestyle & Preferences */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Lifestyle & Preferences
                </CardTitle>
                <CardDescription>
                  Additional details to personalize your meal plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="activity_level">Activity Level</Label>
                  <Select 
                    value={formData.activity_level} 
                    onValueChange={(value) => updateFormData("activity_level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (Little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (Light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (Moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (Hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very active">Very Active (Very hard exercise & physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Food Allergies & Intolerances</Label>
                  <Textarea
                    id="allergies"
                    placeholder="e.g., nuts, dairy, gluten, shellfish..."
                    value={formData.allergies}
                    onChange={(e) => updateFormData("allergies", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="health_conditions">Health Conditions</Label>
                  <Textarea
                    id="health_conditions"
                    placeholder="e.g., diabetes, hypertension, heart disease..."
                    value={formData.health_conditions}
                    onChange={(e) => updateFormData("health_conditions", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifestyle">Lifestyle Notes</Label>
                  <Textarea
                    id="lifestyle"
                    placeholder="e.g., busy schedule, frequent travel, cooking preferences..."
                    value={formData.lifestyle}
                    onChange={(e) => updateFormData("lifestyle", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center animate-bounce-in">
              <Button 
                type="submit" 
                size="lg" 
                disabled={loading}
                className="px-12 py-6 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Your Plan...
                  </>
                ) : (
                  "Generate My Meal Plan"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlanPage;

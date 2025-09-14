import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Loader2, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { FcGoogle } from "react-icons/fc"; // Import Google icon

const SignupPage = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      // Assuming AuthService.googleLogin initiates the OAuth flow and handles redirection or token exchange
      await AuthService.googleLogin(); 
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
      // Handle error display to user if necessary
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Benefits Column */}
          <div className="hidden lg:block animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Join Thousands of Happy Users
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Personalized Meal Plans</h3>
                  <p className="text-gray-600">AI-generated plans tailored to your goals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Health Goal Support</h3>
                  <p className="text-gray-600">Weight loss, fitness, diabetes management</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">7-Day Free Trial</h3>
                  <p className="text-gray-600">No credit card required to get started</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Backed</h3>
                  <p className="text-gray-600">Reviewed by certified nutritionists</p>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <Card className="w-full animate-fade-in">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription>
                Start your journey to better health today with Google
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center text-sm text-gray-600">
                We use Google OAuth for secure and easy account creation. 
                Your Google profile information will be used to personalize your experience.
              </div>

              <div className="text-xs text-gray-600 text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full"
                onClick={handleGoogleSignup}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account with Google...
                  </>
                ) : (
                  <>
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Sign Up with Google
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
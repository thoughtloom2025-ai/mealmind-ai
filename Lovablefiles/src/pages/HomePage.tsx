
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { 
  Brain, 
  Target, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Users,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Navbar transparent />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get AI-Powered 
              <span className="text-primary"> Meal Plans</span>
              <br />Tailored to Your Goals
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your health with personalized meal plans designed for weight loss, 
              fitness goals, and managing health conditions like diabetes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/signup">Start Your 7-Day Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image/Illustration Placeholder */}
          <div className="mt-16 animate-slide-up">
            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 text-center">
              <Brain className="h-24 w-24 text-primary mx-auto mb-4" />
              <p className="text-lg text-gray-600">AI-Powered Nutrition Intelligence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Mealmind AI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology meets nutrition science to create meal plans 
              that actually work for your lifestyle and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-bounce-in">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Goal-Based Planning</h3>
                <p className="text-gray-600">
                  Whether it's weight loss, muscle gain, or managing diabetes, 
                  get plans tailored to your specific health goals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-bounce-in">
              <CardContent className="p-6">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Intelligence</h3>
                <p className="text-gray-600">
                  Our advanced AI considers your preferences, allergies, and 
                  lifestyle to create truly personalized meal plans.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-bounce-in">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Duration</h3>
                <p className="text-gray-600">
                  Choose plans that fit your schedule - from weekly meal prep 
                  to long-term lifestyle changes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-bounce-in">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor your nutrition intake and track progress toward 
                  your health goals with detailed analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-bounce-in">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Health Condition Support</h3>
                <p className="text-gray-600">
                  Special meal plans designed for diabetes, heart health, 
                  and other medical dietary requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-bounce-in">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Backed</h3>
                <p className="text-gray-600">
                  All meal plans are reviewed by certified nutritionists 
                  and dietitians for optimal health outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transform Your Health Journey
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Personalized Nutrition:</strong> Every meal is calculated 
                    based on your specific needs, preferences, and health goals.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Easy to Follow:</strong> Simple recipes with common 
                    ingredients that fit into your busy lifestyle.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Science-Based:</strong> Built on the latest nutrition 
                    research and dietary guidelines from health experts.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Continuous Support:</strong> Regular updates and 
                    modifications as your body and goals change.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">Success Stories</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    "Lost 15 pounds in 2 months following the diabetes-friendly meal plan. 
                    My blood sugar is finally under control!"
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Sarah M.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    "The meal plans fit perfectly with my workout routine. 
                    Gained muscle while losing fat - exactly what I needed!"
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Mike R.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who've achieved their health goals with AI-powered meal planning.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link to="/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm opacity-75 mt-4">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Mealmind AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered personalized meal planning for a healthier you.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mealmind AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

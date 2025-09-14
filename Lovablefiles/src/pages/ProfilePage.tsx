
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { User, Settings, Crown, LogOut, Save, Edit } from "lucide-react";
import { AuthService } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = AuthService.getUser();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  const handleSave = () => {
    // In a real app, you would call an API to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Profile & Settings
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user?.name || user?.email}
                        </h3>
                        <p className="text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    
                    {!editing ? (
                      <Button 
                        variant="outline" 
                        onClick={() => setEditing(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={handleSave}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          name: e.target.value
                        })}
                        disabled={!editing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          email: e.target.value
                        })}
                        disabled={!editing}
                      />
                    </div>
                  </div>

                  {!editing && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Some profile changes may require email verification.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subscription Card */}
              <Card className="animate-bounce-in">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Crown className="mr-2 h-5 w-5 text-yellow-500" />
                    Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Badge className="mb-4" variant="secondary">
                      Free Trial
                    </Badge>
                    <p className="text-sm text-gray-600 mb-4">
                      7 days remaining in your free trial
                    </p>
                    <Button className="w-full">
                      Upgrade to Pro
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="animate-bounce-in">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Settings className="mr-2 h-5 w-5 text-primary" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Preferences</h4>
                    <div className="space-y-1">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" 
                          defaultChecked 
                        />
                        <span className="text-sm text-gray-600">Email notifications</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" 
                          defaultChecked 
                        />
                        <span className="text-sm text-gray-600">Weekly meal plan reminders</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" 
                        />
                        <span className="text-sm text-gray-600">Marketing emails</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Security</h4>
                    <Button variant="outline" size="sm" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Two-Factor Authentication
                    </Button>
                  </div>

                  <Separator />

                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="animate-bounce-in">
                <CardHeader>
                  <CardTitle className="text-lg">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      2
                    </div>
                    <p className="text-sm text-gray-600">Meal Plans Created</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      14
                    </div>
                    <p className="text-sm text-gray-600">Days Planned</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      5
                    </div>
                    <p className="text-sm text-gray-600">Days Remaining</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X,
  LogIn
} from "lucide-react";

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // TODO: Get user data from authentication context
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    matricNo: "CSC/2021/001",
    phone: "+234 801 234 5678",
    email: "john.doe@student.edu.ng",
    department: "Computer Science",
    year: "3rd Year",
    bio: "Computer Science student passionate about software development and technology. Love connecting with fellow students and sharing knowledge.",
    interests: ["Programming", "AI/ML", "Web Development", "Gaming"],
    location: "Hostel Block A, Room 204",
    joinedDate: "September 2021"
  });

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
  }, []);

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    // TODO: Save to backend via Supabase
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleInterestAdd = (interest: string) => {
    if (interest && !editData.interests.includes(interest)) {
      setEditData({
        ...editData,
        interests: [...editData.interests, interest]
      });
    }
  };

  const handleInterestRemove = (interest: string) => {
    setEditData({
      ...editData,
      interests: editData.interests.filter(i => i !== interest)
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
        <Card className="w-full max-w-md shadow-elegant text-center">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl shadow-glow mx-auto">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">Sign In Required</CardTitle>
              <CardDescription>Please sign in to view your profile</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You need to be logged in to access your profile page.
            </p>
            <div className="flex flex-col space-y-2">
              <Button variant="hero" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    {userData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{userData.fullName}</CardTitle>
                  <CardDescription className="text-lg">{userData.matricNo}</CardDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{userData.department}</Badge>
                    <Badge variant="outline">{userData.year}</Badge>
                  </div>
                </div>
              </div>
              <Button
                variant={isEditing ? "outline" : "hero"}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={editData.fullName}
                          onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="matricNo">Matric Number</Label>
                        <Input
                          id="matricNo"
                          value={editData.matricNo}
                          onChange={(e) => setEditData({...editData, matricNo: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select value={editData.department} onValueChange={(value) => setEditData({...editData, department: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Medicine">Medicine</SelectItem>
                            <SelectItem value="Business Administration">Business Administration</SelectItem>
                            <SelectItem value="Arts & Humanities">Arts & Humanities</SelectItem>
                            <SelectItem value="Sciences">Sciences</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year of Study</Label>
                        <Select value={editData.year} onValueChange={(value) => setEditData({...editData, year: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="4th Year">4th Year</SelectItem>
                            <SelectItem value="5th Year">5th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Campus Location</Label>
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) => setEditData({...editData, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.email}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.department}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.location}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Bio:</p>
                      <p>{userData.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editData.interests : userData.interests).map((interest) => (
                    <Badge 
                      key={interest} 
                      variant="secondary"
                      className={isEditing ? "cursor-pointer" : ""}
                      onClick={() => isEditing && handleInterestRemove(interest)}
                    >
                      {interest}
                      {isEditing && <X className="h-3 w-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="mt-3">
                    <Input
                      placeholder="Add interest and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleInterestAdd(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium">{userData.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Status</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ShoppingBag, 
  Car, 
  MessageSquare, 
  Calendar,
  BookOpen,
  TrendingUp,
  Bell
} from "lucide-react";

const Dashboard = () => {
  // TODO: Get user data from authentication context
  const user = {
    name: "John Doe",
    matricNo: "CSC/2021/001",
    department: "Computer Science",
    year: "3rd Year"
  };

  const quickActions = [
    {
      title: "Join Community",
      description: "Connect with fellow students",
      icon: Users,
      path: "/community",
      color: "bg-blue-500"
    },
    {
      title: "Browse UniStore",
      description: "Shop for books and supplies",
      icon: ShoppingBag,
      path: "/store",
      color: "bg-green-500"
    },
    {
      title: "Book a Ride",
      description: "Get around campus easily",
      icon: Car,
      path: "/ride",
      color: "bg-purple-500"
    },
    {
      title: "Messages",
      description: "Chat with your connections",
      icon: MessageSquare,
      path: "/messages",
      color: "bg-orange-500"
    }
  ];

  const recentActivity = [
    { action: "Joined Computer Science Forum", time: "2 hours ago", icon: Users },
    { action: "Purchased Data Structures Textbook", time: "1 day ago", icon: ShoppingBag },
    { action: "Booked ride to Main Library", time: "2 days ago", icon: Car }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-white/90">{user.matricNo} • {user.department} • {user.year}</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-card transition-smooth cursor-pointer">
              <Link to={action.path}>
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Forum Posts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Orders Placed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Rides Taken</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <Card>
            <CardContent className="p-4 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Computer Science Department Meeting</h4>
                  <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                  <p className="text-sm">Lecture Hall A</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <BookOpen className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Study Group - Data Structures</h4>
                  <p className="text-sm text-muted-foreground">Friday, 4:00 PM</p>
                  <p className="text-sm">Library Study Room 3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
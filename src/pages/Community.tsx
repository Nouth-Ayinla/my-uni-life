import { MessageSquare, Users, Calendar, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Community = () => {
  const forumCategories = [
    { name: "Computer Science", posts: 245, members: 1200, icon: "💻" },
    { name: "Engineering", posts: 189, members: 980, icon: "⚙️" },
    { name: "Business Studies", posts: 156, members: 850, icon: "📊" },
    { name: "Study Groups", posts: 324, members: 2100, icon: "📚" },
  ];

  const recentPosts = [
    {
      title: "CS301 Midterm Study Group",
      author: "Sarah M.",
      time: "2 hours ago",
      replies: 12,
      category: "Computer Science"
    },
    {
      title: "Anyone selling Engineering Textbooks?",
      author: "Mike J.",
      time: "4 hours ago",
      replies: 8,
      category: "Engineering"
    },
    {
      title: "Business Project Partners Needed",
      author: "Emma R.",
      time: "1 day ago",
      replies: 15,
      category: "Business Studies"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Hub</h1>
          <p className="text-muted-foreground">Connect, discuss, and collaborate with your fellow students</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Forums</h3>
              <p className="text-sm text-muted-foreground">Join discussions</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold">Study Groups</h3>
              <p className="text-sm text-muted-foreground">Find study partners</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-primary-glow mx-auto mb-2" />
              <h3 className="font-semibold">Events</h3>
              <p className="text-sm text-muted-foreground">Campus activities</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-4 text-center">
              <Megaphone className="h-8 w-8 text-destructive mx-auto mb-2" />
              <h3 className="font-semibold">Announcements</h3>
              <p className="text-sm text-muted-foreground">Important updates</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forum Categories */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Forums</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forumCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.members} members</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{category.posts}</p>
                        <p className="text-sm text-muted-foreground">posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-semibold text-sm mb-1 hover:text-primary cursor-pointer">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">by {post.author} • {post.time}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-secondary px-2 py-1 rounded">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{post.replies} replies</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Posts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Plus, 
  Image as ImageIcon,
  Video,
  MapPin,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Status {
  id: string;
  user: {
    name: string;
    avatar: string;
    type: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
}

const Messages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statuses, setStatuses] = useState<Status[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
    
    // Mock statuses data
    setStatuses([
      {
        id: "1",
        user: { name: "Sarah Johnson", avatar: "", type: "Student" },
        content: "Just finished my Computer Science assignment! The algorithm implementation was challenging but fun 💻",
        timestamp: "2 hours ago",
        likes: 15,
        comments: 3,
        isLiked: false
      },
      {
        id: "2",
        user: { name: "Mike's Cafeteria", avatar: "", type: "Food Vendor" },
        content: "Fresh jollof rice and chicken available now! Special student discount - ₦500 per plate 🍛",
        timestamp: "4 hours ago",
        likes: 28,
        comments: 7,
        isLiked: true
      },
      {
        id: "3",
        user: { name: "Alex Driver", avatar: "", type: "Driver" },
        content: "Heading to town from campus in 15 minutes. 2 seats available for shared ride ✋",
        timestamp: "6 hours ago",
        likes: 5,
        comments: 2,
        isLiked: false
      }
    ]);
  }, [navigate]);

  const handlePostStatus = () => {
    if (!newStatus.trim()) return;

    const newStatusObj: Status = {
      id: Date.now().toString(),
      user: { name: "You", avatar: "", type: "Student" },
      content: newStatus,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setStatuses([newStatusObj, ...statuses]);
    setNewStatus("");
    
    toast({
      title: "Status Posted",
      description: "Your status has been shared with the community.",
    });
  };

  const handleLike = (statusId: string) => {
    setStatuses(statuses.map(status => 
      status.id === statusId 
        ? { 
            ...status, 
            isLiked: !status.isLiked,
            likes: status.isLiked ? status.likes - 1 : status.likes + 1
          }
        : status
    ));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Messages & Status</h1>
          <p className="text-muted-foreground">Share updates and connect with your campus community</p>
        </div>

        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="status">Status Updates</TabsTrigger>
            <TabsTrigger value="chats">Direct Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-6">
            {/* Post Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Share a Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's happening on campus today?"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handlePostStatus}
                    disabled={!newStatus.trim()}
                    variant="hero"
                  >
                    Post Status
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Feed */}
            <div className="space-y-4">
              {statuses.map((status) => (
                <Card key={status.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={status.user.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {status.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-sm">{status.user.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {status.user.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {status.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{status.content}</p>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(status.id)}
                            className={`flex items-center space-x-1 ${
                              status.isLiked ? "text-red-500" : ""
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${status.isLiked ? "fill-current" : ""}`} />
                            <span>{status.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{status.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <Share className="h-4 w-4" />
                            <span>Share</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chats">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Direct Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Direct messaging feature will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Messages;
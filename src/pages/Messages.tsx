import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Plus, 
  Image as ImageIcon,
  Video,
  MapPin,
  Clock,
  Send,
  Search,
  MoreVertical
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

interface Chat {
  id: string;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isSent: boolean;
}

const Messages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
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
        user: { name: "Sarah Johnson", avatar: "", type: "Computer Science, Year 3" },
        content: "Just finished my machine learning project! The neural network is finally working perfectly. Anyone else struggling with backpropagation? 🤖",
        timestamp: "2h",
        likes: 21,
        comments: 8,
        isLiked: false
      },
      {
        id: "2",
        user: { name: "Mike Chen", avatar: "", type: "Business Administration, Year 2" },
        content: "Study group forming for tomorrow's marketing exam! Meeting at the library 3rd floor. Bring your notes and let's ace this together! 📚",
        timestamp: "4h",
        likes: 15,
        comments: 12,
        isLiked: false
      }
    ]);

    // Mock chats data
    setChats([
      {
        id: "1",
        user: { name: "Sarah Johnson", avatar: "", isOnline: true },
        lastMessage: "Hey, did you understand the algorithm assignment?",
        timestamp: "2 min ago",
        unread: 2
      },
      {
        id: "2",
        user: { name: "Mike Chen", avatar: "", isOnline: false },
        lastMessage: "Thanks for sharing your notes!",
        timestamp: "1 hour ago",
        unread: 0
      },
      {
        id: "3",
        user: { name: "Emma Wilson", avatar: "", isOnline: true },
        lastMessage: "Are you coming to the study group?",
        timestamp: "3 hours ago",
        unread: 1
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

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      content: newMessage,
      timestamp: "Just now",
      isSent: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    toast({
      title: "Message Sent",
      description: "Your message has been delivered.",
    });
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    // Mock messages for selected chat
    setMessages([
      {
        id: "1",
        senderId: chatId,
        content: "Hey, how are you doing?",
        timestamp: "10:30 AM",
        isSent: false
      },
      {
        id: "2",
        senderId: "current-user",
        content: "I'm good! Working on the project. How about you?",
        timestamp: "10:32 AM",
        isSent: true
      }
    ]);
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
            <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
              {/* Chat List */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Messages</CardTitle>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search conversations..." 
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[450px]">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleSelectChat(chat.id)}
                        className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                          selectedChat === chat.id ? "bg-accent" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={chat.user.avatar} />
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {chat.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {chat.user.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm truncate">{chat.user.name}</h4>
                              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                          </div>
                          {chat.unread > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Chat Window */}
              <div className="lg:col-span-2">
                {selectedChat ? (
                  <Card className="shadow-card h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chats.find(c => c.id === selectedChat)?.user.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {chats.find(c => c.id === selectedChat)?.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{chats.find(c => c.id === selectedChat)?.user.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {chats.find(c => c.id === selectedChat)?.user.isOnline ? "Online" : "Last seen recently"}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-0">
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[70%] p-3 rounded-lg ${
                                  message.isSent
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-accent text-accent-foreground"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t">
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            size="icon"
                            variant="hero"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-card h-full flex items-center justify-center">
                    <CardContent>
                      <div className="text-center">
                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">Select a conversation</h3>
                        <p className="text-sm text-muted-foreground">Choose a chat from the list to start messaging</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Messages;
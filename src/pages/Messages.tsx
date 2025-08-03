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
  MoreHorizontal
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

interface StoryUser {
  name: string;
  initial: string;
  bgColor?: string;
  isAdd?: boolean;
}

interface Post {
  id: number;
  author: string;
  department: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

const Messages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [storyUsers, setStoryUsers] = useState<StoryUser[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
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
    
    // Mock story users
    setStoryUsers([
      { name: "Your S...", initial: "+", isAdd: true },
      { name: "Sarah", initial: "S", bgColor: "bg-orange-400" },
      { name: "John", initial: "J", bgColor: "bg-gray-500" },
      { name: "Emma", initial: "E", bgColor: "bg-purple-500" },
      { name: "Mike", initial: "M", bgColor: "bg-green-500" }
    ]);

    // Mock posts data
    setPosts([
      {
        id: 1,
        author: "Sarah Johnson",
        department: "Computer Science, Year 3",
        time: "2h",
        content: "Just finished my machine learning project! The neural network is finally working perfectly. Anyone else struggling with backpropagation? 🤖",
        image: "/api/placeholder/400/200",
        likes: 24,
        comments: 8,
        shares: 3
      },
      {
        id: 2,
        author: "Mike Chen", 
        department: "Business Administration, Year 2",
        time: "4h",
        content: "Study group forming for tomorrow's marketing exam! Meeting at the library 3rd floor. Bring your notes and let's ace this together! 📚",
        likes: 15,
        comments: 12,
        shares: 5
      }
    ]);
    
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

    // Mock chats data
    setChats([
      {
        id: "1",
        name: "Sarah Johnson",
        lastMessage: "Hey, are you free for study group tonight?",
        time: "2m",
        unread: 2,
        avatar: "",
        isOnline: true
      },
      {
        id: "2", 
        name: "Mike Chen",
        lastMessage: "Thanks for the ride yesterday!",
        time: "1h",
        unread: 0,
        avatar: "",
        isOnline: false
      },
      {
        id: "3",
        name: "Emma Wilson",
        lastMessage: "Can you send me the notes from today's lecture?",
        time: "3h",
        unread: 1,
        avatar: "",
        isOnline: true
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

  const handlePostLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    // Mock messages for selected chat
    setMessages([
      {
        id: "1",
        senderId: chatId,
        content: "Hey! How are you?",
        timestamp: "10:30 AM",
        isMe: false
      },
      {
        id: "2", 
        senderId: "me",
        content: "I'm good! How about you?",
        timestamp: "10:31 AM",
        isMe: true
      },
      {
        id: "3",
        senderId: chatId,
        content: "Doing well! Are you free for study group tonight?",
        timestamp: "10:32 AM", 
        isMe: false
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
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

        <Tabs defaultValue="community" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="chats">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="space-y-6">
            {/* Stories */}
            <div className="mb-6">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {storyUsers.map((user, index) => (
                  <div key={index} className="flex flex-col items-center min-w-0 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                      user.isAdd ? 'bg-gray-200 border-2 border-dashed border-gray-400' : user.bgColor
                    }`}>
                      {user.isAdd ? <Plus className="h-5 w-5 text-gray-600" /> : user.initial}
                    </div>
                    <span className="text-xs text-gray-600 mt-1 text-center truncate w-14">
                      {user.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="bg-white shadow-sm">
                  <CardContent className="p-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gray-200 text-gray-600">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-900">{post.author}</h3>
                          <p className="text-xs text-gray-500">{post.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <span className="text-xs">{post.time}</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-3">
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-3 -mx-4">
                        <div className="bg-gray-200 h-48 flex items-center justify-center">
                          <span className="text-gray-500">Image placeholder</span>
                        </div>
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-3 border-b border-gray-100 pb-3">
                      <span>{post.likes} likes</span>
                      <div className="flex space-x-3">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-around">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center space-x-1 text-gray-600"
                        onClick={() => handlePostLike(post.id)}
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">Like</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">Comment</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                        <Share className="h-4 w-4" />
                        <span className="text-xs">Share</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Chat List */}
              <Card className="shadow-card lg:col-span-1">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle>Messages</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input placeholder="Search conversations..." className="mt-2" />
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleChatSelect(chat.id)}
                        className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-b ${
                          selectedChat === chat.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {chat.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm truncate">{chat.name}</p>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <Badge variant="default" className="bg-blue-500 text-white text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="shadow-card lg:col-span-2">
                {selectedChat ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {chats.find(c => c.id === selectedChat)?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{chats.find(c => c.id === selectedChat)?.name}</h3>
                          <p className="text-xs text-green-500">Online</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col h-[400px]">
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                                  message.isMe
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                  message.isMe ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {message.timestamp}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="border-t p-4">
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage} size="icon" variant="hero">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Select a conversation to start messaging</p>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Messages;
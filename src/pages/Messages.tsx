import { MessageSquare, Phone, Video, Send, Paperclip, Smile } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Hey, are you free for study group tonight?",
      time: "2m",
      unread: 2,
      avatar: "/api/placeholder/40/40",
      isOnline: true
    },
    {
      id: 2,
      name: "Mike Chen",
      lastMessage: "Thanks for the ride yesterday!",
      time: "1h",
      unread: 0,
      avatar: "/api/placeholder/40/40",
      isOnline: false
    },
    {
      id: 3,
      name: "Emma Wilson",
      lastMessage: "Can you send me the notes from today's lecture?",
      time: "3h",
      unread: 1,
      avatar: "/api/placeholder/40/40",
      isOnline: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
        </div>

        {/* Recent Conversations */}
        <div className="p-4 space-y-3">
          {conversations.map((conversation) => (
            <Card key={conversation.id} className="bg-white border border-gray-100 hover:bg-gray-50 cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {conversation.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              New Message
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
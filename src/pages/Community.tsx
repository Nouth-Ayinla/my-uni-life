import { Heart, MessageCircle, Share, MoreHorizontal, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Community = () => {
  const storyUsers = [
    { name: "Your S...", initial: "+", isAdd: true },
    { name: "Sarah", initial: "S", bgColor: "bg-orange-400" },
    { name: "John", initial: "J", bgColor: "bg-gray-500" },
    { name: "Emma", initial: "E", bgColor: "bg-purple-500" },
    { name: "Mike", initial: "M", bgColor: "bg-green-500" }
  ];

  const posts = [
    {
      id: 1,
      author: "Sarah Johnson",
      department: "Computer Science, Year 3",
      time: "2h",
      content: "Just finished my machine learning project! The neural network is finally working perfectly. Anyone else struggling with backpropagation? 🤖",
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
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
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
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
      </div>
    </div>
  );
};

export default Community;
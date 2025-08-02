import { Search, ShoppingCart, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Store = () => {
  const campusStoreItems = [
    {
      id: 1,
      title: "Official University T-Shirt",
      price: "N8,500",
      rating: 4.9,
      category: "Apparel",
      tag: "Official",
      isLiked: false
    },
    {
      id: 2,
      title: "University Notebook Set",
      price: "N12,000",
      rating: 4.7,
      category: "Books",
      tag: "Official",
      isLiked: false
    },
    {
      id: 3,
      title: "University Water Bottle",
      price: "N3,500",
      rating: 4.8,
      category: "Accessories",
      tag: "Official",
      isLiked: false
    },
    {
      id: 4,
      title: "Semester Meal Plan",
      price: "N85,000",
      rating: 4.5,
      category: "Meal Plans",
      tag: "Official",
      isLiked: false
    }
  ];

  const studentStoreItems = [
    {
      id: 5,
      title: "iPhone 13 Pro Max",
      price: "N295,000",
      rating: 4.2,
      category: "Gadgets",
      isLiked: false
    },
    {
      id: 6,
      title: "Home-Cooked Jollof Rice",
      price: "N1,200",
      rating: 4.8,
      category: "Food",
      isLiked: false
    },
    {
      id: 7,
      title: "GST 102 Textbook",
      price: "N500",
      rating: 4.6,
      category: "Educational Materials",
      isLiked: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header and Search */}
        <div className="mb-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search store items..." 
              className="pl-10 bg-white"
            />
            <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="h-4 w-4" />
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
            </Button>
          </div>
        </div>

        {/* Store Tabs */}
        <Tabs defaultValue="campus" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="campus" className="text-xs">Campus Store</TabsTrigger>
            <TabsTrigger value="student" className="text-xs">Student Store</TabsTrigger>
            <TabsTrigger value="campus2" className="text-xs">Campus</TabsTrigger>
          </TabsList>

          {/* New Gadgets Banner */}
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-4 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-lg font-semibold">New Gadgets!</h2>
              <p className="text-sm opacity-90">Latest tech arrivals</p>
            </div>
            <div className="absolute right-0 top-0 w-16 h-16 bg-yellow-400 rounded-full -translate-y-2 translate-x-6"></div>
          </div>

          <TabsContent value="campus" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {campusStoreItems.map((item) => (
                <Card key={item.id} className="bg-white shadow-sm relative">
                  <CardContent className="p-3">
                    <div className="absolute top-2 right-2">
                      <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                    </div>
                    
                    <div className="bg-gray-100 h-24 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Image</span>
                    </div>

                    {item.tag && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                        {item.tag}
                      </span>
                    )}
                    
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{item.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="student" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {studentStoreItems.map((item) => (
                <Card key={item.id} className="bg-white shadow-sm relative">
                  <CardContent className="p-3">
                    <div className="absolute top-2 right-2">
                      <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                    </div>
                    
                    <div className="bg-gray-100 h-24 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Image</span>
                    </div>
                    
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{item.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campus2" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <p>More campus items coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Store;
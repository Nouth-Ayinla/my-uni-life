import { useState } from "react";
import { Search, Filter, ShoppingCart, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Store = () => {
  const [activeTab, setActiveTab] = useState("campus");

  const campusCategories = [
    { name: "Apparel", count: 45, icon: "👕" },
    { name: "Books", count: 78, icon: "📚" },
    { name: "Accessories", count: 32, icon: "🎒" },
    { name: "Food", count: 23, icon: "🍕" },
  ];

  const studentCategories = [
    { name: "Gadgets", count: 89, icon: "💻" },
    { name: "Educational Materials", count: 156, icon: "📚" },
    { name: "Food", count: 45, icon: "🍽️" },
    { name: "Books", count: 67, icon: "📖" },
  ];

  const campusStoreItems = [
    {
      id: 1,
      title: "Official University Water Bottle",
      price: "₦3,500",
      originalPrice: "",
      rating: 4.8,
      reviews: 67,
      seller: "Official",
      image: "🧴",
      condition: "New",
      category: "Accessories"
    },
    {
      id: 2,
      title: "Semester Meal Plans",
      price: "₦85,000",
      originalPrice: "",
      rating: 4.5,
      reviews: 234,
      seller: "Meal Plans",
      image: "🍽️",
      condition: "New",
      category: "Meal Plans"
    }
  ];

  const studentStoreItems = [
    {
      id: 3,
      title: "iPhone 13 Pro Max",
      price: "₦295,000",
      originalPrice: "",
      rating: 4.2,
      reviews: 15,
      seller: "Gadgets",
      image: "📱",
      condition: "Used",
      category: "Gadgets"
    },
    {
      id: 4,
      title: "Home-Cooked Meals",
      price: "₦1,200",
      originalPrice: "",
      rating: 4.8,
      reviews: 89,
      seller: "Food",
      image: "🍲",
      condition: "Fresh",
      category: "Food"
    },
    {
      id: 5,
      title: "GST 102 Textbook",
      price: "₦500",
      originalPrice: "",
      rating: 4.6,
      reviews: 23,
      seller: "Educational Materials",
      image: "📚",
      condition: "Used",
      category: "Educational Materials"
    }
  ];

  const vendors = [
    { name: "Campus Bookstore", rating: 4.8, products: 234 },
    { name: "Tech Corner", rating: 4.9, products: 89 },
    { name: "Student Supplies", rating: 4.7, products: 156 },
    { name: "Quick Bites", rating: 4.6, products: 67 }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Campus Store</h1>
          <p className="text-muted-foreground">Your campus marketplace for everything you need</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search store items..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <Badge variant="destructive" className="ml-1">3</Badge>
          </Button>
        </div>

        {/* Store Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="campus" className="flex items-center gap-2">
              Campus Store
            </TabsTrigger>
            <TabsTrigger value="student" className="flex items-center gap-2">
              Student Store
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campus" className="space-y-6 mt-8">
            {/* New Gadgets Banner */}
            <Card className="bg-gradient-primary text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">New Gadgets!</h3>
                    <p className="text-white/90">Latest tech arrivals</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {campusCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-card transition-smooth cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <span className="text-3xl mb-2 block">{category.icon}</span>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Campus Store Items */}
            <div className="grid md:grid-cols-2 gap-6">
              {campusStoreItems.map((item) => (
                <Card key={item.id} className="hover:shadow-card transition-smooth cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-center flex-1">
                        <span className="text-6xl">{item.image}</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-primary">{item.price}</span>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.reviews})</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.condition}</span>
                    </div>
                    
                    <Button variant="hero" size="sm" className="w-full">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="student" className="space-y-6 mt-8">
            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {studentCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-card transition-smooth cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <span className="text-3xl mb-2 block">{category.icon}</span>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Student Store Items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentStoreItems.map((item) => (
                <Card key={item.id} className="hover:shadow-card transition-smooth cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-center flex-1">
                        <span className="text-6xl">{item.image}</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-primary">{item.price}</span>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.reviews})</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.condition}</span>
                    </div>
                    
                    <Button variant="hero" size="sm" className="w-full">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid lg:grid-cols-4 gap-8 mt-8">

          {/* Trusted Vendors */}
          <div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Trusted Vendors</h3>
                <div className="space-y-4">
                  {vendors.map((vendor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{vendor.name}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{vendor.rating}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{vendor.products} items</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Vendors
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
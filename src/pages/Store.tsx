import { Search, Filter, ShoppingCart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Store = () => {
  const categories = [
    { name: "Textbooks", count: 156, icon: "📚" },
    { name: "Electronics", count: 89, icon: "💻" },
    { name: "Stationery", count: 234, icon: "✏️" },
    { name: "Food & Drinks", count: 67, icon: "🍕" },
    { name: "Services", count: 45, icon: "🔧" },
    { name: "Clothing", count: 123, icon: "👕" },
  ];

  const featuredItems = [
    {
      id: 1,
      title: "Calculus Textbook - 12th Edition",
      price: "$45",
      originalPrice: "$120",
      rating: 4.8,
      reviews: 23,
      seller: "John D.",
      image: "📘",
      condition: "Like New"
    },
    {
      id: 2,
      title: "MacBook Pro 13-inch (2021)",
      price: "$800",
      originalPrice: "$1,200",
      rating: 4.9,
      reviews: 15,
      seller: "Sarah K.",
      image: "💻",
      condition: "Excellent"
    },
    {
      id: 3,
      title: "Engineering Drawing Set",
      price: "$25",
      originalPrice: "$40",
      rating: 4.7,
      reviews: 31,
      seller: "Mike L.",
      image: "📐",
      condition: "Good"
    },
    {
      id: 4,
      title: "Campus Meal Plan - Weekly",
      price: "$35",
      originalPrice: "$50",
      rating: 4.6,
      reviews: 89,
      seller: "Campus Cafe",
      image: "🍽️",
      condition: "New"
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
          <h1 className="text-3xl font-bold text-foreground mb-2">UniStore</h1>
          <p className="text-muted-foreground">Your campus marketplace for everything you need</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for textbooks, electronics, services..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Cart (0)
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-card transition-smooth cursor-pointer">
                <CardContent className="p-4 text-center">
                  <span className="text-3xl mb-2 block">{category.icon}</span>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Featured Items */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Featured Items</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-card transition-smooth cursor-pointer">
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <span className="text-6xl">{item.image}</span>
                    </div>
                    
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">{item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                      </div>
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                        {item.condition}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.reviews})</span>
                      </div>
                      <span className="text-sm text-muted-foreground">by {item.seller}</span>
                    </div>
                    
                    <Button variant="hero" size="sm" className="w-full">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

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
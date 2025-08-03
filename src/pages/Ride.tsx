import { MapPin, Clock, Users, Star, Car, Bike } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Ride = () => {
  const rideOptions = [
    {
      type: "Campus Shuttle",
      icon: <Car className="h-6 w-6" />,
      price: "$2.00",
      time: "5-8 min",
      capacity: "15 seats",
      description: "Regular shuttle service"
    },
    {
      type: "Bike Share",
      icon: <Bike className="h-6 w-6" />,
      price: "$1.50",
      time: "Instant",
      capacity: "1 person",
      description: "Quick campus bike rental"
    },
    {
      type: "Student Carpool",
      icon: <Users className="h-6 w-6" />,
      price: "$3.00",
      time: "10-15 min",
      capacity: "3-4 seats",
      description: "Shared ride with students"
    }
  ];

  const popularRoutes = [
    { from: "Main Gate", to: "Library", rides: 45, price: "$2.00" },
    { from: "Hostel Block A", to: "Engineering Faculty", rides: 38, price: "$2.50" },
    { from: "Sports Complex", to: "Main Campus", rides: 29, price: "$2.00" },
    { from: "Cafeteria", to: "Lecture Halls", rides: 56, price: "$1.50" }
  ];

  const activeDrivers = [
    {
      name: "James Wilson",
      rating: 4.9,
      rides: 234,
      vehicle: "Toyota Corolla",
      location: "Near Library",
      eta: "3 min"
    },
    {
      name: "Maria Garcia",
      rating: 4.8,
      rides: 189,
      vehicle: "Honda Civic",
      location: "Main Gate",
      eta: "5 min"
    },
    {
      name: "David Chen",
      rating: 4.9,
      rides: 312,
      vehicle: "Campus Shuttle",
      location: "Engineering Block",
      eta: "2 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">UniRide</h1>
          <p className="text-muted-foreground">Safe and affordable transportation around campus</p>
        </div>

        {/* Booking Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Book Your Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter pickup location" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Drop-off Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter destination" className="pl-10" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Now</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">1 passenger</span>
              </div>
            </div>
            
            <Button variant="hero" size="lg" className="w-full md:w-auto">
              Find Rides
            </Button>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ride Options */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Available Ride Options</h2>
            <div className="space-y-4 mb-8">
              {rideOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-card transition-smooth cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{option.type}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs flex items-center">
                              <Clock className="h-3 w-3 mr-1" />{option.time}
                            </span>
                            <span className="text-xs flex items-center">
                              <Users className="h-3 w-3 mr-1" />{option.capacity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{option.price}</p>
                        <Button variant="outline" size="sm">Select</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Routes */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">{route.from} → {route.to}</p>
                        <p className="text-xs text-muted-foreground">{route.rides} rides today</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{route.price}</p>
                        <Button variant="ghost" size="sm" className="text-xs h-6">Book</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Drivers */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Nearby Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeDrivers.map((driver, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-sm">{driver.name}</h4>
                          <p className="text-xs text-muted-foreground">{driver.vehicle}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{driver.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{driver.location}</span>
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          {driver.eta} away
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Drivers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;
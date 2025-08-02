import { MapPin, Clock, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Ride = () => {
  const availableRides = [
    {
      id: 1,
      driverName: "Alex Johnson",
      driverRating: 4.9,
      fromLocation: "Main Campus",
      toLocation: "City Center", 
      departureTime: "2:30 PM",
      availableSeats: 3,
      price: "N500",
      estimatedTime: "25 min"
    },
    {
      id: 2,
      driverName: "Sarah Williams",
      driverRating: 4.8,
      fromLocation: "Engineering Block",
      toLocation: "Shopping Mall",
      departureTime: "3:00 PM", 
      availableSeats: 2,
      price: "N400",
      estimatedTime: "20 min"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Campus Rides</h1>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="From location" 
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="To destination" 
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Find Rides
            </Button>
          </div>
        </div>

        {/* Available Rides */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Rides</h2>
          <div className="space-y-4">
            {availableRides.map((ride) => (
              <Card key={ride.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {ride.driverName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">{ride.driverName}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{ride.driverRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{ride.price}</div>
                      <div className="text-xs text-gray-500">{ride.estimatedTime}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-sm text-gray-700">{ride.fromLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{ride.toLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{ride.departureTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{ride.availableSeats} seats</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Book Ride
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;
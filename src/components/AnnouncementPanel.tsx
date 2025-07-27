import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, AlertCircle, Calendar, Users } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "university" | "admin" | "manager";
  date: string;
  urgent?: boolean;
}

interface AnnouncementPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementPanel = ({ isOpen, onClose }: AnnouncementPanelProps) => {
  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Exam Schedule Released",
      message: "The final examination timetable for Semester 1, 2024 has been published. Please check your student portal for specific dates and venues.",
      type: "university",
      date: "2024-01-15",
      urgent: true
    },
    {
      id: "2",
      title: "UniConnect App Updates",
      message: "New features added to the marketplace and ride-sharing services. Update your app to access the latest functionality.",
      type: "admin",
      date: "2024-01-14"
    },
    {
      id: "3",
      title: "Campus Shuttle Service",
      message: "Additional shuttle routes have been added during peak hours (7-9 AM and 4-6 PM) to reduce waiting times.",
      type: "manager",
      date: "2024-01-13"
    },
    {
      id: "4",
      title: "Library Extended Hours",
      message: "The main library will remain open until 2 AM during the exam period (Jan 20 - Feb 10).",
      type: "university",
      date: "2024-01-12"
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "university": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "admin": return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "manager": return "bg-green-500/10 text-green-600 border-green-200";
      default: return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "university": return <Calendar className="h-4 w-4" />;
      case "admin": return <AlertCircle className="h-4 w-4" />;
      case "manager": return <Users className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16">
      <Card className="w-full max-w-md mx-4 shadow-elegant max-h-[80vh]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg">Announcements</CardTitle>
            <CardDescription>Latest updates from university and staff</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] px-6 pb-6">
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm leading-tight">{announcement.title}</h4>
                    {announcement.urgent && (
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {announcement.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs capitalize ${getTypeColor(announcement.type)}`}
                    >
                      {getTypeIcon(announcement.type)}
                      {announcement.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementPanel;
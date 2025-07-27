import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  gradient?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  buttonText, 
  href,
  gradient = "bg-gradient-primary"
}: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-glow transition-smooth cursor-pointer animate-fade-in">
      <CardContent className="p-6">
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center mb-4 shadow-card`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
          asChild
        >
          <a href={href}>{buttonText}</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
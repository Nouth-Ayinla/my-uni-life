import { Users, ShoppingBag, Car, Shield, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/hero-campus.jpg";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Community & Social",
      description: "Connect with fellow students, join forums, and stay updated with campus events.",
      features: ["Course-specific discussions", "Study groups & clubs", "Campus announcements", "Direct messaging"],
      buttonText: "Join Community",
      href: "/community"
    },
    {
      icon: ShoppingBag,
      title: "UniStore",
      description: "Buy and sell textbooks, gadgets, and essentials with trusted campus vendors.",
      features: ["Used textbooks & notes", "Campus vendor services", "Secure payments", "Order tracking"],
      buttonText: "Browse Store",
      href: "/store"
    },
    {
      icon: Car,
      title: "UniRide",
      description: "Safe and affordable transportation around campus with verified drivers.",
      features: ["Campus shuttle booking", "Carpooling options", "Live GPS tracking", "Student discounts"],
      buttonText: "Book Ride",
      href: "/ride"
    }
  ];

  const stats = [
    { number: "5K+", label: "Active Students" },
    { number: "200+", label: "Verified Vendors" },
    { number: "50+", label: "Daily Rides" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Your Campus,
            <br />
            <span className="text-primary-glow">Connected</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            The ultimate student platform bringing together social networking, 
            campus marketplace, and safe transportation in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button variant="hero" size="lg" asChild>
              <a href="/signup">Get Started Free</a>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <a href="/community">Explore Community</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need as a Student
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From connecting with classmates to getting around campus, 
              UniConnect has you covered with three powerful platforms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Trust Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Safe, Secure, and Student-First
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              Every user is verified through student ID, all transactions are secured, 
              and our support team is here 24/7 to help you succeed.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-card shadow-card">
                <MessageSquare className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Student Verification</h3>
                <p className="text-sm text-muted-foreground">Only verified students can join our community</p>
              </div>
              
              <div className="p-6 rounded-xl bg-card shadow-card">
                <Shield className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">All transactions protected by encryption</p>
              </div>
              
              <div className="p-6 rounded-xl bg-card shadow-card">
                <Calendar className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Get help whenever you need it</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Campus Experience?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using UniConnect to stay connected, 
            shop smart, and travel safely around campus.
          </p>
          
          <Button variant="accent" size="lg" className="shadow-xl" asChild>
            <a href="/signup">Start Your Journey Today</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
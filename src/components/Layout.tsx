import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>{children}</main>
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">UniConnect</h3>
              <p className="text-sm opacity-80">
                Connecting students through community, commerce, and transportation.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/community" className="hover:opacity-100">Community</a></li>
                <li><a href="/store" className="hover:opacity-100">UniStore</a></li>
                <li><a href="/ride" className="hover:opacity-100">UniRide</a></li>
                <li><a href="/admin" className="hover:opacity-100">Admin</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/help" className="hover:opacity-100">Help Center</a></li>
                <li><a href="/safety" className="hover:opacity-100">Safety</a></li>
                <li><a href="/contact" className="hover:opacity-100">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Account</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/login" className="hover:opacity-100">Login</a></li>
                <li><a href="/signup" className="hover:opacity-100">Sign Up</a></li>
                <li><a href="/profile" className="hover:opacity-100">Profile</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 UniConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
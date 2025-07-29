import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Get current user and profile
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUserProfile(profile);
      }
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setUserProfile(profile);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

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
                {isAdmin && (
                  <li>
                    <Link 
                      to="/admin-dashboard" 
                      className="hover:opacity-100 flex items-center space-x-1 text-accent"
                    >
                      <Shield className="h-3 w-3" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </li>
                )}
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
                {!user ? (
                  <>
                    <li><Link to="/auth" className="hover:opacity-100">Login</Link></li>
                    <li><Link to="/auth" className="hover:opacity-100">Sign Up</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/profile" className="hover:opacity-100">Profile</Link></li>
                    <li><Link to="/dashboard" className="hover:opacity-100">Dashboard</Link></li>
                  </>
                )}
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface University {
  id: string;
  name: string;
  location: string;
  code: string;
  logo_url?: string;
}

const UniversitySelection = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUniversities(universities);
    } else {
      const filtered = universities.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUniversities(filtered);
    }
  }, [searchTerm, universities]);

  const fetchUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name');

      if (error) throw error;
      setUniversities(data || []);
      setFilteredUniversities(data || []);
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUniversitySelect = (university: University) => {
    // Store selected university in localStorage for signup
    localStorage.setItem('selectedUniversity', JSON.stringify(university));
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading universities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">Select Your University</h1>
          <p className="text-muted-foreground">Choose your university to get started with UniConnect</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search universities by name, location, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUniversities.map((university) => (
            <Card 
              key={university.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 hover:scale-105"
              onClick={() => handleUniversitySelect(university)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                    {university.logo_url ? (
                      <img 
                        src={university.logo_url} 
                        alt={`${university.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-logo') as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className="fallback-logo w-full h-full bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-lg" 
                      style={{ display: university.logo_url ? 'none' : 'flex' }}
                    >
                      {university.code.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {university.name}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{university.location}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {university.code}
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  Select University
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No universities found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available universities.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UniversitySelection;
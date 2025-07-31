import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  ShoppingCart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Ban,
  Eye,
  Trash2,
  Star,
  Car,
  Store,
  Megaphone
} from 'lucide-react';
import { adminAPI } from '@/api/admin';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState([]);
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      // Check if user is authenticated and is admin
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      const userEmail = localStorage.getItem('userEmail');
      
      if (!isAuth || !userEmail) {
        navigate('/login');
        return;
      }

      // Simple admin check - replace with your actual admin logic
      if (userEmail !== 'admin@example.com') {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }

      setUser({ email: userEmail });
      setUserRole('admin');
      fetchDashboardData();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch users using mock API
      const usersData = await adminAPI.getStudents();
      setUsers(usersData || []);
      setFlaggedContent([]);
      setPendingVerifications([]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const updateUserStatus = async (userId: string, status: 'active' | 'suspended' | 'banned', reason?: string) => {
    try {
      await adminAPI.updateStudent(parseInt(userId), { status });

      toast({
        title: "User status updated",
        description: `User has been ${status}`,
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive"
      });
    }
  };

  const updateVerificationStatus = async (userId: string, status: 'pending' | 'approved' | 'rejected' | 'flagged') => {
    try {
      await adminAPI.updateStudent(parseInt(userId), { verification_status: status });

      toast({
        title: "Verification updated",
        description: `User verification ${status}`,
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update verification status",
        variant: "destructive"
      });
    }
  };

  const handleFlaggedContent = async (flagId: string, action: string) => {
    try {
      // Mock implementation
      console.log(`Handling flagged content ${flagId} with action ${action}`);

      toast({
        title: "Content reviewed",
        description: `Content has been ${action}`,
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to handle flagged content",
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: "+12%",
      trend: "up",
      icon: Users
    },
    {
      title: "Pending Verifications",
      value: pendingVerifications.length.toString(),
      change: "+5%",
      trend: "up",
      icon: Clock
    },
    {
      title: "Flagged Content",
      value: flaggedContent.length.toString(),
      change: "-8%",
      trend: "down",
      icon: AlertTriangle
    },
    {
      title: "Active Users",
      value: users.filter(u => u.user_status === 'active').length.toString(),
      change: "+15%",
      trend: "up",
      icon: Activity
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm text-muted-foreground">System Status: Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="rides">Rides</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Review Pending Verifications ({pendingVerifications.length})
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Moderate Flagged Content ({flaggedContent.length})
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Send Platform Announcement
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage User Roles
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Students:</span>
                    <span className="font-semibold">{users.filter(u => u.role === 'student').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Vendors:</span>
                    <span className="font-semibold">{users.filter(u => u.role === 'vendor').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Drivers:</span>
                    <span className="font-semibold">{users.filter(u => u.role === 'driver').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Users:</span>
                    <span className="font-semibold text-green-600">
                      {users.filter(u => u.user_status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Banned Users:</span>
                    <span className="font-semibold text-red-600">
                      {users.filter(u => u.user_status === 'banned').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="vendor">Vendors</SelectItem>
                    <SelectItem value="driver">Drivers</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.full_name || 'No name'}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                          <Badge 
                            variant={
                              user.user_status === 'active' ? 'default' : 
                              user.user_status === 'suspended' ? 'destructive' : 'secondary'
                            }
                          >
                            {user.user_status}
                          </Badge>
                          <Badge 
                            variant={
                              user.verification_status === 'approved' ? 'default' : 
                              user.verification_status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {user.verification_status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateUserStatus(user.id, user.user_status === 'active' ? 'suspended' : 'active')}
                      >
                        {user.user_status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateUserStatus(user.id, 'banned', 'Administrative action')}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Verification & Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVerifications.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{user.full_name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Badge variant="secondary">{user.role}</Badge>
                        {user.universities && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {user.universities.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateVerificationStatus(user.id, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateVerificationStatus(user.id, 'rejected')}
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingVerifications.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No pending verifications
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Flagged {item.content_type}</p>
                        <p className="text-sm text-muted-foreground">
                          Reported by: {item.profiles?.full_name || 'Anonymous'}
                        </p>
                        <p className="text-sm">Reason: {item.reason}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleFlaggedContent(item.id, 'reviewed')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleFlaggedContent(item.id, 'removed')}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                {flaggedContent.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No flagged content to review
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Marketplace management features will be implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rides">
          <Card>
            <CardHeader>
              <CardTitle>Ride Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Ride management features will be implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings & Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Megaphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  System settings and announcement features will be implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
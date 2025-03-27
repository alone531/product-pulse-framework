
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit, 
  Trash2,
  Mail,
  Calendar,
  Clock,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { users } from "@/lib/data";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find user by ID
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/users" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </Button>
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold">User Not Found</h2>
            <p className="text-muted-foreground mt-2">
              The user you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteClick = () => {
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-slate-100 text-slate-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "manager":
        return "bg-blue-100 text-blue-700";
      case "editor":
        return "bg-indigo-100 text-indigo-700";
      case "viewer":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button and actions */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/users" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleDeleteClick}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button size="sm" asChild>
            <Link to={`/users/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      {/* User header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0) + user.name.split(" ")[1]?.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-1.5">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <Badge 
              variant="secondary" 
              className={getStatusColor(user.status)}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
          </div>
          <div className="text-muted-foreground flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            {user.email}
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <Badge 
              variant="secondary" 
              className={getRoleColor(user.role)}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* User tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 h-auto">
          <TabsTrigger value="details" className="py-2.5">Details</TabsTrigger>
          <TabsTrigger value="activity" className="py-2.5">Activity</TabsTrigger>
          <TabsTrigger value="permissions" className="py-2.5">Permissions</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">User Information</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">User ID</dt>
                          <dd className="font-medium">{user.id}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Full Name</dt>
                          <dd className="font-medium">{user.name}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Email</dt>
                          <dd className="font-medium">{user.email}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Role</dt>
                          <dd className="font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Status</dt>
                          <dd className="font-medium">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Created At</dt>
                          <dd className="font-medium">{user.createdAt}</dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-muted-foreground">Last Active</dt>
                          <dd className="font-medium">{user.lastActive || "Never"}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">User Activity</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="bg-muted/40 border-none">
                          <CardContent className="flex items-center p-4 space-x-4">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Account Age</div>
                              <div className="text-2xl font-bold">125 days</div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-muted/40 border-none">
                          <CardContent className="flex items-center p-4 space-x-4">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Last Login</div>
                              <div className="text-2xl font-bold">2 days ago</div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Action</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="px-6 py-4 text-sm">2023-08-24</td>
                          <td className="px-6 py-4 text-sm">
                            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-none">
                              Logged In
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm">Logged in from 192.168.1.1</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm">2023-08-23</td>
                          <td className="px-6 py-4 text-sm">
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-none">
                              Updated Product
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm">Updated inventory for iPhone 15</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm">2023-08-20</td>
                          <td className="px-6 py-4 text-sm">
                            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-none">
                              Added Product
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm">Added new product AirPods Pro</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">User Permissions</h3>
                    <Badge 
                      variant="secondary" 
                      className={getRoleColor(user.role)}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Role
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">Products</span>
                        </div>
                      </div>
                      <div className="p-4 divide-y">
                        <div className="py-2 flex justify-between items-center">
                          <span>View products</span>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-none">
                            Allowed
                          </Badge>
                        </div>
                        <div className="py-2 flex justify-between items-center">
                          <span>Create products</span>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-none">
                            Allowed
                          </Badge>
                        </div>
                        <div className="py-2 flex justify-between items-center">
                          <span>Edit products</span>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-none">
                            Allowed
                          </Badge>
                        </div>
                        <div className="py-2 flex justify-between items-center">
                          <span>Delete products</span>
                          <Badge variant="outline" className={user.role === "admin" ? "bg-green-100 text-green-700 border-none" : "bg-red-100 text-red-700 border-none"}>
                            {user.role === "admin" ? "Allowed" : "Denied"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">Users</span>
                        </div>
                      </div>
                      <div className="p-4 divide-y">
                        <div className="py-2 flex justify-between items-center">
                          <span>View users</span>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-none">
                            Allowed
                          </Badge>
                        </div>
                        <div className="py-2 flex justify-between items-center">
                          <span>Create users</span>
                          <Badge variant="outline" className={["admin", "manager"].includes(user.role) ? "bg-green-100 text-green-700 border-none" : "bg-red-100 text-red-700 border-none"}>
                            {["admin", "manager"].includes(user.role) ? "Allowed" : "Denied"}
                          </Badge>
                        </div>
                        <div className="py-2 flex justify-between items-center">
                          <span>Edit users</span>
                          <Badge variant="outline" className={["admin", "manager"].includes(user.role) ? "bg-green-100 text-green-700 border-none" : "bg-red-100 text-red-700 border-none"}>
                            {["admin", "manager"].includes(user.role) ? "Allowed" : "Denied"}
                          </Badge>
                        </div>
                        <div className="py-2 flex justify-between items-center">
                          <span>Delete users</span>
                          <Badge variant="outline" className={user.role === "admin" ? "bg-green-100 text-green-700 border-none" : "bg-red-100 text-red-700 border-none"}>
                            {user.role === "admin" ? "Allowed" : "Denied"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

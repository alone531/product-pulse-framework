
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  ShoppingCart, 
  Package, 
  ClipboardCheck, 
  BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/data";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find product by ID
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/products" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Product Not Found</h2>
            <p className="text-muted-foreground mt-2">
              The product you're looking for doesn't exist or has been removed.
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

  return (
    <div className="space-y-6">
      {/* Back button and actions */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/products" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleDeleteClick}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button size="sm" asChild>
            <Link to={`/products/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      {/* Product header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-24 h-24 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-contain"
            />
          ) : (
            <Package className="h-8 w-8 text-slate-400" />
          )}
        </div>
        
        <div className="space-y-1.5">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <Badge 
              variant="secondary" 
              className={
                product.status === "In Stock"
                  ? "bg-green-100 text-green-700"
                  : product.status === "Low Stock"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {product.status}
            </Badge>
          </div>
          <div className="text-muted-foreground">SKU: {product.sku}</div>
          <div className="flex items-center space-x-3 pt-1">
            <Badge variant="outline">{product.category}</Badge>
            <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Product tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 h-auto">
          <TabsTrigger value="details" className="py-2.5">Details</TabsTrigger>
          <TabsTrigger value="inventory" className="py-2.5">Inventory</TabsTrigger>
          <TabsTrigger value="analytics" className="py-2.5">Analytics</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {product.description || "No description available."}
                    </p>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Details</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Product ID</dt>
                          <dd className="font-medium">{product.id}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">SKU</dt>
                          <dd className="font-medium">{product.sku}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Category</dt>
                          <dd className="font-medium">{product.category}</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <dt className="text-muted-foreground">Price</dt>
                          <dd className="font-medium">${product.price.toFixed(2)}</dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-muted-foreground">Status</dt>
                          <dd className="font-medium">{product.status}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Metadata</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="bg-muted/40 border-none">
                          <CardContent className="flex items-center p-4 space-x-4">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                              <ShoppingCart className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Orders</div>
                              <div className="text-2xl font-bold">24</div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-muted/40 border-none">
                          <CardContent className="flex items-center p-4 space-x-4">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                              <ClipboardCheck className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Reviews</div>
                              <div className="text-2xl font-bold">12</div>
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
          
          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-muted/40 border-none">
                      <CardContent className="flex flex-col p-4">
                        <span className="text-sm text-muted-foreground">Current Stock</span>
                        <span className="text-3xl font-bold mt-1">{product.inventory}</span>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40 border-none">
                      <CardContent className="flex flex-col p-4">
                        <span className="text-sm text-muted-foreground">Low Stock Threshold</span>
                        <span className="text-3xl font-bold mt-1">10</span>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40 border-none">
                      <CardContent className="flex flex-col p-4">
                        <span className="text-sm text-muted-foreground">Restock ETA</span>
                        <span className="text-3xl font-bold mt-1">7 days</span>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Inventory History</h3>
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">By</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-6 py-4 text-sm">2023-08-15</td>
                            <td className="px-6 py-4 text-sm">
                              <Badge variant="outline" className="bg-green-100 text-green-700 border-none">
                                Stock Added
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">+15</td>
                            <td className="px-6 py-4 text-sm">John Doe</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm">2023-08-10</td>
                            <td className="px-6 py-4 text-sm">
                              <Badge variant="outline" className="bg-red-100 text-red-700 border-none">
                                Stock Removed
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">-3</td>
                            <td className="px-6 py-4 text-sm">Order #38492</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm">2023-08-01</td>
                            <td className="px-6 py-4 text-sm">
                              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-none">
                                Inventory Adjusted
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">-2</td>
                            <td className="px-6 py-4 text-sm">Inventory Audit</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-muted/40 border-none">
                      <CardContent className="flex items-center p-4 space-x-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Sales This Month</div>
                          <div className="text-2xl font-bold">$2,850</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40 border-none">
                      <CardContent className="flex items-center p-4 space-x-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Units Sold</div>
                          <div className="text-2xl font-bold">42</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40 border-none">
                      <CardContent className="flex items-center p-4 space-x-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Average Rating</div>
                          <div className="text-2xl font-bold">4.7/5</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Sales Trend</h3>
                    <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-lg">
                      <div className="text-center p-6">
                        <p className="text-muted-foreground">
                          Sales chart will be displayed here.
                        </p>
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

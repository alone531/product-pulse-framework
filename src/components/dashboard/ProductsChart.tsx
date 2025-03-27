
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  { name: 'Jan', sales: 65, inventory: 24 },
  { name: 'Feb', sales: 59, inventory: 22 },
  { name: 'Mar', sales: 80, inventory: 27 },
  { name: 'Apr', sales: 81, inventory: 30 },
  { name: 'May', sales: 56, inventory: 26 },
  { name: 'Jun', sales: 55, inventory: 23 },
  { name: 'Jul', sales: 40, inventory: 19 },
  { name: 'Aug', sales: 60, inventory: 25 },
  { name: 'Sep', sales: 80, inventory: 32 },
  { name: 'Oct', sales: 75, inventory: 30 },
  { name: 'Nov', sales: 90, inventory: 35 },
  { name: 'Dec', sales: 100, inventory: 38 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded shadow-sm">
        <p className="text-xs font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default function ProductsChart() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Products Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="6months" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="30days">30 days</TabsTrigger>
              <TabsTrigger value="6months">6 months</TabsTrigger>
              <TabsTrigger value="1year">1 year</TabsTrigger>
            </TabsList>
          </div>

          {/* Chart for different time periods */}
          <TabsContent value="30days" className="mt-0">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={data.slice(-6)}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="inventory" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="6months" className="mt-0">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={data.slice(-8)}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="inventory" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="1year" className="mt-0">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="inventory" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        
        <div className="flex space-x-4 mt-2 justify-center">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Sales</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <span className="text-xs text-muted-foreground">Inventory</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

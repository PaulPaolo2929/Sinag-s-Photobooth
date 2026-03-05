import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Image as ImageIcon, LayoutGrid, Download } from "lucide-react";

export default function AdminDashboard() {
  const [bookings] = useState([
    { id: "B-101", date: "Oct 24", type: "Standard", status: "Completed", amount: "₱50" },
    { id: "B-102", date: "Oct 24", type: "Premium", status: "Active", amount: "₱100" },
    { id: "B-103", date: "Oct 25", type: "Standard", status: "Upcoming", amount: "₱50" },
  ]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 container mx-auto max-w-6xl" data-testid="page-admin">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black">Admin Dashboard</h1>
          <p className="text-foreground/60">Manage your photobooth operations</p>
        </div>
        <Button variant="outline" className="glass-card rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Total Revenue</CardTitle>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary font-bold">₱</span></div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">₱12,450</div>
            <p className="text-xs text-green-500 font-medium mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Sessions Today</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">24</div>
            <p className="text-xs text-foreground/50 mt-1">4 Active right now</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Prints Used</CardTitle>
            <ImageIcon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">412<span className="text-sm text-foreground/50 font-normal">/500</span></div>
            <div className="w-full bg-black/5 h-2 rounded-full mt-2">
              <div className="bg-primary h-2 rounded-full w-[82%]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="glass-card w-full justify-start p-1 rounded-2xl h-14 mb-6">
          <TabsTrigger value="bookings" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm">Bookings</TabsTrigger>
          <TabsTrigger value="layouts" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm">Layouts</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm">Gallery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="glass-card rounded-[2rem] p-6">
          <h3 className="text-xl font-bold mb-4">Recent Bookings</h3>
          <div className="w-full overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="p-4 text-foreground/60 font-semibold">ID</th>
                  <th className="p-4 text-foreground/60 font-semibold">Date</th>
                  <th className="p-4 text-foreground/60 font-semibold">Type</th>
                  <th className="p-4 text-foreground/60 font-semibold">Status</th>
                  <th className="p-4 text-foreground/60 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-black/5 last:border-0 hover:bg-white/40 transition-colors">
                    <td className="p-4 font-bold">{b.id}</td>
                    <td className="p-4">{b.date}</td>
                    <td className="p-4">{b.type}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        b.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        b.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="layouts" className="glass-card rounded-[2rem] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Manage Layouts & Assets</h3>
            <Button className="rounded-xl bg-foreground text-background">Upload Asset</Button>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
             <div className="aspect-square bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors cursor-pointer">
                <LayoutGrid className="mb-2" size={32} />
                <span className="font-semibold text-sm">New Sticker</span>
             </div>
             {/* Mock existing assets */}
             {[1,2,3].map(i => (
               <div key={i} className="aspect-square bg-white rounded-2xl border shadow-sm flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <Button variant="destructive" size="sm" className="rounded-full">Remove</Button>
                  </div>
                  <span className="text-4xl">✨</span>
               </div>
             ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="glass-card rounded-[2rem] p-6">
           <h3 className="text-xl font-bold mb-4">Public Gallery Settings</h3>
           <p className="text-foreground/70 mb-6">Select which completed sessions appear on the public gallery page.</p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-gray-100 rounded-xl relative overflow-hidden group">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">Session Photo</div>
                 <div className="absolute top-2 right-2">
                   <input type="checkbox" className="w-5 h-5 rounded accent-primary border-white" defaultChecked={i < 3} />
                 </div>
               </div>
             ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
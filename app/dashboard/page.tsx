import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowUpRight, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/tracking">Track New Shipment</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Clearance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Delivered</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "DT-8823", origin: "Shanghai", dest: "Lagos", status: "In Transit", date: "Oct 24, 2025" },
                { id: "DT-8824", origin: "London", dest: "Abuja", status: "Customs Clearing", date: "Oct 22, 2025" },
                { id: "DT-8825", origin: "Dubai", dest: "Lagos", status: "Delivered", date: "Oct 15, 2025" },
              ].map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{shipment.id}</p>
                    <p className="text-sm text-muted-foreground">{shipment.origin} → {shipment.dest}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-sm font-medium ${
                      shipment.status === "Delivered" ? "text-green-600" : 
                      shipment.status === "In Transit" ? "text-blue-600" : "text-orange-600"
                    }`}>
                      {shipment.status}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/tracking?id=${shipment.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="w-full justify-start">
              Request Quote
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Upload Documents
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

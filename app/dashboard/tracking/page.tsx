import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Map from "@/components/ui/Map";
import { Search, Truck, CheckCircle2, Circle, Clock } from "lucide-react";

export default function TrackingPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Track Shipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Enter Tracking ID (e.g. DT-12345)" className="pl-9" />
              </div>
              <Button>Track</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-between rounded-lg border p-4">
              <div>
                <div className="text-sm text-muted-foreground">Tracking ID</div>
                <div className="text-xl font-bold">DT-8823</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="flex items-center gap-2 font-semibold text-blue-600">
                  <Truck className="h-4 w-4" /> In Transit
                </div>
              </div>
            </div>

            <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-slate-200">
              <div className="relative">
                <div className="absolute -left-[37px] top-0 rounded-full bg-white p-1">
                  <Circle className="h-4 w-4 fill-blue-600 text-blue-600" />
                </div>
                <div className="font-semibold">Shipment Departed</div>
                <div className="text-sm text-muted-foreground">Shanghai Port, CN • Oct 24, 10:00 AM</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[37px] top-0 rounded-full bg-white p-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="font-semibold">Customs Cleared</div>
                <div className="text-sm text-muted-foreground">Shanghai Port, CN • Oct 23, 04:30 PM</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[37px] top-0 rounded-full bg-white p-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="font-semibold">Shipment Picked Up</div>
                <div className="text-sm text-muted-foreground">Shanghai Warehouse • Oct 22, 09:15 AM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-[400px] w-full lg:h-auto lg:w-1/2">
        <Card className="h-full overflow-hidden">
          <Map location="Atlantic Ocean" />
        </Card>
      </div>
    </div>
  );
}

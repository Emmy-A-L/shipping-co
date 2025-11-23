import { MapPin } from "lucide-react";

export default function Map({ location }: { location?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-200">
      {/* 
        In a real implementation, you would use the Google Maps JavaScript API here.
        Example: <GoogleMap center={center} zoom={10} ... />
        For now, we show a placeholder.
      */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-blue-100 p-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Map View</h3>
          <p className="text-sm text-slate-500">
            {location ? `Showing location: ${location}` : "Google Maps Integration"}
          </p>
          <p className="mt-2 text-xs text-slate-400">API Key Required</p>
        </div>
      </div>
      
      {/* Mock Map Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", 
        backgroundSize: "20px 20px" 
      }}></div>
    </div>
  );
}

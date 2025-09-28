import { Card } from "@/components/ui/card";
import { Thermometer } from "lucide-react";

export const TemperatureChart = () => {
  // Sample temperature profile data
  const temperatureData = [
    { depth: 0, temp: 28.5 },
    { depth: 100, temp: 28.2 },
    { depth: 200, temp: 27.8 },
    { depth: 300, temp: 27.1 },
    { depth: 400, temp: 26.3 },
    { depth: 500, temp: 25.2 },
    { depth: 600, temp: 23.8 },
    { depth: 700, temp: 22.1 },
    { depth: 800, temp: 20.3 },
    { depth: 900, temp: 18.5 },
    { depth: 1000, temp: 16.8 },
    { depth: 1200, temp: 15.2 },
    { depth: 1400, temp: 13.8 },
    { depth: 1600, temp: 12.5 },
    { depth: 1800, temp: 11.3 },
    { depth: 2000, temp: 10.2 }
  ];

  const maxTemp = Math.max(...temperatureData.map(d => d.temp));
  const minTemp = Math.min(...temperatureData.map(d => d.temp));
  const maxDepth = Math.max(...temperatureData.map(d => d.depth));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Thermometer className="w-5 h-5 mr-2 text-data-temperature" />
        Temperature Profile
      </h3>
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 400 250">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Temperature curve */}
          <path
            d={`M ${40 + (temperatureData[0].temp - minTemp) / (maxTemp - minTemp) * 300} ${20} ${
              temperatureData.slice(1).map((point, index) => {
                const x = 40 + (point.temp - minTemp) / (maxTemp - minTemp) * 300;
                const y = 20 + (point.depth / maxDepth) * 200;
                return `L ${x} ${y}`;
              }).join(' ')
            }`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {temperatureData.map((point, index) => {
            const x = 40 + (point.temp - minTemp) / (maxTemp - minTemp) * 300;
            const y = 20 + (point.depth / maxDepth) * 200;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="#ef4444"
                className="hover:r-4 transition-all duration-200"
              />
            );
          })}
          
          {/* Axes */}
          <line x1="40" y1="20" x2="40" y2="220" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="220" x2="340" y2="220" stroke="#374151" strokeWidth="2" />
          
          {/* Y-axis labels (Depth) */}
          {[0, 500, 1000, 1500, 2000].map(depth => {
            const y = 20 + (depth / maxDepth) * 200;
            return (
              <g key={depth}>
                <line x1="35" y1={y} x2="40" y2={y} stroke="#374151" strokeWidth="1" />
                <text x="30" y={y + 4} textAnchor="end" className="text-xs fill-gray-600">
                  {depth}m
                </text>
              </g>
            );
          })}
          
          {/* X-axis labels (Temperature) */}
          {[10, 15, 20, 25, 30].map(temp => {
            const x = 40 + (temp - minTemp) / (maxTemp - minTemp) * 300;
            return (
              <g key={temp}>
                <line x1={x} y1="220" x2={x} y2="225" stroke="#374151" strokeWidth="1" />
                <text x={x} y="235" textAnchor="middle" className="text-xs fill-gray-600">
                  {temp}°C
                </text>
              </g>
            );
          })}
          
          {/* Title */}
          <text x="200" y="15" textAnchor="middle" className="text-sm font-semibold fill-gray-800">
            Temperature vs Depth Profile
          </text>
        </svg>
      </div>
    </Card>
  );
};

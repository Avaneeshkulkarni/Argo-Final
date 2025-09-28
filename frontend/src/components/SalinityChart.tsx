import { Card } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export const SalinityChart = () => {
  // Sample salinity data for different regions
  const salinityData = [
    { region: "Arabian Sea", salinity: 35.2, color: "#3b82f6" },
    { region: "Bay of Bengal", salinity: 34.8, color: "#06b6d4" },
    { region: "Central Indian Ocean", salinity: 35.1, color: "#10b981" },
    { region: "Southern Ocean", salinity: 34.5, color: "#8b5cf6" },
    { region: "Mediterranean", salinity: 38.1, color: "#f59e0b" },
    { region: "Red Sea", salinity: 40.2, color: "#ef4444" }
  ];

  const maxSalinity = Math.max(...salinityData.map(d => d.salinity));
  const minSalinity = Math.min(...salinityData.map(d => d.salinity));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Droplets className="w-5 h-5 mr-2 text-data-salinity" />
        Salinity Analysis
      </h3>
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 400 250">
          {/* Grid lines */}
          <defs>
            <pattern id="salinityGrid" width="50" height="25" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#salinityGrid)" />
          
          {/* Bars */}
          {salinityData.map((region, index) => {
            const barHeight = ((region.salinity - minSalinity) / (maxSalinity - minSalinity)) * 150;
            const barWidth = 50;
            const x = 50 + index * 50;
            const y = 200 - barHeight;
            
            return (
              <g key={region.region}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth - 10}
                  height={barHeight}
                  fill={region.color}
                  opacity="0.8"
                  className="hover:opacity-100 transition-opacity duration-200"
                />
                <text
                  x={x + (barWidth - 10) / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-gray-700"
                >
                  {region.salinity}
                </text>
                <text
                  x={x + (barWidth - 10) / 2}
                  y={220}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                  transform={`rotate(-45 ${x + (barWidth - 10) / 2} 220)`}
                >
                  {region.region.split(' ')[0]}
                </text>
              </g>
            );
          })}
          
          {/* Y-axis */}
          <line x1="40" y1="20" x2="40" y2="200" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="200" x2="350" y2="200" stroke="#374151" strokeWidth="2" />
          
          {/* Y-axis labels */}
          {[34, 35, 36, 37, 38, 39, 40].map(salinity => {
            const y = 200 - ((salinity - minSalinity) / (maxSalinity - minSalinity)) * 150;
            return (
              <g key={salinity}>
                <line x1="35" y1={y} x2="40" y2={y} stroke="#374151" strokeWidth="1" />
                <text x="30" y={y + 4} textAnchor="end" className="text-xs fill-gray-600">
                  {salinity}
                </text>
              </g>
            );
          })}
          
          {/* Title */}
          <text x="200" y="15" textAnchor="middle" className="text-sm font-semibold fill-gray-800">
            Regional Salinity Comparison (PSU)
          </text>
          
          {/* Legend */}
          <g transform="translate(50, 240)">
            <text x="0" y="0" className="text-xs font-semibold fill-gray-700">Legend:</text>
            {salinityData.map((region, index) => (
              <g key={region.region} transform={`translate(${index * 50}, 15)`}>
                <rect width="12" height="12" fill={region.color} />
                <text x="15" y="9" className="text-xs fill-gray-600">
                  {region.region}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </Card>
  );
};

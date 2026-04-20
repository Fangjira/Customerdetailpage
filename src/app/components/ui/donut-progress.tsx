interface DonutProgressProps {
  progress: number;
  size?: number;
}

export function DonutProgress({ progress, size = 48 }: DonutProgressProps) {
  const segments = 5;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  
  // Calculate segment length with gaps
  const gapAngle = 8; // degrees
  const segmentAngle = (360 - (segments * gapAngle)) / segments;
  
  // Calculate how many segments should be filled based on progress
  // Each segment represents 20% (100/5)
  const filledSegments = Math.ceil((progress / 100) * segments);
  
  // Color based on progress
  const getColor = () => {
    if (progress >= 76) return "#22c55e"; // green-500
    if (progress >= 51) return "#3b82f6"; // blue-500
    if (progress >= 26) return "#eab308"; // yellow-500
    return "#ef4444"; // red-500
  };

  const fillColor = getColor();
  const emptyColor = "#e5e7eb"; // gray-200

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {Array.from({ length: segments }).map((_, index) => {
          const startAngle = index * (segmentAngle + gapAngle);
          const segmentLength = (circumference * segmentAngle) / 360;
          const gapLength = circumference - segmentLength;
          const dashArray = `${segmentLength} ${gapLength}`;
          const isFilled = index < filledSegments;
          
          return (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={isFilled ? fillColor : emptyColor}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeLinecap="butt"
              style={{
                transform: `rotate(${startAngle}deg)`,
                transformOrigin: `${center}px ${center}px`,
              }}
            />
          );
        })}
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-900">{progress}%</span>
      </div>
    </div>
  );
}
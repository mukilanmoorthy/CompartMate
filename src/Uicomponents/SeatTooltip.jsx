import React from "react";

export function SeatTooltip({ seatNumber, status, position, isVisible }) {
  if (!isVisible) return null;
  
  return (
    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm text-foreground px-3 py-2 rounded-md shadow-md border border-border z-10 min-w-20 text-center animate-in fade-in zoom-in-95 duration-200">
      <div className="font-medium text-sm">{seatNumber}</div>
      <div className="text-xs capitalize text-muted-foreground">
        {status === "available" ? (
          <span className="text-green-600">Available</span>
        ) : status === "selected" ? (
          <span className="text-primary">Selected</span>
        ) : (
          <span className="text-gray-500">Occupied</span>
        )}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Row {position.row}, Col {position.col}
      </div>
      
      {/* Arrow pointing down */}
      <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-background/95 border-r border-b border-border rotate-45"></div>
    </div>
  );
}

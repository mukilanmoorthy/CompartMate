import React, { useState } from "react";
import { SeatTooltip } from "../Uicomponents/SeatTooltip";

export function Seat({ id, number, status, position, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusClasses = () => {
    switch (status) {
      case "available":
        return "bg-secondary hover:bg-secondary/70 active:scale-95 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 text-secondary-foreground cursor-pointer transition-all";
      case "selected":
        return "bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground cursor-pointer ring-2 ring-primary ring-offset-1 sm:ring-offset-2 shadow-md transition-all";
      case "occupied":
        return "bg-muted text-muted-foreground cursor-not-allowed opacity-60 transition-opacity";
      default:
        return "";
    }
  };

  const handleKeyDown = (e) => {
    if (status !== "occupied" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(id);
    }
  };

  return (
    <div className="relative">
      {position && (
        <SeatTooltip 
          seatNumber={number}
          status={status}
          position={position}
          isVisible={isHovered}
        />
      )}
      <div
        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md shadow transition-all ${getStatusClasses()} ${isHovered && status !== 'occupied' ? 'scale-110 shadow-md z-10' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => status !== "occupied" && onClick(id)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={status !== "occupied" ? 0 : -1}
        aria-label={`Seat ${number}, ${status}`}
        aria-disabled={status === "occupied"}
      >
        <span className="text-xs sm:text-sm md:text-base font-medium">{number}</span>
      </div>
    </div>
  );
}

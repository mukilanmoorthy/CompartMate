import React from "react";
import { Seat } from "../Uicomponents/Seat";

export function CompartmentVisualizer({ compartment, selectedSeats, onSeatClick }) {
  // Group seats by row
  const seatsByRow = compartment.seats.reduce((rows, seat) => {
    const row = seat.position.row;
    if (!rows[row]) rows[row] = [];
    rows[row].push(seat);
    return rows;
  }, {});

  // Sort seats within each row by column position
  Object.keys(seatsByRow).forEach((rowKey) => {
    const row = Number(rowKey);
    seatsByRow[row] = seatsByRow[row].sort((a, b) => a.position.col - b.position.col);
  });

  // Get an array of row numbers sorted by row position
  const rows = Object.keys(seatsByRow)
    .map(Number)
    .sort((a, b) => a - b);

  // Determine seat status
  const getSeatStatus = (seatId, isAvailable) => {
    if (!isAvailable) return "occupied";
    return selectedSeats.includes(seatId) ? "selected" : "available";
  };

  // Count available and selected seats
  const availableSeats = compartment.seats.filter(seat => seat.isAvailable).length;
  const selectedSeatsCount = selectedSeats.length;
  
  return (
    <div className="p-3 sm:p-4 bg-card shadow-md rounded-lg border border-muted/50 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base sm:text-lg font-medium">{compartment.name}</h3>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span>{selectedSeatsCount} selected</span>
          </div>
          <span>/</span>
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/20 rounded-full">
            <span>{availableSeats} available</span>
          </div>
        </div>
      </div>
      
      {/* Visual representation of a train car */}
      <div className="relative bg-muted/20 rounded-lg p-3 sm:p-6 border-2 border-muted overflow-x-auto shadow-inner transition-all">
        {/* User Guide */}
        <div className="absolute -top-10 right-0 text-xs text-muted-foreground bg-card px-3 py-1 rounded-full shadow-sm border border-muted/50 animate-in slide-in-from-right">
          <span className="hidden sm:inline">Select seats by clicking them</span>
          <span className="sm:hidden">Tap seats to select</span>
        </div>
        {/* Train details */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary/10 text-xs font-semibold py-1 px-3 rounded-full border border-primary/30 shadow-sm">
          Front of train
        </div>

        {/* Window indicators on both sides */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center gap-2 items-center">
          {Array(4).fill(0).map((_, i) => (
            <div key={`window-left-${i}`} className="-translate-x-2 bg-blue-100/70 h-4 w-1 rounded-full"></div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center gap-2 items-center">
          {Array(4).fill(0).map((_, i) => (
            <div key={`window-right-${i}`} className="translate-x-2 bg-blue-100/70 h-4 w-1 rounded-full"></div>
          ))}
        </div>

        {/* Compartment body */}
        <div className="py-2 sm:py-4 min-w-[320px]">
          {rows.map((row) => (
            <div 
              key={row} 
              className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-4 animate-in fade-in duration-300"
              style={{ animationDelay: `${row * 50}ms` }}
            >
              {seatsByRow[row].map((seat) => (
                <Seat
                  key={seat.id}
                  id={seat.id}
                  number={seat.number}
                  status={getSeatStatus(seat.id, seat.isAvailable)}
                  position={seat.position}
                  onClick={onSeatClick}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Seat Rows Indicator */}
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex flex-col justify-center gap-10 text-xs text-muted-foreground">
          {[...new Set(rows)].map(row => (
            <div key={`row-indicator-${row}`} className="bg-muted/40 rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {row}
            </div>
          ))}
        </div>
        
        {/* Aisle indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-semibold py-1 px-3 bg-muted/50 rounded-full text-muted-foreground">
          Aisle
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-secondary"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-primary"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-muted opacity-60"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}

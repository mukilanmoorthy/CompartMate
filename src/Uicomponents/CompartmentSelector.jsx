import React from "react";

export function CompartmentSelector({ compartments, selectedCompartment, onSelectCompartment }) {
  if (compartments.length === 0) {
    return (
      <div className="p-4 bg-card shadow-md rounded-lg border border-muted/50">
        <p className="text-muted-foreground">No compartments available.</p>
      </div>
    );
  }

  // Group compartments by rows for better UI organization
  const compartmentsInRows = [];
  const itemsPerRow = 2; // Can be adjusted based on screen size
  
  for (let i = 0; i < compartments.length; i += itemsPerRow) {
    compartmentsInRows.push(compartments.slice(i, i + itemsPerRow));
  }

  return (
    <div className="p-3 sm:p-4 bg-card shadow-md rounded-lg border border-muted/50 transition-all hover:shadow-lg">
      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Select Compartment</h3>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {compartments.map((compartment) => {
          const isSelected = selectedCompartment && selectedCompartment.id === compartment.id;
          const availableSeats = compartment.seats.filter(seat => seat.isAvailable).length;
          const totalSeats = compartment.seats.length;
          
          return (
            <button
              key={compartment.id}
              className={`relative p-3 rounded-md text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isSelected 
                  ? 'bg-primary text-primary-foreground shadow-md scale-[1.02]'
                  : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-sm'
              }`}
              onClick={() => onSelectCompartment(compartment)}
              aria-pressed={isSelected}
            >
              <div className="flex flex-col">
                <span className="font-medium text-sm sm:text-base">{compartment.name}</span>
                <span className="text-xs mt-1 opacity-90">{availableSeats} of {totalSeats} seats available</span>
              </div>
              
              {isSelected && (
                <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-foreground animate-ping"></div>
              )}
              
              {/* Capacity indicator */}
              <div className="mt-2 w-full bg-background/30 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    availableSeats === 0 
                      ? 'bg-destructive/70' 
                      : availableSeats < totalSeats / 3 
                        ? 'bg-amber-500' 
                        : 'bg-green-500'
                  }`}
                  style={{
                    width: `${(availableSeats / totalSeats) * 100}%`,
                    transition: 'width 0.5s ease-in-out'
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

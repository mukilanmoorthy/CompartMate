import React from "react";

export function TrainSelector({ trains, selectedTrain, onSelectTrain }) {
  if (trains.length === 0) {
    return (
      <div className="p-4 bg-card shadow-md rounded-lg border">
        <p className="text-muted-foreground">No trains available.</p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 bg-card shadow-md rounded-lg border">
      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Select a Train</h3>
      <div className="space-y-2">
        {trains.map((train) => (
          <div
            key={train.id}
            className={`p-3 rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTrain && selectedTrain.id === train.id
                ? "bg-primary/10 border border-primary ring-1 ring-primary/50 transform scale-[1.02]"
                : "bg-secondary/50 hover:bg-secondary/70 border border-transparent hover:border-secondary/80"
            }`}
            onClick={() => onSelectTrain(train)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectTrain(train);
              }
            }}
            aria-label={`Select train ${train.name} with ${train.compartments.length} compartments`}
            aria-pressed={selectedTrain && selectedTrain.id === train.id}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div>
                <h4 className="font-medium">{train.name}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {train.compartments.length} compartment
                  {train.compartments.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-xs sm:text-sm">
                {train.compartments.reduce(
                  (total, compartment) => total + compartment.seats.length,
                  0
                )}{" "}
                seats total
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

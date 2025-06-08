import React from "react";

const seatTypeLabels = {
  LOWER: "Lower Berth",
  MIDDLE: "Middle Berth",
  UPPER: "Upper Berth",
  SIDE_LOWER: "Side Lower Berth",
  SIDE_UPPER: "Side Upper Berth",
};

const seatStatusColors = {
  AVAILABLE: { bg: "white", text: "black", border: "gray" },
  BOOKED: { bg: "lightgray", text: "darkgray", border: "gray" },
  BLOCKED: { bg: "lightcoral", text: "red", border: "darkred" },
  SELECTED: { bg: "lightgreen", text: "green", border: "darkgreen" },
};

export default function CompartmentMap({ coach = {}, selectedSeats = [], onSeatClick = () => {}, suggestedSeats = [] }) {
  const seats = Array.isArray(coach.seats) ? coach.seats : [];

  const maxX = seats.length ? Math.max(...seats.map((seat) => seat.x)) : 0;
  const maxY = seats.length ? Math.max(...seats.map((seat) => seat.y)) : 0;

  const gridWidth = (maxX + 2) * 60;
  const gridHeight = (maxY + 2) * 60;

  const getSeatStatus = (seat) => {
    if (selectedSeats.includes(seat.seat_number)) return "SELECTED";
    return seat.status || "AVAILABLE";
  };

  return (
    <div style={{ padding: "24px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Coach {coach.coach_number || "N/A"}</h3>
          <p style={{ fontSize: "14px", color: "gray" }}>{coach.coach_type || "Unknown Type"}</p>
        </div>
        <span style={{ padding: "4px 8px", border: "1px solid #ccc", borderRadius: "12px" }}>
          {coach.available_seats ?? 0} of {coach.total_seats ?? 0} available
        </span>
      </div>

      <div style={{ position: "relative", width: `${gridWidth}px`, height: `${gridHeight}px` }}>
        {seats.map((seat) => {
          const status = getSeatStatus(seat);
          const colors = seatStatusColors[status] || seatStatusColors.AVAILABLE;
          const isSuggested = suggestedSeats.includes(seat.seat_number);

          return (
            <button
              key={seat.seat_number}
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                border: `2px solid ${colors.border}`,
                backgroundColor: colors.bg,
                color: colors.text,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                left: `${(seat.x + 1) * 60}px`,
                top: `${(seat.y + 1) * 60}px`,
                cursor: status === "AVAILABLE" ? "pointer" : "not-allowed",
                boxShadow: isSuggested ? "0 0 8px green" : "none",
              }}
              onClick={() =>
                status === "AVAILABLE" || status === "SELECTED" ? onSeatClick(seat.seat_number) : null
              }
              disabled={status === "BOOKED" || status === "BLOCKED"}
              title={`${seatTypeLabels[seat.type] || "Unknown Type"} - ${
                status === "AVAILABLE"
                  ? "Click to select"
                  : status === "BOOKED"
                  ? "Already booked"
                  : status === "BLOCKED"
                  ? "Not available"
                  : "Selected by you"
              }`}
            >
              {seat.seat_number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
